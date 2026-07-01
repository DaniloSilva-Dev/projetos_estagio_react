export const ABAS_DISPONIVEIS = {
  PRIMEIRA: 'primeira',
  SEGUNDA: 'segunda',
  TERCEIRA: 'terceira',
  QUARTA: 'quarta',
}

const conteudoAbas = {
	[ABAS_DISPONIVEIS.PRIMEIRA]: {
		titulo: "Conteudo da Primeira Aba",
		paragrafo: "Aqui está o paragrafo da primeira aba",
	},
	[ABAS_DISPONIVEIS.SEGUNDA]: {
		titulo: "Conteudo da Segunda Aba",
		paragrafo: "Aqui está o paragrafo da segunda aba",
	},
	[ABAS_DISPONIVEIS.TERCEIRA]: {
		titulo: "Conteudo da Terceira Aba",
		paragrafo: "Aqui está o paragrafo da terceira aba",
	},
	[ABAS_DISPONIVEIS.QUARTA]: {
		titulo: "Conteudo da Quarta Aba",
		paragrafo: "Aqui está o paragrafo da quarta aba",
	},
};

export default function Conteudo({ abaAtiva }) {
	const aba = conteudoAbas[abaAtiva] || conteudoAbas[ABAS_DISPONIVEIS.QUARTA];

  if (abaAtiva === ABAS_DISPONIVEIS.PRIMEIRA) {
    return <>outra coisa</>
  }

	return (
		<>
			<h1>{aba.titulo}</h1>
			<p>{aba.paragrafo}</p>
		</>
	);
}
