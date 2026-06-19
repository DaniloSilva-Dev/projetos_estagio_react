import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CookieConsent from "./components/CookieConsent";
import Conteudo from "./components/Conteudo";
import Saudacao from "./components/Saudacao";

function App() {
	const [abaSelecionada, setAbaSelecionada] = useState("primeira");
	return (
		<>
			<main className="App">
				<Box
					sx={{
						flexDirection: "row",
						display: "flex",
						justifyContent: "flex-start",
						gap: 2,
						marginTop: 2,
						marginBottom: 2,
					}}
				>
					<Button
						sx={{
							color: abaSelecionada === "primeira" ? "blue" : "text.primary",
						}}
						variant="text"
						size="medium"
						onClick={() => setAbaSelecionada("primeira")}
					>
						First Tab
					</Button>
					<Button
						sx={{
							color: abaSelecionada === "segunda" ? "blue" : "text.primary",
						}}
						variant="text"
						size="medium"
						onClick={() => setAbaSelecionada("segunda")}
					>
						Second Tab
					</Button>
					<Button
						sx={{
							color: abaSelecionada === "terceira" ? "blue" : "text.primary",
						}}
						variant="text"
						size="medium"
						onClick={() => setAbaSelecionada("terceira")}
					>
						Third Tab
					</Button>
					<Button
						sx={{
							color: abaSelecionada === "quarta" ? "blue" : "text.primary",
						}}
						variant="text"
						size="medium"
						onClick={() => setAbaSelecionada("quarta")}
					>
						Fourth Tab
					</Button>
				</Box>
				<p className="how-use">
					Clique em cada botão para ser mostrado o seu respectivo conteúdo.
				</p>
				<section className="tab-content">
					<Conteudo abaAtiva={abaSelecionada} />
				</section>
				<Saudacao />
				<CookieConsent />
			</main>
			<footer>&copy; Licenciado sob MIT</footer>
		</>
	);
}
export default App;
