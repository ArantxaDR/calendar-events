import axios from 'axios';
import { EventsDB, GetEventDBResponse } from '../interfaces/eventsDB.interface';
import config from "./config.json";

class DbService {
	getEvent = () => {
		const getAllEvents = axios.get<GetEventDBResponse>(config.EVENTS_API_URL).then((response) =>
			response.data);

		return getAllEvents;

	}

	updateEvent = (event: EventsDB) => {
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
		const updateResponse = axios.put<any>(config.EVENTS_API_URL + event.id, event, { headers }).then((response) =>
			response.data);

		return updateResponse;

	}

	addEvent = (event: EventsDB) => {
		const headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		};
		const addResponse = axios.post<any>(config.EVENTS_API_URL, event, { headers }).then((response) =>
			response.data);

		return addResponse;

	}

	deleteEvent = (eventId: number) => {
		const addResponse = axios.delete<any>(config.EVENTS_API_URL + eventId).then((response) =>
			response.data);

		return addResponse;
	}
}

export const eventsService = new DbService();