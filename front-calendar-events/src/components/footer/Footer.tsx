import React from 'react'
import './Footer.scss';
import { useTranslation } from 'react-i18next';

export default function Footer() {
	const [t] = useTranslation("global");
	return (
		<footer>
			<small>{t("footer.message")}</small>
		</footer>
	)
}
