import axios from 'axios';
import { EventsDB, GetEventDBResponse } from '../interfaces/eventsDB.interface';

class DbService {
	getEvent = () => {
		const eventsApi = 'http://localhost:3001/calendar-events';
		const getAllEvents = axios.get<GetEventDBResponse>(eventsApi).then((response) =>
			response.data);

		return getAllEvents;

	}

	updatEvent = (event: EventsDB) => {
		//console.log("update: " + event.title);
		const eventsApi = 'http://localhost:3001/calendar-events/';
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
		const updateResponse = axios.put<any>(eventsApi + event.id, event, { headers }).then((response) =>
			response.data);

		return updateResponse;

	}

	addEvent = (event: EventsDB) => {
		const eventsApi = 'http://localhost:3001/calendar-events';
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
		const addResponse = axios.post<any>(eventsApi, event, { headers }).then((response) =>
			response.data);

		return addResponse;

	}

	deleteEvent = (eventId: number) => {
		const eventsApi = 'http://localhost:3001/calendar-events/';
		const addResponse = axios.delete<any>(eventsApi + eventId).then((response) =>
			response.data);

		return addResponse;
	}
}

export const eventsService = new DbService();