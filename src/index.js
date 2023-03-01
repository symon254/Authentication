import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { ContextProvider } from "./Context/ContextProvider";
//import { AuthContextProvider } from "./Context/authContextProvider";
import { Provider } from "react-redux";
import store from "./Utils/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ContextProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ContextProvider>
	</React.StrictMode>
);
