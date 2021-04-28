const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
	console.log(`Applikasi jalan di port ${port}`);
});
