import { useState, useEffect } from "react";

export default function useTarefas() {
	const [listaTarefas, setListaTarefas] = useState(() => {
		const tarefasSalvas = localStorage.getItem("tarefas");
		if (tarefasSalvas) {
			return JSON.parse(tarefasSalvas);
		}
		return [];
	});

	const [filtro, setFiltro] = useState("todos");

	useEffect(() => {
		localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
	}, [listaTarefas]);

	function adicionarNovaTarefa(nomeRecebido) {
		const novaTarefa = {
			id: Date.now(),
			nome: nomeRecebido,
			status: "pendente",
		};
		setListaTarefas([...listaTarefas, novaTarefa]);
	}

	function deletarTarefa(idTarefa) {
		const novaLista = listaTarefas.filter((tarefa) => tarefa.id !== idTarefa);
		setListaTarefas(novaLista);
	}

	function editarTarefa(idTarefa, novoNome) {
		const novaLista = listaTarefas.map((tarefa) =>
			tarefa.id === idTarefa ? { ...tarefa, nome: novoNome } : tarefa,
		);
		setListaTarefas(novaLista);
	}

	function alternarStatusTarefa(idTarefa) {
		const novaLista = listaTarefas.map((tarefa) =>
			tarefa.id === idTarefa
				? {
						...tarefa,
						status: tarefa.status === "pendente" ? "concluida" : "pendente",
					}
				: tarefa,
		);
		setListaTarefas(novaLista);
	}

	const tarefasFiltradas = listaTarefas.filter((tarefa) => {
		if (filtro === "todos") return true;
		return tarefa.status === "pendente"
			? filtro === "pendentes"
			: filtro === "concluidas";
	});

  return {
    listaTarefas,
    adicionarNovaTarefa,
    deletarTarefa,
    editarTarefa,
    alternarStatusTarefa,
    filtro,
    setFiltro,
    tarefasFiltradas,
  };
}
