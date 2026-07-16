import {
	ListItem,
	ListItemText,
	Divider,
	IconButton,
	Button,
	Box,
	Checkbox,
	ListItemIcon,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function TarefaItem({
	tarefa,
	onDeletar,
	onEditar,
	onAlternarStatus,
}) {
	const isConcluida = tarefa.status === "concluida";
	const [abrirDialog, setAbrirDialog] = useState(false);
	const [novoNome, setNovoNome] = useState(tarefa.nome);

	const salvarEdicao = () => {
		if (novoNome.trim() !== "") {
			onEditar(tarefa.id, novoNome);
			setAbrirDialog(false);
		}
	};

	const fecharDialog = () => {
		setNovoNome(tarefa.nome);
		setAbrirDialog(false);
	};

	return (
		<ListItem
			secondaryAction={
				<Box>
					<IconButton
						edge="end"
						aria-label="editar tarefa"
						sx={{ mr: 1 }}
						onClick={() => {
							setAbrirDialog(true);
						}}
					>
						<EditIcon color="primary" />
					</IconButton>

					<Dialog open={abrirDialog} onClose={fecharDialog}>
						<DialogTitle>Editar Tarefa</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								label="Nome da Tarefa"
								type="text"
								fullWidth
								variant="outlined"
								value={novoNome}
								onChange={(evento) => setNovoNome(evento.target.value)}
								onKeyPress={(evento) =>
									evento.key === "Enter" ? salvarEdicao() : null
								}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={fecharDialog} color="primary">
								Cancelar
							</Button>
							<Button onClick={salvarEdicao} color="primary">
								Salvar
							</Button>
						</DialogActions>
					</Dialog>

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
          data-testid="checkbox-tarefa"
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
