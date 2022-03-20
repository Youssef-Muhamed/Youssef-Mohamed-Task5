const {MongoClient} = require("mongodb")
const dbUrl = "mongodb://127.0.0.1:27017"
const dbName = "bank"
const myConnection = (cb) =>{
    MongoClient.connect( dbUrl, {}, (err, client)=>{
        if(err) return cb(err, false)
        const connection = client.db(dbName)
        cb(false, connection)
    })    
}


const add = (table,data)=>{
    MongoClient.connect( dbUrl, {}, (err, client)=>{
        if(err) return console.log("database error")
        const connection = client.db(dbName)
        connection.collection(table).insertOne(
            data,
            (error, res)=>{
                if(error) return console.log("error insert data")
                // console.log(res)
            }
        )
    })
}
const selectAll = (table)=>{
    // MongoClient.connect( dbUrl, {}, (err, client)=>{
    //     if(err) return console.log("database error")
    //     const connection = client.db(dbName)
    //     connection.collection(table).find()
    //     .toArray((e, users)=>{
    //         // if(e) res.send(e)
    //          return users; 
    //     })
    // })
}
module.exports = {myConnection,add,selectAll}