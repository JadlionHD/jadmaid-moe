const app = require("express")();

app.get("/", (req, res) => {
	res.send("https://github.com/JadlionHD");
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Running express web");
});

module.exports = app;