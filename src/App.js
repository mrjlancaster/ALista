import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
// import LandingPage from "./layouts/LandingPage";

const App = () => {
	const [registrationEmail, setRegistrationEmail] = useState("");

	return (
		// <LandingPage />
		<Router>
			<div className="App">
				<Switch>
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
					<Route path="/" exact>
						<Home
							registrationEmail={registrationEmail}
							setRegistrationEmail={setRegistrationEmail}
						/>
					</Route>
					<Route path="/Login" component={Login} />
					<Route path="/register">
						<Register
							registrationEmail={registrationEmail}
							setRegistrationEmail={setRegistrationEmail}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
