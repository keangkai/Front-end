import React from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Product from "./Product/Product"
import { Route } from "react-router-dom"
import ProductDetail from "./Product/ProductDetail"

function App() {
	return (
		<div className="container">
			<Route
				exact
				path="/"
				render={(routeProps) => <Product {...routeProps} />}
			/>
			<Route
				path="/:id"
				render={(routeProps) => <ProductDetail {...routeProps} />}
			/>
		</div>
	)
}

export default App
