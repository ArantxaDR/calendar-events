import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './DatePicker.scss';

interface Props {
	label: string;
	disabled?: boolean;
	value: Date | null | undefined;
	handleChange: (value: Date | null) => void;
}

export function DatepickerComponent(props: Props): JSX.Element {
	const { label, value, disabled, handleChange } = props;

	const handleChangeDate = (newDate: Date | null): void => {
		handleChange(newDate);
	};
	return (
		<div className="datepicker-component">
			<LocalizationProvider dateAdapter={AdapterDateFns} >
				<DatePicker
					label={label}
					value={value}
					disabled={disabled}
					onChange={(newValue) => handleChangeDate(newValue!)}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</div>)
}
