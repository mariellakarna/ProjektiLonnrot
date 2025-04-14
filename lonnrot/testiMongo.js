const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://TestUser:test@kirjastoclusteri.k7xh5ll.mongodb.net/?retryWrites=true&w=majority&appName=KirjastoClusteri"
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      console.log("Yhteys onnistui!");
    } catch (err) {
      console.error("Virhe:", err);
    } finally {
      await client.close();
    }
  }


run();
