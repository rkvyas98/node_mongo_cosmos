const express = require('express')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const { ObjectID } = require('bson');
var ObjectId = require('mongodb').ObjectID;
var url = <PRIMARY CONNECTION STRING>;


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db('familiesdb');
    
    const yargs = require('yargs')
    yargs.command({
        command:'insert',
        describe:'Insert new data.',
        handler(argv){
            var family_object = Object.fromEntries(Object.entries(argv).slice(1,-1))
            family_object["id"] = family_object["lastName"]+"Family"
            db.collection('families').insertOne(family_object, function(err, doc){
                if (err) throw err;
                console.log("1 document inserted");
                console.log(doc);
              })
        }
    })
    yargs.parse()


    app.get('/', (req, res) => {
        db.collection('families').find({} ).toArray(function(err, doc) {
            assert.equal(err, null);
            if (err) throw err;
            res.send(doc);
        });
    })    
    
    app.get('/:input', (req, res) => {
        var inputs = req.params.input.split(" ")
        
        const findDoc = (inputs, index) =>{
            return new Promise((resolve, reject) =>{
                db.collection('families').find({$or: [{"name" : {$regex :inputs[index],$options : 'i'}}, {"lastName": {$regex :inputs[index],$options : 'i'}}, {"age": parseInt(inputs[index])} ]}).toArray(function(err, doc) {
                    resolve(doc)  
                })
            });
        }
        
        const doWork = async () => {
            const r1 = await findDoc(inputs, 0)
            if(inputs[1]){
                const r2 = await findDoc(inputs, 1)
                const result = r1.concat(r2)
                return result
            }
            return r1
        }

        doWork().then((result) =>{
            if(result.length == 0) 
            res.send("No data found!")
            else {
                var all_ids = []
                result.forEach((doc) => {
                    all_ids.push(doc._id.toString())
                })
                ids = []
                all_ids.forEach((id) => {
                    if(!ids.includes(id)){
                        ids.push(id)
                    }
                })
                unique_ids = []
                ids.forEach((id) => {
                    unique_ids.push(new ObjectID(id))
                })

                db.collection('families').find({"_id": {$in: unique_ids}} ).toArray(function(err, doc) {
                    assert.equal(err, null);
                    if (err) throw err;
                    res.send(doc);
                });
            }
        }).catch((e) => {
            console.log(e);
        })       
    })

    app.listen(port, () => {
        console.log('Server is up on port '+ port);
    })
});
