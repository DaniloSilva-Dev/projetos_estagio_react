import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import CriarTarefa from "./components/criar_tarefa";
import ListaTarefas from "./components/lista_tarefas";

export default function App() {
	const [listaTarefas, setListaTarefas] = useState(() => {
		const tarefasSalvas = localStorage.getItem("tarefas");
		if (tarefasSalvas) {
			return JSON.parse(tarefasSalvas);
		}
		return [];
	});

	useEffect(() => {
		localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
	}, [listaTarefas]);

	function adicionarNovaTarefa(nomeRecebido) {
		const novaTarefa = {
			id: Date.now(),
			nome: nomeRecebido,
			status: "pendente",
		};
		setListaTarefas([...listaTarefas, novaTarefa]);
	}

	function deletarTarefa(idTarefa) {
		const novaLista = listaTarefas.filter((tarefa) => tarefa.id !== idTarefa);
		setListaTarefas(novaLista);
	}

	function editarTarefa(idTarefa, novoNome) {
		const novaLista = listaTarefas.map((tarefa) =>
			tarefa.id === idTarefa ? { ...tarefa, nome: novoNome } : tarefa,
		);
		setListaTarefas(novaLista);
	}

	function alternarStatusTarefa(idTarefa) {
		const novaLista = listaTarefas.map((tarefa) =>
			tarefa.id === idTarefa
				? {
						...tarefa,
						status: tarefa.status === "pendente" ? "concluida" : "pendente",
					}
				: tarefa,
		);
		setListaTarefas(novaLista);
	}

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
					<ListaTarefas
						tarefas={listaTarefas}
						onDeletar={deletarTarefa}
						onEditar={editarTarefa}
						onAlternarStatus={alternarStatusTarefa}
					/>
				</Box>
			</main>
			<footer>&copy; Licenciado sob MIT</footer>
		</>
	);
}
