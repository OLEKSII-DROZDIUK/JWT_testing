const MongoClient = require('mongodb').MongoClient;
const {uri, db, dbUsers} = require('./config');
const ObjectId = require('mongodb').ObjectID;

const getUser = async (loginDb, passDb) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const usersCollection = await client.db(dbUsers).collection("user");
        let result = await usersCollection.findOne({login: loginDb, password: passDb});

        client.close();
        return result;
    } catch (e) {
        throw e;
    };
};


const addNote = async newNote => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const noteCollection = await client.db(db).collection("notes");
        await noteCollection.insertOne(newNote);
        client.close();
    } catch (e) {
        throw e;
    };
};

const getNote = async (id) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();

        const noteCollection = await client.db(db).collection("notes");
        result = await noteCollection.findOne({"_id":ObjectId(id)});
        client.close();
        return result;
    } catch (e) {
        throw e;
    };
};


module.exports = {
    addNote,
    getNote,
    getUser
};
