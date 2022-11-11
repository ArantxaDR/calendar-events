import React from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import './ModalHeader.scss';

interface Props {
	title?: string;
	onClose?: () => void;
}

export function ModalHeader(props: Props): JSX.Element {
	const { title, onClose } = props;

	return (
		<section className="modal-header-container">
			{title && (
				<Typography variant="h6">
					{title}
				</Typography>
			)}
			{onClose && (
				<IconButton color="primary" size="small" aria-label="close" onClick={onClose}>
					<CloseIcon />
				</IconButton>
			)}
		</section>
	);
}
