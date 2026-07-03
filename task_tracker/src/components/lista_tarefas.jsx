import List from "@mui/material/List";
import { Box, Divider } from "@mui/material";
import TarefaItem from "./tarefa_item";

export default function ListaTarefas({
	tarefas,
	onDeletar,
	onEditar,
	onAlternarStatus,
}) {
	const style = {
		py: 0,
		width: "100%",
		maxWidth: 360,
		borderRadius: 2,
		border: "1px solid",
		borderColor: "divider",
		backgroundColor: "background.paper",
	};

	const tarefaOrdenadas = [...tarefas].sort((tarefa, outraTarefa) => {
		if (tarefa.status === outraTarefa.status) return 0;
		return tarefa.status === "concluida" ? 1 : -1;
	});

	return (
		<List sx={style}>
			{tarefas.map((tarefa, indice) => (
				<Box key={tarefa.id}>
					<TarefaItem
						tarefa={tarefa}
						onDeletar={onDeletar}
						onEditar={onEditar}
						onAlternarStatus={onAlternarStatus}
					/>
					{indice < tarefaOrdenadas.length - 1 && <Divider />}
				</Box>
			))}
		</List>
	);
}
