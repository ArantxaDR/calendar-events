import React, { ChangeEvent } from 'react';

import TextField from '@mui/material/TextField';

import './InputComponent.scss';
import { InputLabel } from '@mui/material';
// import { FormattedMessage } from 'react-intl';

interface Props {
	error?: boolean;
	InputLabelProps?: object;
	label?: string;
	multiline?: boolean;
	name?: string;
	rows?: number;
	type?: string;
	value: string;
	handleChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleBlur?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function InputComponent(props: Props): JSX.Element {
	const {
		value,
		handleChange,
		handleBlur,
		error,
		name,
		label,
		type,
		InputLabelProps,
		multiline,
		rows,
	} = props;

	return (
		<div className="input-container">
			{label && (
				<InputLabel htmlFor={name}>
					{label}
				</InputLabel>
			)}
			<TextField
				name={name}
				id={name}
				value={value}
				type={type || 'text'}
				error={error}
				onChange={handleChange}
				onBlur={handleBlur}
				InputLabelProps={InputLabelProps}
				multiline={multiline}
				rows={rows}
			/>
		</div>
	);
}
