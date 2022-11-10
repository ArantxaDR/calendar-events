const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
	const offset = helper.getOffset(page, config.listPerPage);
	const rows = await db.query(
		`SELECT id, title, description, startdate, enddate FROM calendar_events LIMIT ${offset},${config.listPerPage}`
	);

	const data = helper.emptyOrRows(rows);
	const meta = { page };

	return {
		data,
		meta
	}
}

async function createEvent(calendarEvents) {
	const result = await db.query(
		`INSERT INTO calendar_events (title, description, startdate, enddate)
		VALUES (${calendarEvents.title}, ${calendarEvents.description},${calendarEvents.startdate},${calendarEvents.enddate} )`
	);

	let message = "Error in creating event";

	if (result.affectedRows) {
		message = 'Event created succesfully';
	}

	return { message };
}

async function updateEvent(id, calendarEvents) {
	const result = await db.query(
		`UPDATE calendar_events SET title="${calendarEvents.title}", description="${calendarEvents.description}",
		startdate="${calendarEvents.startdate}, enddate="${calendarEvents.enddate}"
		WHERE id=${id}`
	);

	let message = "Error in updating event";

	if (result.affectedRows) {
		message = "Event updated succfully";
	}

	return { message }
}

async function deleteEvent(id) {
	const result = await db.query(
		`DELETE FROM calendar_events WHERE id=${id}`
	);

	let message = "Error deleting event";

	if (result.affectedRows) {
		message = "Event deleted succesfully";
	}

	return { message }
}

module.exports = {
	getMultiple,
	createEvent,
	updateEvent,
	deleteEvent
}
