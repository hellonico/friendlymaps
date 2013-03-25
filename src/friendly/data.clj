(ns friendly.data
	(:require monger.json)
	(:require [monger.collection :as mc])
	(:require [monger.core :as mg]))

(def url (System/getenv "MONGOHQ_URL"))
(mg/connect-via-uri! url)

; http://clojuremongodb.info/articles/getting_started.html

(defn insert-in-mongo[]
	(mc/insert "documents" {:first_name "John" :last_name "Lennon" }))

(defn delete-all[]
	(mc/remove "documents"))

(defn list-all[]
	(mc/find-maps "documents"))