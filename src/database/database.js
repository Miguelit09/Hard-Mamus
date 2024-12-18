const MongoClient = require('mongodb').MongoClient;
const { MongoMemoryServer } = require('mongodb-memory-server');

class Database {
    constructor() {
        this.mongoUrl = '';
        this.dbName = 'certificatesDatabase';
        this.collectionName = 'certificates';
        this.db = null;
        this.certificatesCollection = null;
    }

    async connect() {
        try {
            const mongoServer = await MongoMemoryServer.create();
            this.mongoUrl = mongoServer.getUri();
            const client = new MongoClient(this.mongoUrl);
            await client.connect();
            this.db = client.db(this.dbName);
            this.certificatesCollection = this.db.collection(this.collectionName);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error(error);
        }
    }

    getCertificatesCollection() {
        return this.certificatesCollection;
    }
}

module.exports = Database;