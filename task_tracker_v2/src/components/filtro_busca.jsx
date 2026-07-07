import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function FiltroBusca({ filtroAtual, onMudarFiltro }) {
	return (
		<FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
			<FormLabel>Filtros</FormLabel>
			<RadioGroup
				row
				value={filtroAtual}
				onChange={(evento) => onMudarFiltro(evento.target.value)}
			>
				<FormControlLabel value="todos" control={<Radio />} label="Todos" />
				<FormControlLabel
					value="pendentes"
					control={<Radio />}
					label="Pendentes"
				/>
				<FormControlLabel
					value="concluidas"
					control={<Radio />}
					label="Concluídas"
				/>
			</RadioGroup>
		</FormControl>
	);
}
