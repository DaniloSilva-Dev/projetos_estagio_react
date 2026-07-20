import { useState } from "react";

const KELVIN_OFFSET = 273.15;

const paraCelsius = {
	C: (value) => value,
	F: (value) => ((value - 32) * 5) / 9,
	K: (value) => value - KELVIN_OFFSET,
};

const deCelsius = {
	C: (value) => value,
	F: (value) => (value * 9) / 5 + 32,
	K: (value) => value + KELVIN_OFFSET,
};

function converterValorTemperatura(valor, unidadeOrigem, unidadeDestino) {
	const numero = Number(valor);
	const celsiusValue = paraCelsius[unidadeOrigem](numero);
	return deCelsius[unidadeDestino](celsiusValue);
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
