const app = require("restana")();

app.get("/", (req, res) => {
	res.send("https://github.com/JadlionHD");
})

app.start(process.env.PORT || 3000, () => {
	console.log("Running express web");
});

module.exports = app;