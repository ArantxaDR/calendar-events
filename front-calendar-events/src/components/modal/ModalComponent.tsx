import React, { createRef, useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { eventsService } from '../../services/dbService';
import { InputComponent } from '../shared/components/input/InputComponent';
import { ModalHeader } from './header/ModalHeader';
import './ModalComponent.scss';
import { DatepickerComponent } from '../shared/components/datepicker/DatePicker';
import { EventsDB } from '../../interfaces/eventsDB.interface';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: '#f7ffff',
	border: '2px solid #0080be',
	boxShadow: 24,
	p: 3,
};



export function ModalComponent({ open, setOpen, selectedEvent }: any): JSX.Element {

	//const [selectedEvent, setSelectedEvent] = useState<EventsDB>();
	const [start, setStart] = useState<Date | null>();
	const [end, setEnd] = useState<Date | null>();

	let refTitle = createRef<HTMLInputElement>();
	let refDescription = createRef<HTMLInputElement>();
	let refId = createRef<HTMLInputElement>();

	useEffect(() => {
		if (selectedEvent !== undefined) {
			setStart(selectedEvent.startdate);
			setEnd(selectedEvent.enddate);
		}
	}, [selectedEvent])





	const handleOpenClose = () => {
		setOpen(!open);
	}



	const updateEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		let eventToUpdate: EventsDB = {
			id: (refId.current?.value !== undefined) ? parseInt(refId.current.value) : 0,
			title: (refTitle.current?.value !== undefined) ? refTitle.current.value : "",
			description: (refDescription.current?.value !== undefined) ? refDescription.current.value : "",
			startdate: (start !== undefined && start !== null) ? start : new Date(),
			enddate: (end !== undefined && end !== null) ? end : new Date(),
		};
		eventsService.updatEvent(eventToUpdate);
	};
	const deleteEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log("delete")
	};
	const createEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log("create")
	};

	return (
		<>
			<Modal open={open} onClose={handleOpenClose}>
				<Box sx={style}>
					<ModalHeader title="Events details" onClose={handleOpenClose} />
					<div className='input-container'>
						<input type="hidden" value={selectedEvent?.id} ref={refId} />
						<InputComponent label="Title" value={selectedEvent?.title || ""} name="txtTitle" />
						<InputComponent label="Description" multiline={true} rows={3} value={selectedEvent?.description || ""} name="txtTitle" />
						<DatepickerComponent label="Start Date" value={start}
							handleChange={(newValue) => {
								setStart(newValue);

							}} />
						<DatepickerComponent label="End Date" value={end}
							handleChange={(newValue) => {
								setStart(newValue);

							}} />
						<Button onClick={updateEvent} className="button" name="Update" />
						<Button onClick={deleteEvent} className="button" name="Delete" />
						<Button onClick={createEvent} className="button" name="Create" />
					</div>
				</Box>

			</ Modal>
		</>
	)
}

export default ModalComponent