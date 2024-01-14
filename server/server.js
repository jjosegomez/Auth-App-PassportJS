const express = require("express");
const dataList = require("./routes/dataList.js")

const app = express();
const PORT = 3000;

app.use(express.json());

// req gives you information from the front end. this is where you get cookies, auth, and data from user.
// res handles the information or response the server gives the client

app.use("/api",dataList)

//open for communication
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})