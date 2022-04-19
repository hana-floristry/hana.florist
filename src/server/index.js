const express = require("express");
const path = require("path");
const app = express();

const dist = path.resolve(__dirname, "dist");

app.use("/api", require("./api"));
app.use(express.static(dist));

app.get("*", (_, res) => {
	res.sendFile(path.resolve(dist, "index.html"));
});

app.listen(3000);
