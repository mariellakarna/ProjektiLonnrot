/* require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection

const connectDB = async () => {
    try {
        
        const uri = process.env.MONGODB_URI;
        console.log('MongoDB URI:', uri);
        //const uri = "mongodb+srv://LonrotProkkis:<gR1KNaIj6sIxBI9N>@cluster0.jwsox3w.mongodb.net/";
        const test = await mongoose.connect(uri);
        console.log('MongoDB connection test:', test);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB; */


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://LonrotProkkis:gR1KNaIj6sIxBI9N@cluster0.mongodb.net/Lonnrot?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// Luo MongoClient yhteyden muodostamiseksi
const client = new MongoClient(uri);

async function connectDB() {
  try {
    const databaseName = client.db('Lonnrot'); // valitaan tietokanta
    const collectionName = databaseName.collection('Kirjasto'); // valitaan kokoelma

    // kysely kokoelmasta, haetaan tiettyä kirjaa määritetyn nimen mukaan


    FIXME 
    * etsi ratkaisu tuoda kirjan nimi frontendistä
    * ja etsi kirja sen mukaan
    const titleToFind = "etsitään tähän ratkaisu"; // kirjan nimi, jota etsitään
    const query = { title: titleToFind }; // kysely, joka etsii kirjaa nimeltä
    const book = await collectionName.findOne(query); // etsitään kirja kokoelmasta

    console.log("Kirja " + book + " löydetty"); // tulostetaan löydetty kirja konsoliin


    // Connect the client to the server	(optional starting in v4.7)
    // Yhdistä MongoDB-palvelimeen
    //await client.connect();
    // Send a ping to confirm a successful connection
    // Lähetä "ping" varmistaaksesi, että yhteys toimii
    //await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    } finally {
    // Ensures that the client will close when you finish/error
    // Sulje yhteys, kun et enää tarvitse sitä
    await client.close();
  }
}
module.exports = connectDB;
