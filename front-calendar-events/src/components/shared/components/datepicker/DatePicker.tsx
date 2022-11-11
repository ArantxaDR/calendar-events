import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/es';
import { useTranslation } from 'react-i18next';

import './DatePicker.scss';

interface Props {
	label: string;
	disabled?: boolean;
	value: Date | null | undefined;
	handleChange: (value: Date | null) => void;
}

export function DatepickerComponent(props: Props): JSX.Element {
	const { label, value, disabled, handleChange } = props;
	const [t, i18n] = useTranslation("global");

	const handleChangeDate = (newDate: Date | null): void => {
		handleChange(newDate);
	};
	return (
		<div className="datepicker-component">
			<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language} >

				<DateTimePicker
					label={label}
					value={value}
					disabled={disabled}
					onChange={handleChangeDate}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</div>)
}
