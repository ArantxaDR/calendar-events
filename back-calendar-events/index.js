const express = require("express");
const app = express();
const port = 3000;
const calendarEventsRouter = require("./routes/calendarEvents");

app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.json({ message: "ok" });
});

app.use("/calendar-events", calendarEventsRouter);

//Middleware error handler
app.use((error, request, response, next) => {
	const statusCode = error.statusCode || 500;
	console.error(error.message, error.stack);
	response.status(statusCode).json({ message: error.message });
	return;
});

app.listen(port, () => {
	console.log(`Example works at http://localhost:${port}`);
});