import React from 'react'
import { Button } from "@mui/material";

interface Props {
	handleAction?: () => void;
	name: string;
	disabled?: boolean;
}
export default function ButtonComponent(props: Props) {
	const { name, disabled = false, handleAction } = props;
	return (
		<Button onClick={handleAction} name={name} disabled={disabled} ></Button>
	)
}


