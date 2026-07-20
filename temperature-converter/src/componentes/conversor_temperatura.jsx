import { useEffect, useState } from "react";
import {
	Typography,
	TextField,
	IconButton,
	Button,
	Box,
	MenuItem,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import useConversorTemperatura from "../hooks/use_conversor_temperatura";

export default function ConversorTemperatura() {
	const unidadesConhecidas = { C: "C", F: "F", K: "K" };
	const { temperatura, setTemperatura, resultado, converterTemperatura } =
		useConversorTemperatura();

	const [unidadeOrigem, setUnidadeOrigem] = useState(unidadesConhecidas.C);
	const [unidadeDestino, setUnidadeDestino] = useState(unidadesConhecidas.F);
	const [unidadeResultado, setUnidadeResultado] = useState("");
	const [envioPendente, setEnvioPendente] = useState(false);
	const formularioInvalido = !temperatura || !unidadeOrigem || !unidadeDestino;

	const lidarEnvio = (evento) => {
		evento.preventDefault();
		setEnvioPendente(true);
	};

	const lidarConversao = () => {
		converterTemperatura(temperatura, unidadeOrigem, unidadeDestino);
		setUnidadeResultado(unidadeDestino);
	};

	useEffect(() => {
		if (!envioPendente) {
			return;
		}

		lidarConversao();
		setEnvioPendente(false);
	}, [envioPendente, temperatura, unidadeOrigem, unidadeDestino]);

	const trocarUnidades = () => {
		const novaUnidadeOrigem = unidadeDestino;
		const novaUnidadeDestino = unidadeOrigem;

		setUnidadeOrigem(novaUnidadeOrigem);
		setUnidadeDestino(novaUnidadeDestino);

		if (
			temperatura !== "" &&
			novaUnidadeOrigem !== "" &&
			novaUnidadeDestino !== ""
		) {
			converterTemperatura(temperatura, novaUnidadeOrigem, novaUnidadeDestino);
			setUnidadeResultado(novaUnidadeDestino);
		}
	};

	return (
		<Box sx={{ width: "100%", maxWidth: 820 }}>
			<Typography variant="h5" gutterBottom>
				Conversor de Temperatura
			</Typography>
			<Box component="form" onSubmit={lidarEnvio}>
				<Box display="flex" gap={1} mb={2} >
					<TextField
						label="Temperatura"
						type="number"
						value={temperatura}
						onChange={(e) => setTemperatura(e.target.value)}
						variant="outlined"
						margin="normal"
					/>
					<TextField
						select
						label="Unidade de Origem"
						value={unidadeOrigem}
						onChange={(e) => setUnidadeOrigem(e.target.value)}
						variant="outlined"
						margin="normal"
						sx={{ minWidth: 200 }}
					>
						<MenuItem value="" disabled>
							De
						</MenuItem>
						<MenuItem value="C">Celsius (°C)</MenuItem>
						<MenuItem value="F">Fahrenheit (°F)</MenuItem>
						<MenuItem value="K">Kelvin (K)</MenuItem>
					</TextField>
					<IconButton onClick={trocarUnidades}>
						<SwapHorizIcon />
					</IconButton>
					<TextField
						select
						label="Unidade de Destino"
						value={unidadeDestino}
						onChange={(e) => setUnidadeDestino(e.target.value)}
						variant="outlined"
						margin="normal"
						sx={{ minWidth: 200 }}
					>
						<MenuItem value="" disabled>
							Para
						</MenuItem>
						<MenuItem value="C">Celsius (°C)</MenuItem>
						<MenuItem value="F">Fahrenheit (°F)</MenuItem>
						<MenuItem value="K">Kelvin (K)</MenuItem>
					</TextField>
				</Box>
				<Button type="submit" variant="contained" disabled={formularioInvalido}>
					Converter
				</Button>
			</Box>
			<Typography variant="h6">
				Resultado: {resultado} {unidadeResultado}
			</Typography>
		</Box>
	);
}
