import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import TarefaItem from "../tarefa_item";

describe("Componente item da lista de tarefas", () => {
	test("deve chamar a função onDeletar ao clicar no botão de deletar", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];
		const onDeletarMock = vi.fn();
		render(<TarefaItem tarefa={tarefas[0]} onDeletar={onDeletarMock} />);
		const botaoDeletar = screen.getByRole("button", {
			name: /excluir tarefa/i,
		});
		fireEvent.click(botaoDeletar);
		expect(onDeletarMock).toHaveBeenCalledWith(tarefas[0].id);
	});

	test("deve chamar a função onEditar ao clicar no botão de editar", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];

		const onEditarMock = vi.fn();
		window.prompt = vi.fn().mockReturnValue("tarefa editada");
		render(<TarefaItem tarefa={tarefas[0]} onEditar={onEditarMock} />);

		const botaoEditar = screen.getByRole("button", { name: /editar tarefa/i });
		fireEvent.click(botaoEditar);
		expect(onEditarMock).toHaveBeenCalledWith(tarefas[0].id, "tarefa editada");
		delete window.prompt;
	});

	test("deve chamar a função onAlternarStatus ao clicar no botão de atualizar status", async () => {
		const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];
		const onAlternarStatusMock = vi.fn();
		render(
			<TarefaItem
				tarefa={tarefas[0]}
				onAlternarStatus={onAlternarStatusMock}
			/>,
		);
		const checkbox = screen.getByTestId("alternar status da tarefa");

    const inputCheckbox = checkbox.querySelector("input[type='checkbox']");
    fireEvent.click(inputCheckbox);
    expect(onAlternarStatusMock).toHaveBeenCalledWith(tarefas[0].id);
	});

  test('não deve mudar o nome caso o usuário não digite um novo nome ao editar a tarefa', async () => {
    const tarefas = [{ id: 1, nome: "tarefa 1", status: "pendente" }];
    const onEditarMock = vi.fn();
    window.prompt = vi.fn().mockReturnValue("");
    render(<TarefaItem tarefa={tarefas[0]} onEditar={onEditarMock} />);
    const botaoEditar = screen.getByRole("button", { name: /editar tarefa/i });
    fireEvent.click(botaoEditar);
    expect(onEditarMock).not.toHaveBeenCalled();
    delete window.prompt;
  });
});
