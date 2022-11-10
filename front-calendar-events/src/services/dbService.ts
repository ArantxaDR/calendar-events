import axios from 'axios';
import { EventsDB } from '../interfaces/eventsDB.interface';

class DbService {
	getEvent = () => {
		const eventsApi = 'http://localhost:3001/calendar-events';
		const getAllEvents = axios.get<EventsDB[]>(eventsApi).then((response) =>
			response.data);

		return getAllEvents;

	}
}

export const eventsService = new DbService();