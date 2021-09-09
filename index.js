const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

//mongodb server url
const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//takes in two parameters, the url and a callback function
MongoClient.connect(url, (err, client) => {

    //use of assert function
    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    // //Create collection
    // const collection = db.collection("dishes");
    // collection.insertOne({"name": "Uthappizza", "description": "test"},
    // (err, result) => {
    //     assert.equal(err,null);

    //     //print out how many operations have been successfully carried out
    //     console.log("After Insert:\n");
    //     console.log(result.ops);

    //     //search everything in collection in JSON object and convert to an JSON array
    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err,null);
        
    //         //return all the documents in the collection
    //         console.log("Found:\n");
    //         console.log(docs);

    //         //remove dish collection
    //         db.dropCollection("dishes", (err, result) => {
    //             assert.equal(err,null);

    //             //close connection to the databse
    //             client.close();
    //         });
    //     });
    // });

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });
});