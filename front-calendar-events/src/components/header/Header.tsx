import React from 'react'
import './Header.scss';
import { useTranslation } from 'react-i18next';

function Header() {
	const [t, i18n] = useTranslation("global");

	const handdlerChangeLanguage = (ev: any) => {
		i18n.changeLanguage(ev.target.value);
	}

	return (
		<header className='header'>
			<h1>{t("header.title")}</h1>
			<select onChange={handdlerChangeLanguage}>
				<option value="en">English</option>
				<option value="es">Español</option>
			</select>
		</header>
	)
}

export default Header