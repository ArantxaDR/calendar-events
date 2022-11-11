import React, { ChangeEvent, useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { eventsService } from '../../services/dbService';
import { InputComponent } from '../shared/components/input/InputComponent';
import { ModalHeader } from './header/ModalHeader';
import './ModalComponent.scss';
import { DatepickerComponent } from '../shared/components/datepicker/DatePicker';
import { EventsDB } from '../../interfaces/eventsDB.interface';

const style = {
	display: 'flex',
	flexDirection: 'column',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'auto',
	bgcolor: '#f7ffff',
	border: '2px solid #0080be',
	boxShadow: 24,
	p: 3,
};

export function ModalComponent({ open, setOpen, selectedEvent, setSelectedEvent }: any): JSX.Element {

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [start, setStart] = useState<Date | null>();
	const [end, setEnd] = useState<Date | null>();
	const [validation, setValidation] = useState(false);

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
		setValidation(false);
	}
	const handleInputDescription = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setDescription(event.target.value);
	}
	const handleStartDateChange = (newValue: Date | null) => {
		setStart(newValue);
		setValidation(false)
	}
	const handleEndDateChange = (newValue: Date | null) => {
		setEnd(newValue);
		setValidation(false)
	}

	const modifySelectedEvent = () => {
		let eventToModify: EventsDB = {
			id: selectedEvent.id,
			title: title,
			description: description,
			startdate: (start !== undefined && start !== null) ? start : new Date(),
			enddate: (end !== undefined && end !== null) ? end : new Date(),
		};
		return eventToModify;
	}

	const updateEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		let eventToUpdate: EventsDB = modifySelectedEvent();
		eventsService.updatEvent(eventToUpdate);
	};

	const createEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		let eventToAdd: EventsDB = modifySelectedEvent();
		if (eventToAdd.title.length === 0 || eventToAdd.startdate > eventToAdd.enddate) {
			setValidation(true)
		}
		eventsService.addEvent(eventToAdd);
	};

	const deleteEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		eventsService.deleteEvent(selectedEvent.id);
	};

	return (
		<>
			<Modal open={open} onClose={handleOpenClose}>
				<Box sx={style}>
					<ModalHeader title="Events details" onClose={handleOpenClose} />
					<div className='container'>
						<div className='title-container'>
							<InputComponent id="outlined-required" label="Title" value={title} handleChange={handleInputTitle} name="txtTitle" />
							{validation ? <small className='error'>Title can't be empty</small> : ''}
						</div>
						<InputComponent label="Description" multiline={true} rows={2} handleChange={handleInputDescription} value={description} name="txtTitle" />
						<div className="dates-container">
							<DatepickerComponent label="Start Date" value={start}
								handleChange={handleStartDateChange} />
							{validation ? <small className='error'>Please enter a valid date</small> : null}
							<DatepickerComponent label="End Date" value={end}
								handleChange={handleEndDateChange} />
							{validation ? <small className='error'>Please enter a valid date</small> : null}
						</div>
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