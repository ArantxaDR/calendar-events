import React, { ChangeEvent, useEffect, useState } from 'react';

import { Box, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { eventsService } from '../../services/dbService';
import { InputComponent } from '../shared/components/input/InputComponent';
import { ModalHeader } from './header/ModalHeader';
import './ModalComponent.scss';
import { DatepickerComponent } from '../shared/components/datepicker/DatePicker';
import { EventsDB } from '../../interfaces/eventsDB.interface';
import { useTranslation } from 'react-i18next';
import Loading from '../shared/components/loading/Loading';

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

export function ModalComponent({ open, setOpen, selectedEvent, setRefreshEvents }: any): JSX.Element {

	const [t] = useTranslation("global");
	const [loading, setLoading] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [start, setStart] = useState<Date | null>();
	const [end, setEnd] = useState<Date | null>();
	const [validation, setValidation] = useState(false);
	const [updateDeleteDisabled, setUpdateDeleteDisabled] = useState(false);
	const [createDisablled, setCreateDisablled] = useState(false);

	useEffect(() => {
		if (selectedEvent !== undefined) {
			setStart(selectedEvent.startdate);
			setEnd(selectedEvent.enddate);
			setTitle(selectedEvent.title);
			setDescription(selectedEvent.description);
			if (selectedEvent.id === undefined) {
				setUpdateDeleteDisabled(true);
				setCreateDisablled(false);
			}
			else {
				setUpdateDeleteDisabled(false);
				setCreateDisablled(true);
			}
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
		setLoading(true);
		let eventToUpdate: EventsDB = modifySelectedEvent();
		eventsService.updatEvent(eventToUpdate);
		handleOpenClose();
		setRefreshEvents(true);
		setLoading(false)
	};

	const createEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		setLoading(true);
		let eventToAdd: EventsDB = modifySelectedEvent();
		if (eventToAdd.title.length === 0 || eventToAdd.startdate > eventToAdd.enddate) {
			setValidation(true)
		}
		eventsService.addEvent(eventToAdd);
		handleOpenClose();
		setRefreshEvents(true);
		setLoading(false);

	};

	const deleteEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
		setLoading(true);
		eventsService.deleteEvent(selectedEvent.id);
		handleOpenClose();
		setRefreshEvents(true);
		setLoading(false);
	};

	return (
		<>
			<Modal open={open} onClose={handleOpenClose}>
				<Box sx={style}>
					{loading ? (
						<Loading />
					) : (
						<>

							<ModalHeader title={t("modal.detailstitle")} onClose={handleOpenClose} />
							<div className='container'>
								<div className='title-container'>
									<InputComponent id="outlined-required" label={t("modal.title")} value={title} handleChange={handleInputTitle} name="txtTitle" />
									{validation ? <small className='error'>{t("validation.title")}</small> : ''}
								</div>
								<InputComponent label={t("modal.description")} multiline={true} rows={2} handleChange={handleInputDescription} value={description} name="txtTitle" />
								<div className="dates-container">
									<DatepickerComponent label={t("modal.startdate")} value={start}
										handleChange={handleStartDateChange} />
									{validation ? <small className='error'>{t("validation.date")}</small> : null}
									<DatepickerComponent label={t("modal.enddate")} value={end}
										handleChange={handleEndDateChange} />
									{validation ? <small className='error'>{t("validation.date")}</small> : null}
								</div>
							</div>
							<div className='btn-container'>
								<Button variant="contained" onClick={createEvent} name="Create" disabled={createDisablled} >{t("modal.create")}</Button>
								<Button variant="contained" onClick={updateEvent} name="Update" disabled={updateDeleteDisabled} >{t("modal.update")}</Button>
								<Button variant="contained" color="error" onClick={deleteEvent} name="Delete" disabled={updateDeleteDisabled} >{t("modal.delete")}</Button>
							</div>
						</>
					)}</Box>

			</ Modal>
		</>
	)
}

export default ModalComponent