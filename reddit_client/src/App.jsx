import { useState } from "react";
import ListaSubreddit from "./componentes/lista_subreddit";
import PopupSubreddit from "./componentes/popup_subreddit";
import useGerenciadorSubreddit from "./hooks/use_gerenciador_subreddit";
import "./App.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

function App() {
  const [abertoPopup, setAbertoPopup] = useState(false);
  const { subredditsAtivos, lidarConfirmar, lidarRemover, aviso, fecharAviso } =
    useGerenciadorSubreddit();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        minHeight: "100vh",
      }}
    >
      <Button
        sx={{ borderRadius: 50, fontSize: 25, padding: 2, fontWeight: "bold" }}
        variant="text"
        color="primary"
        onClick={() => {
          setAbertoPopup(true);
        }}
      >
        +
      </Button>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {subredditsAtivos.map((subreddit) => (
          <ListaSubreddit
            key={subreddit}
            subreddits={subreddit}
            onRemover={() => lidarRemover(subreddit)}
            onAtualizar={() => console.log("Atualizar", subreddit)}
          />
        ))}
      </div>
      <PopupSubreddit
        aberto={abertoPopup}
        onConfirmar={(subreddit) => {
          lidarConfirmar(subreddit);
          setAbertoPopup(false);
        }}
        onClose={() => setAbertoPopup(false)}
      />
      <Dialog open={aviso.aberto} onClose={fecharAviso}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          <Typography>{aviso.mensagem}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharAviso} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
