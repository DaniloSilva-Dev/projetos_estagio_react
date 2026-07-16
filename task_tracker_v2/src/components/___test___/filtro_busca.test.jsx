import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import FiltroBusca from "../filtro_busca";

describe("Componente filtro de busca", () => {
	test("deve renderizar os filtros disponíveis", () => {
		render(<FiltroBusca filtroAtual="todos" onMudarFiltro={vi.fn()} />);

		expect(screen.getByText(/filtros/i)).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: /todos/i })).toBeInTheDocument();
		expect(
			screen.getByRole("radio", { name: /pendentes/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("radio", { name: /concluídas/i }),
		).toBeInTheDocument();
	});

	test("deve marcar o filtro recebido por props como selecionado", () => {
		render(<FiltroBusca filtroAtual="pendentes" onMudarFiltro={vi.fn()} />);

		expect(screen.getByRole("radio", { name: /pendentes/i })).toBeChecked();
		expect(screen.getByRole("radio", { name: /todos/i })).not.toBeChecked();
		expect(
			screen.getByRole("radio", { name: /concluídas/i }),
		).not.toBeChecked();
	});

	test("deve chamar onMudarFiltro ao selecionar um filtro", () => {
		const onMudarFiltroMock = vi.fn();
		render(
			<FiltroBusca filtroAtual="todos" onMudarFiltro={onMudarFiltroMock} />,
		);

		const radioConcluidas = screen.getByRole("radio", {
			name: /concluídas/i,
		});
		fireEvent.click(radioConcluidas);

		expect(onMudarFiltroMock).toHaveBeenCalledWith("concluidas");
	});
});
