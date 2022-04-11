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
  
  Output of command :- node .\app.js insert --name="krishna Vyas" --lastName="Vyas" --age=25
  
  ![image](https://user-images.githubusercontent.com/62701552/162787933-22f8ea09-9a1e-498b-acdf-2eecd48b1f3d.png)
  
  
  
  
## 2. Search using GET REST API
Example :- node .\src\app.js run the following command in home directory

  a. http://localhost:3000 :- This url to get all the records

  b. http://localhost:3000/< input> < input> :- This url to do selective search on the fields name, lastName and age. 
  
  Output of http://localhost:3000/Vyas 22
  
  ![image](https://user-images.githubusercontent.com/62701552/162788005-0aa89cb0-aaec-4b89-b5a8-1e16e04ce743.png)
  
  Showing all records with name containing "Vyas" and age 22 (Without repeatation)
  

