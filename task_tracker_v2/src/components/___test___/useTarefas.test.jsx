import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import useTarefas from "../../hooks/useTarefas";

describe("Hook useTarefas", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.restoreAllMocks();
	});

	test("deve iniciar com tarefas salvas no localStorage", () => {
		const tarefasIniciais = [
			{ id: 1, nome: "Tarefa salva", status: "pendente" },
		];
		localStorage.setItem("tarefas", JSON.stringify(tarefasIniciais));

		const { result } = renderHook(() => useTarefas());

		expect(result.current.listaTarefas).toEqual(tarefasIniciais);
	});

	test("deve adicionar uma nova tarefa", () => {
		const dateNowSpy = vi.spyOn(Date, "now").mockReturnValue(123);
		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.adicionarNovaTarefa("Nova tarefa");
		});

		expect(result.current.listaTarefas).toContainEqual({
			id: 123,
			nome: "Nova tarefa",
			status: "pendente",
		});
		expect(dateNowSpy).toHaveBeenCalled();
	});

	test("deve deletar uma tarefa existente", () => {
		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.adicionarNovaTarefa("Tarefa a remover");
		});

		const tarefaId = result.current.listaTarefas[0].id;

		act(() => {
			result.current.deletarTarefa(tarefaId);
		});

		expect(result.current.listaTarefas).toHaveLength(0);
	});

	test("deve editar o nome de uma tarefa", () => {
		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.adicionarNovaTarefa("Nome antigo");
		});

		const tarefaId = result.current.listaTarefas[0].id;

		act(() => {
			result.current.editarTarefa(tarefaId, "Nome novo");
		});

		expect(result.current.listaTarefas[0]).toEqual({
			id: tarefaId,
			nome: "Nome novo",
			status: "pendente",
		});
	});

	test("deve alternar o status da tarefa de pendente para concluida", () => {
		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.adicionarNovaTarefa("Tarefa status");
		});

		const tarefaId = result.current.listaTarefas[0].id;

		act(() => {
			result.current.alternarStatusTarefa(tarefaId);
		});

		expect(result.current.listaTarefas[0].status).toBe("concluida");
	});

	test("deve alternar o status da tarefa de concluida para pendente", () => {
		const tarefasIniciais = [
			{ id: 42, nome: "Tarefa concluida", status: "concluida" },
		];
		localStorage.setItem("tarefas", JSON.stringify(tarefasIniciais));

		const { result } = renderHook(() => useTarefas());
		const tarefaId = result.current.listaTarefas[0].id;

		act(() => {
			result.current.alternarStatusTarefa(tarefaId);
		});

		expect(result.current.listaTarefas[0].status).toBe("pendente");
	});

	test("nao deve alterar tarefas quando o id nao existir", () => {
		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.adicionarNovaTarefa("Tarefa 1");
		});

		const listaAntes = result.current.listaTarefas;

		act(() => {
			result.current.alternarStatusTarefa(999999);
		});

		expect(result.current.listaTarefas).toEqual(listaAntes);
	});

	test("deve salvar no localStorage quando a lista mudar", () => {
		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.adicionarNovaTarefa("Persistir tarefa");
		});

		expect(localStorage.getItem("tarefas")).toBe(
			JSON.stringify(result.current.listaTarefas),
		);
	});

	test("deve retornar apenas tarefas pendentes quando o filtro for pendentes", () => {
		const tarefasIniciais = [
			{ id: 1, nome: "Tarefa pendente", status: "pendente" },
			{ id: 2, nome: "Tarefa concluida", status: "concluida" },
		];
		localStorage.setItem("tarefas", JSON.stringify(tarefasIniciais));

		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.setFiltro("pendentes");
		});

		expect(result.current.tarefasFiltradas).toEqual([
			{ id: 1, nome: "Tarefa pendente", status: "pendente" },
		]);
	});

	test("deve retornar apenas tarefas concluídas quando o filtro for concluidas", () => {
		const tarefasIniciais = [
			{ id: 1, nome: "Tarefa pendente", status: "pendente" },
			{ id: 2, nome: "Tarefa concluida", status: "concluida" },
		];
		localStorage.setItem("tarefas", JSON.stringify(tarefasIniciais));

		const { result } = renderHook(() => useTarefas());

		act(() => {
			result.current.setFiltro("concluidas");
		});

		expect(result.current.tarefasFiltradas).toEqual([
			{ id: 2, nome: "Tarefa concluida", status: "concluida" },
		]);
	});
});
