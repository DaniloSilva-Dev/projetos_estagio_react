import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";
import ListaTarefa from "../lista_tarefas";

describe("Componente lista de tarefas", () => {
	test("não deve renderizar a lista se não houver tarefas", async () => {
		render(<ListaTarefa tarefas={[]} />);
		const lista = screen.queryByRole("list");
		expect(lista).not.toBeInTheDocument();
	});

	test("deve renderizar a lista de tarefas se houver tarefas", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];
		render(<ListaTarefa tarefas={tarefas} />);
		const lista = screen.getByRole("list");
		expect(lista).toBeInTheDocument();
	});

	test("deve renderizar as tarefas na ordem correta, quando há tarefas pendentes e concluídas", async () => {
		const tarefas = [
			{ id: 1, nome: "tarefa concluida", status: "concluida" },
			{ id: 2, nome: "tarefa pendente", status: "pendente" },
		];
		render(<ListaTarefa tarefas={tarefas} />);
		const itens = screen.getAllByRole("listitem");
		expect(itens[0]).toHaveTextContent("tarefa pendente");
		expect(itens[1]).toHaveTextContent("tarefa concluida");
	});

	test("deve renderizar as tarefas na ordem correta, quando há apenas tarefas com status iguais", async () => {
		const tarefas = [
			{ id: 1, nome: "tarefa 1", status: "pendente" },
			{ id: 2, nome: "tarefa 2", status: "pendente" },
		];
		render(<ListaTarefa tarefas={tarefas} />);
		const itens = screen.getAllByRole("listitem");
		expect(itens[0]).toHaveTextContent("tarefa 1");
		expect(itens[1]).toHaveTextContent("tarefa 2");
	});

	test("tarefa concluída deve ser renderizada após a tarefa pendente", async () => {
		const tarefas = [
			{ id: 1, nome: "tarefa pendente", status: "pendente" },
			{ id: 2, nome: "tarefa concluida", status: "concluida" },
		];
		render(<ListaTarefa tarefas={tarefas} />);
		const itens = screen.getAllByRole("listitem");
		expect(itens[0]).toHaveTextContent("tarefa pendente");
		expect(itens[1]).toHaveTextContent("tarefa concluida");
	});
});
