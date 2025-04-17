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
		await client.connect();
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);

		const db = client.db("force_equals-challenge_1");
		const usersCollection = db.collection("users");
		const companiesCollection = db.collection("companies");

		// POST /login
		app.post("/login", async (req, res) => {
			const { username, password } = req.body;
			const user = await usersCollection.findOne({ username, password });

			if (user) {
				res.json({ message: "Login successful", token: "xyz" });
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		});
	} finally {
		// await client.close();
	}
}

run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Server is running...");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
