import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useConversorTemperatura from "../hooks/use_conversor_temperatura";

describe("useConversorTemperatura", () => {
	test("inicia com estado vazio", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		expect(result.current.temperatura).toBe("");
		expect(result.current.resultado).toBe("");
	});

	test("atualiza a temperatura", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.setTemperatura("25");
		});

		expect(result.current.temperatura).toBe("25");
	});

	test("converte Celsius para Fahrenheit", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.converterTemperatura("100", "C", "F");
		});

		expect(result.current.resultado).toBe("212.0");
	});

	test("converte Fahrenheit para Celsius", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.converterTemperatura("32", "F", "C");
		});

		expect(result.current.resultado).toBe("0.0");
	});

	test("converte Celsius para Kelvin", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.converterTemperatura("0", "C", "K");
		});

		expect(result.current.resultado).toBe("273.1");
	});

	test("mantem valor ao converter para a mesma unidade", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.converterTemperatura("25", "C", "C");
		});

		expect(result.current.resultado).toBe("25.0");
	});

	test("retorna resultado vazio para valor invalido", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.converterTemperatura("abc", "C", "F");
		});

		expect(result.current.resultado).toBe("");
	});

	test("retorna resultado vazio para unidade invalida", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.converterTemperatura("10", "X", "F");
		});

		expect(result.current.resultado).toBe("");
	});

	test("limpa resultado quando valor invalido ocorre apos conversao valida", () => {
		const { result } = renderHook(() => useConversorTemperatura());

		act(() => {
			result.current.converterTemperatura("10", "C", "F");
		});
		expect(result.current.resultado).toBe("50.0");

		act(() => {
			result.current.converterTemperatura("invalido", "C", "F");
		});

		expect(result.current.resultado).toBe("");
	});
});
