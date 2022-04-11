# node_mongo_cosmos

## Problem statement 
Using Mongo DB(Cosmos DB) and node.js build an app.js to:

1.Accept new records on command line

2.Perform search using GET REST API 

Search can be up to two words. 

All records matching either of the two words should be displayed.

URL parameters or message body are both acceptable.



## Solution 
## 1. Insert new record
Implemented using comand line argument

Example :- For inserting a new record 

  node .\src\app.js insert --name= < name> --lastName= < lastname> --age= < age>

  run the command in home directory, type of age must be integer.
  
  
  
## 2. Search using GET REST API
Example :- node .\src\app.js run the following command in home directory

  a. http://localhost:3000 :- This url to get all the records

  b. http://localhost:3000/< input> < input> :- This url to do selective search on the fields name, lastName and age. 
