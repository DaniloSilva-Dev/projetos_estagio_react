function RenderizarCondicional(value) {
	let content;

	switch (value) {
		case 2:
			content = (
				<>
					<h1>Conteúdo da Segunda Aba</h1>
					<p>Aqui está o parágrafo da segunda aba</p>
				</>
			);
			break;
		case 3:
			content = (
				<>
					<h1>Conteúdo da Terceira Aba</h1>
					<p>Aqui está o parágrafo da terceira aba</p>
				</>
			);
			break;
		case 4:
			content = (
				<>
					<h1>Conteúdo da Quarta Aba</h1>
					<p>Aqui está o parágrafo da quarta aba</p>
				</>
			);
			break;
		default:
			content = (
				<>
					<h1>Conteúdo da Primeira Aba</h1>
					<p>Aqui está o parágrafo da primeira aba</p>
				</>
			);
	}
	return content;
}

export default RenderizarCondicional;
