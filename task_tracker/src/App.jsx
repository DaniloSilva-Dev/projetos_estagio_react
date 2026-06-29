import { useState } from "react";
import "./App.css";
import CriarTarefa from "./components/criar_tarefa";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<h1>Task Tracker</h1>
			<CriarTarefa />
		</>
	);
}

export default App;
