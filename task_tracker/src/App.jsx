import { useState, useEffect } from "react";
import {Box, Typography} from '@mui/material';
import "./App.css";
import CriarTarefa from "./components/criar_tarefa";
import ListaTarefas from "./components/lista_tarefas";

export default function App() {
  const [listaTarefas, setListaTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if(tarefasSalvas){
      return JSON.parse(tarefasSalvas);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(listaTarefas));
  }, [listaTarefas]);

  function adicionarNovaTarefa(nomeRecebido){
    const novaTarefa = {
      id: Date.now(),
      nome: nomeRecebido,
      status: "pendente",
    };
    setListaTarefas([...listaTarefas, novaTarefa]);
  }

  function deletarTarefa(idTarefa){
    const novaLista = listaTarefas.filter( tarefa => tarefa.id !== idTarefa);
    setListaTarefas(novaLista);
  }

  function editarTarefa(idTarefa, novoNome){
    const novaLista = listaTarefas.map(tarefa => tarefa.id === idTarefa
      ? {...tarefa, nome : novoNome}
      : tarefa
    );
    setListaTarefas(novaLista);
  }

  function alternarStatysTarefa(idTarefa){
    const novaLista = listaTarefas.map(tarefa => tarefa.id === idTarefa ? {...tarefa, status: tarefa.status === 'pendente' ? 'concluida' : 'pendente' }
      : tarefa
    );
    setListaTarefas(novaLista);
  }

  return (
		<>
    <main>
			<Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, p:2}}>
        <Typography variant="h1" gutterBottom align="center">
          Task Tracker
        </Typography>

        <CriarTarefa onAdcionar={adicionarNovaTarefa} />
        <ListaTarefas
        tarefas={listaTarefas}
        onDeletar={deletarTarefa}
        onEditar={editarTarefa}/>
        onAlternarStatus={alternarStatusTarefa}
      </Box>
    </main>
    </>
	);
}
