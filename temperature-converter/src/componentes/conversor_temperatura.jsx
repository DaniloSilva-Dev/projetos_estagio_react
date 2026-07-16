import React, { useEffect, useState } from "react";
import {
	Typography,
	TextField,
	IconButton,
	Button,
	Box,
	MenuItem,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import useConversorTemperatura from "../hooks/useConversorTemperatura";

export default function ConversorTemperatura() {
	const { temperatura, setTemperatura, resultado, converterTemperatura } =
		useConversorTemperatura();

	const [unidadeOrigem, setUnidadeOrigem] = useState("");
	const [unidadeDestino, setUnidadeDestino] = useState("");
	const [unidadeResultado, setUnidadeResultado] = useState("");
	const [submitPendente, setSubmitPendente] = useState(false);
	const podeConverter =
		temperatura !== "" && unidadeOrigem !== "" && unidadeDestino !== "";

	const handleConverter = () => {
		if (!podeConverter) {
			return;
		}

		converterTemperatura(temperatura, unidadeOrigem, unidadeDestino);
		setUnidadeResultado(unidadeDestino);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitPendente(true);
	};

	useEffect(() => {
		if (!submitPendente) {
			return;
		}

		handleConverter();
		setSubmitPendente(false);
	}, [submitPendente, temperatura, unidadeOrigem, unidadeDestino]);

	const handleSwapUnidades = () => {
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
			<Box component="form" onSubmit={handleSubmit}>
				<Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap">
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
					<IconButton onClick={handleSwapUnidades}>
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
				<Button type="submit" variant="contained" disabled={!podeConverter}>
					Converter
				</Button>
			</Box>
			<Typography variant="h6">
				Resultado: {resultado} {unidadeResultado}
			</Typography>
		</Box>
	);
}
