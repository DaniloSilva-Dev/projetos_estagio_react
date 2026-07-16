import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import CriarTarefa from "./components/criar_tarefa";
import ListaTarefas from "./components/lista_tarefas";
import useTarefas from "./components/hooks/useTarefas";

export default function App() {
	const {
		listaTarefas,
		adicionarNovaTarefa,
		deletarTarefa,
		editarTarefa,
		alternarStatusTarefa,
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
