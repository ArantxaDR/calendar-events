import React, { useState } from 'react';

import { Stack, Typography, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

import './Header.scss';

function Header() {
	const [t, i18n] = useTranslation("global");
	const [checked, setChecked] = useState(false);


	const handdlerChangeLanguage = (ev: any) => {
		let language: string = (checked === true) ? "en" : "es";
		i18n.changeLanguage(language);
		setChecked(!checked);
	}

	return (
		<header className='header'>
			<h1>{t("header.title")}</h1>
			<Stack className='toggle' direction="row" spacing={1} alignItems="center">
				<Typography>{t("header.english")}</Typography>
				<Switch
					checked={checked}
					onChange={handdlerChangeLanguage}
					inputProps={{ 'aria-label': 'controlled' }} />
				<Typography>{t("header.spanish")}</Typography>
			</Stack>
		</header>
	)
}

export default Header