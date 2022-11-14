import React from 'react'
import { useTranslation } from 'react-i18next';

import './Footer.scss';

export default function Footer() {
	const [t] = useTranslation("global");
	return (
		<footer>
			<small>{t("footer.message")}</small>
		</footer>
	)
}
