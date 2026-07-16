import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import CriarTarefa from "../criar_tarefa";

describe("Componente criar tarefa", () => {
	test("deve renderizar o componente de criar tarefa corretamente", async () => {
		render(<CriarTarefa />);

		const input = screen.getByLabelText(
			/Escreva e aperte Enter para criar a tarefa/i,
		);
		expect(input).toBeInTheDocument();
	});
	test("deve chamar a função onAdicionar com o valor correto ao enviar o formulário", async () => {
		const onAdicionarMock = vi.fn();
		render(<CriarTarefa onAdicionar={onAdicionarMock} />);

		const input = screen.getByLabelText(
			/escreva e aperte enter para criar a tarefa/i,
		);
		fireEvent.change(input, { target: { value: "nova tarefa" } });
		fireEvent.submit(input);

		expect(onAdicionarMock).toHaveBeenCalledWith("nova tarefa");
	});
	test("não deve chamar a função onAdicionar se o input estiver vazio", async () => {
		const onAdicionarMock = vi.fn();
		render(<CriarTarefa onAdicionar={onAdicionarMock} />);

		const input = screen.getByLabelText(
			/escreva e aperte enter para criar a tarefa/i,
		);
		fireEvent.change(input, { target: { value: "   " } });
		fireEvent.submit(input);

		expect(onAdicionarMock).not.toHaveBeenCalled();
	});
});
