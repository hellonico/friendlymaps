(ns friendly.server
  (:use compojure.core)
  (:require [cheshire.core :refer :all])
  (:require [friendly.data :as data])
  (:use [ring.middleware.resource ])
  (:use [ring.adapter.jetty :only [run-jetty]])
  (:require [clabango.parser :refer [render-file]])
  (:require [noir.response :as resp])
  (:require [noir.util.middleware :as middleware])
  (:require [compojure.route :as route]))

(defroutes todo
  (GET "/:id" [id] (resp/json (data/find-one "todo" id)))
  (GET "/" [] (resp/json (data/find-all "todo")))
  (DELETE "/:id" [id] (data/delete-one "todo" id))
  (DELETE "/" [] (do (data/delete-all "todo") {:status 200}))
  (POST "/:id" {params :body} (do 
    (let [
      ps (parse-string (slurp params))
      id (ps "_id")
      ups (apply dissoc ps ["_id"])
      ]
    (data/update-one "todo" id ups) {:status 200})))
  (POST "/" {params :body} (do 
    (data/insert-one "todo" (parse-string (slurp params))) 
    {:status 200}
    )))

(defroutes company
  (POST "/" {params :body} (do 
    (data/insert-one "company" (parse-string (slurp params))) 
    {:status 200}
    ))
  (GET "/" [] (resp/json (data/find-all "company")))
  )

(defroutes
  app
  (context "/todo" [] todo)
  (context "/company" [] company)
  (GET "/" [] (render-file "friendly/html/main.html" {}))
  (GET "/json/:id" [id] (resp/json {:name id}))
  (GET
    "/headers"
    []
    {:status 200,
     :headers {"Content-Type" "text/html"},
     :body "<h1>Hello with headers</h1>"})
  (POST "/post" {params :body} (prn "params:" (slurp params)))
  (GET
    "/template/:id"
    [id]
    (render-file
      "friendly/html/index.html"
      {:greeting (str "Hey!" id)}))
  (route/resources "/")
  (route/not-found "<h1>Page not found</h1>"))

(def all-routes
 [(GET "/bootstrap" [] (resp/redirect "/html/bootstrap.html"))
  (GET
    "/maps"
    []
    (slurp (clojure.java.io/resource "html/maps.json.html")))
  app])

(defn init [] (println "friendly started successfully..."))

(defn destroy [] (println "shutting down..."))

(def handler (middleware/app-handler all-routes))

(defn -main [port]
  (let [port (Integer/parseInt port)]
    (run-jetty app {:port (Integer. port)})))

