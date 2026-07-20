import { useState } from "react";

const KELVIN_OFFSET = 273.15;

const paraCelsius = {
	C: (valor) => valor,
	F: (valor) => ((valor - 32) * 5) / 9,
	K: (valor) => valor - KELVIN_OFFSET,
};

const deCelsius = {
	C: (valor) => valor,
	F: (valor) => (valor * 9) / 5 + 32,
	K: (valor) => valor + KELVIN_OFFSET,
};

function converterValorTemperatura(valor, unidadeOrigem, unidadeDestino) {
	const numero = Number(valor);
	const valorCelsius = paraCelsius[unidadeOrigem](numero);
	return deCelsius[unidadeDestino](valorCelsius);
}

export default function useConversorTemperatura() {
	const [temperatura, setTemperatura] = useState("");
	const [resultado, setResultado] = useState("");

	const converterTemperatura = (valor, unidadeOrigem, unidadeDestino) => {
		const numero = Number(valor);

		if (Number.isNaN(numero)) {
			setResultado("");
			return;
		}

		if (!paraCelsius[unidadeOrigem] || !deCelsius[unidadeDestino]) {
			setResultado("");
			return;
		}

		const valorConvertido = converterValorTemperatura(
			valor,
			unidadeOrigem,
			unidadeDestino,
		);
		setResultado(valorConvertido.toFixed(1));
	};

	return {
		temperatura,
		setTemperatura,
		resultado,
		converterTemperatura,
	};
}
