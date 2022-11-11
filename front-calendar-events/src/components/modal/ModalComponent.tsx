import React, { ChangeEvent, createRef, useEffect, useState } from 'react';

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
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [start, setStart] = useState<Date | null>();
	const [end, setEnd] = useState<Date | null>();

	useEffect(() => {
		if (selectedEvent !== undefined) {
			setStart(selectedEvent.startdate);
			setEnd(selectedEvent.enddate);
			setTitle(selectedEvent.title);
			setDescription(selectedEvent.description);
		}
	}, [selectedEvent])

	const handleOpenClose = () => {
		setOpen(!open);
	}

	const handleInputTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setTitle(event.target.value);
	}
	const handleInputDescription = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	}

	const updateEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		let eventToUpdate: EventsDB = {
			id: selectedEvent.id,
			title: title,
			description: description,
			startdate: (start !== undefined && start !== null) ? start : new Date(),
			enddate: (end !== undefined && end !== null) ? end : new Date(),
		};
		eventsService.updatEvent(eventToUpdate);
	};
	const deleteEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		eventsService.deleteEvent(selectedEvent.id);
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
						<InputComponent label="Title" value={title} handleChange={handleInputTitle} name="txtTitle" />
						<InputComponent label="Description" multiline={true} rows={3} handleChange={handleInputDescription} value={description} name="txtTitle" />
						<DatepickerComponent label="Start Date" value={start}
							handleChange={(newValue) => {
								setStart(newValue);

							}} />
						<DatepickerComponent label="End Date" value={end}
							handleChange={(newValue) => {
								setStart(newValue);
							}} />
					</div>
					<div className='btn-container'>
						<Button variant="contained" onClick={createEvent} name="Create" >Create</Button>
						<Button variant="contained" onClick={updateEvent} name="Update" >Update</Button>
						<Button variant="contained" color="error" onClick={deleteEvent} name="Delete" >Delete</Button>
					</div>
				</Box>

			</ Modal>
		</>
	)
}

export default ModalComponent