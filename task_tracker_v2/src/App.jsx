import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import CriarTarefa from "./components/criar_tarefa";
import ListaTarefas from "./components/lista_tarefas";
import FiltroBusca from "./components/filtro_busca";
import useTarefas from "./hooks/useTarefas";

export default function App() {
  const {
    listaTarefas,
    adicionarNovaTarefa,
    deletarTarefa,
    editarTarefa,
    alternarStatusTarefa,
    filtro,
    setFiltro,
    tarefasFiltradas,
  } = useTarefas();
	return (
		<>
			<main>
				<Box
					sx={{
						maxWidth: 600,
						margin: "auto",
						mt: 4,
						p: 2,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h1"
						gutterBottom
						align="center"
						sx={{ fontSize: "4rem", mb: 4 }}
					>
						Task Tracker
					</Typography>

					<CriarTarefa onAdicionar={adicionarNovaTarefa} />
					<FiltroBusca filtroAtual={filtro} onMudarFiltro={setFiltro} />

					{tarefasFiltradas.length === 0 ? (
						<Typography
							variant="body"
							align="center"
							sx={{
								mt: 4,
								display: "block",
								fontSize: "1.2rem",
								color: "blue",
							}}
						>
							Nenhuma tarefa encontrada.
						</Typography>
					) : (
						<ListaTarefas
							tarefas={tarefasFiltradas}
							onDeletar={deletarTarefa}
							onEditar={editarTarefa}
							onAlternarStatus={alternarStatusTarefa}
						/>
					)}
				</Box>
			</main>
			<footer>&copy; Licenciado sob MIT</footer>
		</>
	);
}
