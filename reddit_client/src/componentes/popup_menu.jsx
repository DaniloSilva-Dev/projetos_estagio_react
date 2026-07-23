import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PopupMenu({ onRemover, onAtualizar }) {
  const [ancoraElemento, setAncoraElemento] = useState(null);
  const aberto = Boolean(ancoraElemento);

  const abrirMenu = (evento) => {
    setAncoraElemento(evento.currentTarget);
  };

  const fecharMenu = () => {
    setAncoraElemento(null);
  };

  const lidarRemover = () => {
    if (onRemover) {
      onRemover();
    }
    fecharMenu();
  };

  const lidarAtualizar = () => {
    if (onAtualizar) {
      onAtualizar();
    }
    fecharMenu();
  };

  return (
    <>
      <IconButton onClick={abrirMenu}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu anchorEl={ancoraElemento} open={aberto} onClose={fecharMenu}>
        <MenuItem onClick={lidarAtualizar}>Atualizar</MenuItem>
        <MenuItem onClick={lidarRemover}>Remover</MenuItem>
      </Menu>
    </>
  );
}
