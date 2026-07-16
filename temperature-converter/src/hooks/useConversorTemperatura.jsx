import { useState } from "react";

export default function useConversorTemperatura() {
	const [temperatura, setTemperatura] = useState("");
	const [resultado, setResultado] = useState("");

	const converterTemperatura = (valor, unidadeOrigem, unidadeDestino) => {
		if (valor === "" || unidadeOrigem === "" || unidadeDestino === "") {
			setResultado("");
			return;
		}

		const numero = Number(valor);

		if (Number.isNaN(numero)) {
			setResultado("");
			return;
		}

		let valorConvertido;

		if (unidadeOrigem === "C" && unidadeDestino === "F") {
			valorConvertido = (numero * 9) / 5 + 32;
		} else if (unidadeOrigem === "F" && unidadeDestino === "C") {
			valorConvertido = ((numero - 32) * 5) / 9;
		} else if (unidadeOrigem === "C" && unidadeDestino === "K") {
			valorConvertido = numero + 273.15;
		} else if (unidadeOrigem === "K" && unidadeDestino === "C") {
			valorConvertido = numero - 273.15;
		} else if (unidadeOrigem === "F" && unidadeDestino === "K") {
			valorConvertido = ((numero - 32) * 5) / 9 + 273.15;
		} else if (unidadeOrigem === "K" && unidadeDestino === "F") {
			valorConvertido = ((numero - 273.15) * 9) / 5 + 32;
		} else {
			valorConvertido = numero;
		}

		setResultado(valorConvertido.toFixed(1));
	};

	return {
		temperatura,
		setTemperatura,
		resultado,
		converterTemperatura,
	};
}
