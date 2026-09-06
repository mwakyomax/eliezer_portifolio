import { MongoClient, ServerApiVersion } from 'mongodb';

// Note: The '@' character in your password (Mwakyoma@123) is URL-encoded as '%40'
// to avoid breaking the connection URI parser.
const uri = process.env.MONGO_URI || "mongodb+srv://eliezaeliezer1318_db_user:Mwakyoma%40123@cluster0.anowmol.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 5000,
});

async function run() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("SUCCESS: Pinged your deployment. You successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Connection failed:", error.message);
    console.log("\nTroubleshooting tips:");
    console.log("1. Ensure your IP address is whitelisted in MongoDB Atlas under Network Access (use 0.0.0.0/0 to allow all cloud hosts).");
    console.log("2. Verify that your password has '@' encoded as '%40'.");
    console.log("3. Confirm the database user exists in Atlas under Database Access.");
  } finally {
    await client.close();
  }
}

run();
