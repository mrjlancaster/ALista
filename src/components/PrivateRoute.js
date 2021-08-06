import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<>
			<Route
				{...rest}
				render={(props) => {
					return localStorage.getItem("Token") ? (
						<Component {...props} />
					) : (
						<Redirect to="/login" />
					);
				}}
			/>
		</>
	);
};

export default PrivateRoute;
