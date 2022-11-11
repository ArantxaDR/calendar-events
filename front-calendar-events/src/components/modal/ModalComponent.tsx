import React, { createRef, useEffect, useState } from 'react';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { EventsDB } from '../../interfaces/eventsDB.interface';
import { eventsService } from '../../services/dbService';
import { InputComponent } from '../shared/components/InputComponent';
import { ModalHeader } from './header/ModalHeader';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 450,
	bgcolor: 'white',
	border: '2px solid #000',
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

	return (
		<>
			<Modal open={open} onClose={handleOpenClose}>
				<Box sx={style}>
					<ModalHeader title="details.title" onClose={handleOpenClose} />

					<InputComponent label="Title" value={selectedEvent?.title || ""} name="txtTitle" />
					<InputComponent label="Description" multiline={true} rows={5} value={selectedEvent?.description || ""} name="txtTitle" />
					<input type="hidden" value={selectedEvent?.id} ref={refId} />
					{/* Title: <input type="text" defaultValue={selectedEvent?.title} name="txtTitle" ref={refTitle} /><br />
					Description: <input type="textarea" defaultValue={selectedEvent?.description} ref={refDescription} /><br /> */}
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							renderInput={(props) => <TextField {...props} />}
							label="Start Date"
							value={start}
							onChange={(newValue) => {
								setStart(newValue);

							}}
						/>
					</LocalizationProvider><br />
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							renderInput={(props) => <TextField {...props} />}
							label="End Date"
							value={end}
							onChange={(newValue) => {
								setEnd(newValue);
								//console.log(newValue);
							}}
						/>
					</LocalizationProvider><br />
					<Button onClick={updateEvent} className="button" name="Update" />
				</Box>

			</ Modal>
		</>
	)
}

export default ModalComponent