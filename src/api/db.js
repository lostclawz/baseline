import { MongoClient } from 'mongodb';


let dbContainer;

const db = {
   init(databaseUrl, callback) {
      MongoClient.connect(databaseUrl, (err, database) => {
         dbContainer = database;
         callback(err, database);
      });
   },
   getDb() {
      return dbContainer;
   },
};

export default db;
