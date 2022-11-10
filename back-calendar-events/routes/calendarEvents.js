const express = require('express');
const router = express.Router();
const calendarEvents = require("../services/calendarEvents");

//Get the events
router.get('/', async function (request, response, next) {
	try {
		response.json(await calendarEvents.getMultiple());
	} catch (error) {
		console.error('Error while getting calendar events', error.message);
		next(error);
	}
});

//Post an event
router.post('/', async function (request, response, next) {
	try {
		response.json(await calendarEvents.createEvent(request.body));
	} catch (error) {
		console.error('Error while creating events', error.message);
		next(error);
	}
})

//Update an event
router.put('/:id', async function (request, response, next) {
	try {
		response.json(await calendarEvents.updateEvent(request.params.id, request.body));
	} catch (error) {
		console.error(`Error while updating event`, error.message);
		next(error);
	}
})

//Delete an event
router.delete('/:id', async function (request, response, next) {
	try {
		response.json(await calendarEvents.deleteEvent(request.params.id));
	} catch (error) {
		console.error(`Error while deleting event`, error.message);
		next(error);
	}
})

module.exports = router;