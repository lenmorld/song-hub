// import config file
const { MongoClient } = require('mongodb')
const config = require('../config')

// mongodb driver

if (!config.mongo_db_connection_string) {
  throw Error(
    '⚠ ⚠ ⚠ Put connection string from MongoDB Atlas in .env file ⚠ ⚠ ⚠',
  )
}

class DbConnection {
  constructor() {
    this.db = null
    this.dbName = 'songhub'
    this.url = process.env.MONGO_DB_CONNECTION_STRING
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    this.collections = {}
  }

  connectWithPromise() {
    if (this.db) {
      return Promise.resolve(this.db)
    }
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, this.options, (err, dbInstance) => {
        if (err) {
          console.log(`[MongoDB connection] ERROR: ${err}`)
          // failureCallback(err); // caught by the calling function
          reject(err)
        } else {
          const dbObject = dbInstance.db(this.dbName)
          console.log('[MongoDB connection] SUCCESS')
          this.db = dbObject
          // successCallback(dbObject);
          resolve(dbObject)
        }
      })
    })
  }

  async getCollection(collectionName) {
    if (this.collections[collectionName]) {
      return this.collections[collectionName]
    }
    const dbObject = await this.connectWithPromise()

    const dbCollection = dbObject.collection(collectionName)

    // TESTING: get all items in this collection and log
    dbCollection.find().toArray((err, result) => {
      if (err) throw err
      // console.log(result);
    })

    this.collections[collectionName] = dbCollection
    return dbCollection
  }
}

const dbConnection = new DbConnection()

module.exports = dbConnection
