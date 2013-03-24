(ns friendly.server
  (:use compojure.core)
  (:use [ring.middleware.resource ])
  (:use [ring.adapter.jetty :only [run-jetty]])
  (:require [clabango.parser :refer [render-file]])
  (:require [noir.response :as resp])
  (:require [noir.util.middleware :as middleware])
  (:require [compojure.route :as route]))

(defroutes
  app
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

