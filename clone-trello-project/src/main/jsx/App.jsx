import React from "react";
import Navigation from "./components/navigation/Navigation";
import Main from "./config/Main";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "../assets/index.css";

function App() {
	return (
		<>
			<Navigation />
			<Main />
		</>
	);
}

export default App;
