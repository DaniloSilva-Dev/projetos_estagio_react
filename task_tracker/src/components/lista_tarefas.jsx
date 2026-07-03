import List from "@mui/material/List";
import { Box, Divider } from "@mui/material";
import TarefaItem from "./tarefa_item";

export default function ListaTarefas({
	tarefas,
	onDeletar,
	onEditar,
	onAlternarStatus,
}) {

  if(tarefas.length === 0) return null;

	const style = {
		py: 0,
    justifySelf:"center",
		width: "100%",
		borderRadius: 2,
		border: "1px solid",
		borderColor: "divider",
		backgroundColor: "background.paper",
	};

	const tarefasOrdenadas = [...tarefas].sort((tarefa, outraTarefa) => {
		if (tarefa.status === outraTarefa.status) return 0;
		return tarefa.status === "concluida" ? 1 : -1;
	});

	return (
		<List sx={style}>
			{tarefasOrdenadas.map((tarefa, indice) => (
				<Box key={tarefa.id}>
					<TarefaItem
						tarefa={tarefa}
						onDeletar={onDeletar}
						onEditar={onEditar}
						onAlternarStatus={onAlternarStatus}
					/>
					{indice < tarefasOrdenadas.length - 1 && <Divider />}
				</Box>
			))}
		</List>
	);
}
