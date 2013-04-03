(defproject friendly "0.1.0-SNAPSHOT"
            :description "FIXME: write this!"
            :plugins [[lein-ring "0.8.3"]]
            :min-lein-version "2.0.0"
            ; http://burtsev.net/en/2012/01/29/149/
            :repositories [["gdata" "http://maven.burtsev.net"]]
            :production {:misc "configuration" ; app-specific stuff
             :offline true
             :mirrors {#"central|clojars"
                       "http://s3pository.herokuapp.com/clojure"}}
            :dependencies [
                        [org.clojure/clojure "1.5.1"]
                        [ring-cors/ring-cors "0.1.0"]

                        [ring "1.2.0-beta1"]
                        [clabango "0.5"]
                        [lib-noir "0.4.9"]
                        [compojure "1.1.5"]

                        ; not used now
                        ; [com.cemerick/friend "0.1.4"]
                        ; [friend-oauth2 "0.0.3"]

                        ; [com.google.api-client/google-api-client "1.14.1-beta"]
                        ; [com.google.apis/google-api-services-drive "v2-rev64-1.14.1-beta"]
                        [com.google.gdata.gdata-java-client/gdata-spreadsheet-3.0 "1.47.1"]
                        [com.google.oauth-client/google-oauth-client  "1.14.1-beta"]
                        ; [com.google.gdata/gdata-spreadsheet "3.0"]
                        ; [com.google.gdata/gdata-client "1.0"]
                        ; [com.google.gdata/gdata-docs "2.0"]
                        ; [com.google.api.client/google-api-data-spreadsheet-v3 "1.0.10-alpha"]

                        [com.novemberain/monger "1.5.0-rc1"]
            ]
            :ring {:handler friendly.server/handler
            ; comment the below for friends demo
            ; :ring { :handler friendly.authserver/app
            :init    friendly.server/init
            :destroy friendly.server/destroy
            }
            :main friendly.server)