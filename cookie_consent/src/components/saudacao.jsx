import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

export default function Saudacao() {
	const [mensagem, setMensagem] = useState("");
	const [mostrarSaudacao, setMostrarSaudacao] = useState(true);

	useEffect(() => {
		const consentimento = localStorage.getItem("user-consent");

		if (!consentimento) {
			setMensagem("Bem-vindo! É sua primeira vez aqui.");
		} else {
			setMensagem("Bem-vindo de volta!");
		}
	}, []);

	if (!mostrarSaudacao) return null;

	return (
		<div className="saudacao">
			<h2>{mensagem}</h2>
			<Button
				className="fechar"
				variant="contained"
				size="small"
				onClick={() => setMostrarSaudacao(false)}
			>
				fechar
			</Button>
		</div>
	);
}
