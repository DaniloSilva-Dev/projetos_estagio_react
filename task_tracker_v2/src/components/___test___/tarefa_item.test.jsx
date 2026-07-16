import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import TarefaItem from "../tarefa_item";

describe("Componente item da lista de tarefas", () => {
	test("deve chamar a função onDeletar ao clicar no botão de deletar", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];
		const onDeletarMock = vi.fn();
		render(
			<TarefaItem
				tarefa={tarefas[0]}
				onDeletar={onDeletarMock}
				onEditar={vi.fn()}
				onAlternarStatus={vi.fn()}
			/>,
		);
		const botaoDeletar = screen.getByRole("button", {
			name: /excluir tarefa/i,
		});
		fireEvent.click(botaoDeletar);
		expect(onDeletarMock).toHaveBeenCalledWith(tarefas[0].id);
	});

	test("deve chamar a função onEditar ao clicar no botão de editar", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];

		const onEditarMock = vi.fn();
		render(
			<TarefaItem
				tarefa={tarefas[0]}
				onDeletar={vi.fn()}
				onEditar={onEditarMock}
				onAlternarStatus={vi.fn()}
			/>,
		);

		const botaoEditar = screen.getByRole("button", { name: /editar tarefa/i });
		fireEvent.click(botaoEditar);

		const inputNome = screen.getByLabelText(/nome da tarefa/i);
		fireEvent.change(inputNome, { target: { value: "tarefa editada" } });

		const botaoSalvar = screen.getByRole("button", { name: /salvar/i });
		fireEvent.click(botaoSalvar);

		expect(onEditarMock).toHaveBeenCalledWith(tarefas[0].id, "tarefa editada");
	});

	test("deve chamar a função onAlternarStatus ao clicar no botão de atualizar status", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];
		const onAlternarStatusMock = vi.fn();
		render(
			<TarefaItem
				tarefa={tarefas[0]}
				onDeletar={vi.fn()}
				onEditar={vi.fn()}
				onAlternarStatus={onAlternarStatusMock}
			/>,
		);
		const checkbox = screen.getByRole("checkbox");
		fireEvent.click(checkbox);
		expect(onAlternarStatusMock).toHaveBeenCalledWith(tarefas[0].id);
	});

	test("não deve mudar o nome caso o usuário não digite um novo nome ao editar a tarefa", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];
		const onEditarMock = vi.fn();
		render(
			<TarefaItem
				tarefa={tarefas[0]}
				onDeletar={vi.fn()}
				onEditar={onEditarMock}
				onAlternarStatus={vi.fn()}
			/>,
		);

		const botaoEditar = screen.getByRole("button", { name: /editar tarefa/i });
		fireEvent.click(botaoEditar);

		const inputNome = screen.getByLabelText(/nome da tarefa/i);
		fireEvent.change(inputNome, { target: { value: "   " } });

		const botaoSalvar = screen.getByRole("button", { name: /salvar/i });
		fireEvent.click(botaoSalvar);

		expect(onEditarMock).not.toHaveBeenCalled();
	});
});
