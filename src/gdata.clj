; https://developers.google.com/gdata/javadoc/?hl=ja

(import 'com.google.gdata.client.spreadsheet.SpreadsheetService)
(import 'com.google.gdata.client.spreadsheet.FeedURLFactory)
(import 'com.google.gdata.client.spreadsheet.WorksheetQuery)

(def username (System/getenv "GMAIL_USER"))
(def passoword (System/getenv "GMAIL_PASSWORD"))

(def service (SpreadsheetService. "hellonico"))
(.setUserCredentials service username passoword)

; https://developers.google.com/gdata/javadoc/com/google/gdata/client/spreadsheet/FeedURLFactory
(def fac (FeedURLFactory/getDefault))
(def url (.getSpreadsheetsFeedUrl fac))
; "0Ai2RJTgv3xfWdHBGSVh6QkNwUG52Wk93dzRxOW1Zc0E" "" ""))

(def klass (.getClass (com.google.gdata.data.spreadsheet.SpreadsheetFeed.)))
(def feed (.getFeed service url klass))

(def tokyo (first (.getEntries feed)))
(def ff (first (.getWorksheets tokyo)))
(.getPlainText (.getTitle ff))