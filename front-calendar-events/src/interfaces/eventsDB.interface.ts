export interface EventsDB {
	id: number,
	title: string,
	description: string,
	startdate: Date,
	enddate: Date
}

export interface GetEventDBResponse {
	data: EventsDB[]
}