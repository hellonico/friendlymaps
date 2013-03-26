(ns friendly.data
	(:require monger.json)
	(:import org.bson.types.ObjectId)
	(:require [monger.collection :as mc])
	(:require [monger.core :as mg]))

(def url (System/getenv "MONGOHQ_URL"))
(if (not (nil? url))
  (mg/connect-via-uri! url))

; http://clojuremongodb.info/articles/getting_started.html

(defn find-one [serie id]
	(mc/find-one serie { :_id (ObjectId. id) })	)
(defn delete-one [serie id]
	(mc/remove serie { :_id (ObjectId. id) }) )
(defn delete-all [serie]
	(mc/remove serie))
(defn insert-one [serie values]
	(mc/insert serie values))
(defn update-one [serie id values]
	(mc/update serie { :_id (ObjectId. id) } values ))
(defn find-all [serie]
	(mc/find-maps serie))
(defn find-some [serie params]
	(mc/find-maps serie params))