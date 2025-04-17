require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.port || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `${process.env.MONGODB_URI}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Server is running...");
});

app.listen(port, () => {
	console.log("Server is running...");
});
