import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ConversorTemperatura from "../componentes/conversor_temperatura";

describe("ConversorTemperatura", () => {
	test("desabilita o botao enquanto o formulario estiver invalido", () => {
		render(<ConversorTemperatura />);

		const botaoConverter = screen.getByRole("button", { name: /converter/i });
		expect(botaoConverter).toBeDisabled();

		fireEvent.change(screen.getByLabelText(/temperatura/i), {
			target: { value: "100" },
		});

		expect(botaoConverter).toBeEnabled();
	});

	test("converte temperatura ao submeter o formulario", () => {
		render(<ConversorTemperatura />);

		fireEvent.change(screen.getByLabelText(/temperatura/i), {
			target: { value: "100" },
		});

		fireEvent.click(screen.getByRole("button", { name: /converter/i }));

		expect(screen.getByText(/resultado:/i)).toHaveTextContent("Resultado: 212.0 F");
	});

	test("submete pelo formulario e converte corretamente", () => {
		render(<ConversorTemperatura />);

		fireEvent.change(screen.getByLabelText(/temperatura/i), {
			target: { value: "0" },
		});

		const formulario = screen.getByRole("button", { name: /converter/i }).closest("form");
		expect(formulario).not.toBeNull();

		fireEvent.submit(formulario);

		expect(screen.getByText(/resultado:/i)).toHaveTextContent("Resultado: 32.0 F");
	});

	test("nao reconverte ao trocar unidades sem temperatura", () => {
		render(<ConversorTemperatura />);

		const botaoConverter = screen.getByRole("button", { name: /converter/i });
		const botaoTrocar = screen
			.getAllByRole("button")
			.find((button) => button !== botaoConverter);

		expect(botaoTrocar).toBeDefined();

		fireEvent.click(botaoTrocar);

		expect(screen.getByText(/resultado:/i)).toHaveTextContent("Resultado:");
	});

	test("troca unidades e reconverte automaticamente", () => {
		render(<ConversorTemperatura />);

		fireEvent.change(screen.getByLabelText(/temperatura/i), {
			target: { value: "32" },
		});

		const botaoConverter = screen.getByRole("button", { name: /converter/i });
		const botaoTrocar = screen
			.getAllByRole("button")
			.find((button) => button !== botaoConverter);

		expect(botaoTrocar).toBeDefined();

		fireEvent.click(botaoTrocar);

		expect(screen.getByText(/resultado:/i)).toHaveTextContent("Resultado: 0.0 C");
	});
});
