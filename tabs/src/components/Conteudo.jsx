const conteudoAbas = {
	primeira: {
		titulo: "Conteudo da Primeira Aba",
		paragrafo: "Aqui está o paragrafo da primeira aba"
	},
	segunda: {
		titulo: "Conteudo da Segunda Aba",
		paragrafo: "Aqui está o paragrafo da segunda aba"
	},
	terceira:{
		titulo: "Conteudo da Terceira Aba",
		paragrafo: "Aqui está o paragrafo da terceira aba"
	},
	quarta:{
		titulo: "Conteudo da Quarta Aba",
		paragrafo: "Aqui está o paragrafo da quarta aba"
	}
};

export default function Conteudo({abaAtiva}) {
	const aba = conteudoAbas[abaAtiva] || conteudoAbas.primeira;

		return (
			<>
				<h1>{aba.titulo}</h1>
				<p>{aba.paragrafo}</p>
			</>
		);
}
