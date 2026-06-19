import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

export default function CookieConsent() {
	const [mostrarPopup, setMostrarPopup] = useState(false);

	useEffect(() => {
		const consentimento = localStorage.getItem("user-consent");

		if (!consentimento) {
			setMostrarPopup(true);
		}
	}, []);

	const aceitarCookies = () => {
		localStorage.setItem("user-consent", "accepted");
		setMostrarPopup(false);
	};

	const recusarCookies = () => {
		localStorage.setItem("user-consent", "rejected");
		setMostrarPopup(false);
	};

	if (!mostrarPopup) return null;

	return (
		<div className="popup">
			<img
				className="cookie"
				src="/assets/cookie-clicker.svg"
				alt="imagem de um cookie"
			/>
			<p>Usamos cookies para melhorar sua experiência.</p>
			<Button
				sx={{ marginTop: 0.5 }}
				variant="outlined"
				className="reject"
				onClick={aceitarCookies}
			>
				Aceitar Cookies!
			</Button>
			<Button
				sx={{ marginTop: 0.5 }}
				variant="outlined"
				className="accept"
				onClick={recusarCookies}
			>
				Rejeitar Cookies!
			</Button>
		</div>
	);
}
