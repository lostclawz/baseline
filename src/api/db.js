import {MongoClient} from 'mongodb';


var _db;

export default db = {
   init: function (databaseUrl, callback) {
      MongoClient.connect(databaseUrl, function (err, database) {
         _db = database;
         callback(err, database);
      });
   },
   getDb: function () {
      return _db;
   }
}