import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RenderizarCondicional from "./components/ExibirCondicional";

function App() {
	const [selectedTab, setSelectedTab] = useState(1);
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
						marginBottom: 2
					}}
				>
					<Button
						sx={{
							border: "none",
							color: selectedTab === 1 ? "blue" : "text.primary",
						}}
						variant="outlined"
						size="medium"
						onClick={() => setSelectedTab(1)}
					>
						First Tab
					</Button>
					<Button
						sx={{
							border: "none",
							color: selectedTab === 2 ? "blue" : "text.primary",
						}}
						variant="outlined"
						size="medium"
						onClick={() => setSelectedTab(2)}
					>
						Second Tab
					</Button>
					<Button
						sx={{
							border: "none",
							color: selectedTab === 3 ? "blue" : "text.primary",
						}}
						variant="outlined"
						size="medium"
						onClick={() => setSelectedTab(3)}
					>
						Third Tab
					</Button>
					<Button
						sx={{
							border: "none",
							color: selectedTab === 4 ? "blue" : "text.primary",
						}}
						variant="outlined"
						size="medium"
						onClick={() => setSelectedTab(4)}
					>
						Fourth Tab
					</Button>
				</Box>
				<p className="how-use">Clique em cada botão para ser mostrado o seu respectivo conteúdo.</p>
				<section className="tab-content">
					{RenderizarCondicional(selectedTab)}
				</section>
			</main>
			<footer>&copy; Licenciado sob MIT</footer>
		</>
	);
}
export default App;
