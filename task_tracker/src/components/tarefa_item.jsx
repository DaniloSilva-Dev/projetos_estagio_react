import {
	ListItem,
	ListItemText,
	Divider,
	IconButton,
	Box,
	Checkbox,
	ListItemIcon,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function TarefaItem({
	tarefa,
	onDeletar,
	onEditar,
	onAlternarStatus,
}) {
	const isConcluida = tarefa.status === "concluida";

	return (
		<ListItem
			secondaryAction={
				<Box>
					<IconButton
						edge="end"
						aria-label="editar tarefa"
						sx={{ mr: 1 }}
						onClick={() => {
							const novoNome = prompt(
								"digite o novo nome da Tarefa:",
								tarefa.nome,
							);
							if (novoNome) onEditar(tarefa.id, novoNome);
						}}
					>
						<EditIcon color="primary" />
					</IconButton>

					<IconButton
						edge="end"
						aria-label="excluir tarefa"
						onClick={() => onDeletar(tarefa.id)}
					>
						<DeleteIcon color="primary" />
					</IconButton>
				</Box>
			}
		>
			<ListItemIcon>
				<Checkbox
          data-testid="alternar status da tarefa"
					edge="start"
					checked={isConcluida}
					onChange={() => onAlternarStatus(tarefa.id)}
				/>
			</ListItemIcon>
			<ListItemText
				primary={tarefa.nome}
				secondary={`status: ${tarefa.status}`}
				sx={{ textDecoration: isConcluida ? "line-through" : "none" }}
			/>
		</ListItem>
	);
}
