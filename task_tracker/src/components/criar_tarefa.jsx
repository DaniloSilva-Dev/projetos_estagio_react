import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export default function CriarTarefa({ onAdicionar }) {
	const [nomeTarefa, setNomeTarefa] = useState("");

	function onEnviar(evento) {
		evento.preventDefault();
		if (!nomeTarefa.trim()) return;

		onAdicionar(nomeTarefa);
		setNomeTarefa("");
	}

	return (
		<Box
			component="form"
			onSubmit={onEnviar}
			noValidate
			autoComplete="off"
			sx={{ display: "flex", alignItems: "center", width: "100%", marginBottom: 2 }}
		>
			<TextField
				label="Escreva e aperte Enter para criar a tarefa"
				id="nomeTarefa"
				variant="outlined"
        fullWidth
				value={nomeTarefa}
				onChange={(elemento) => setNomeTarefa(elemento.target.value)}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton type="submit" color="primary">
									<SendIcon />
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			/>
		</Box>
	);
}
