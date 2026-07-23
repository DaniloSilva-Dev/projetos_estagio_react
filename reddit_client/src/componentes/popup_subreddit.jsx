import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
export default function PopupSubreddit({
  aberto,
  onConfirmar,
  onClose,
  onCancelar,
}) {
  const [subreddit, setSubreddit] = useState("");
  const lidarConfirmar = () => {
    if (subreddit.trim()) {
      onConfirmar(subreddit.trim());
      setSubreddit("");
    }
  };

  const lidarCancelar = () => {
    setSubreddit("");
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={aberto} onClose={onClose}>
      <DialogTitle>Adicionar Subreddit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Subreddit"
          fullWidth
          value={subreddit}
          onChange={(evento) => setSubreddit(evento.target.value)}
          onKeyDown={(evento) => {
            if (evento.key === "Enter") {
              lidarConfirmar();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            lidarCancelar();
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            lidarConfirmar();
          }}
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
