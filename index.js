const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

//middel tair

app.use(cors());
app.use(express.json());

//database info

//name: node-login
//password: 8QDRANpTunyPGHzu

const uri = `mongodb+srv://assignment11:odCfWseqJ17Mh5fw@cluster0.nvnfe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("nodeLogin").collection("user");
    console.log("bd connected");

    // simple get
    app.get("/user", async (req, res) => {
      const result = await userCollection.find({}).toArray();
      res.send(result);
    });

    //simple post
    app.post("/user", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });

    //simple post
    app.post("/login", async (req, res) => {
      try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await userCollection.findOne({email: email});

        // authentication
        if(userEmail.password === password){
          res.status(200).send({message:"Login success"});
          console.log('su');
        }else{
          res.status(201).send({message:"Invalid password"});
          console.log('pas');
        }
      } catch {
        res.status(500).send({ message: "login falid" });
        console.log('em');
      }
    });
  } finally {
    //   await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello ami calu aci");
});

app.listen(port, () => {
  console.log(`ami calu aci ${port}`);
});
