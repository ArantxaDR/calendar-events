import React, { ChangeEvent } from 'react';

import TextField from '@mui/material/TextField';
import './InputComponent.scss';


interface Props {
	id?: string;
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
		id,
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

			<TextField
				label={label}
				name={name}
				id={id}
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
