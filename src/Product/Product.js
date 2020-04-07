import React from "react"

import { Card } from "react-bootstrap"

class Product extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			isLoaded: false,
			product: [],
			isList: null,
		}
	}

	async componentDidMount() {
		await fetch("https://cc-mock-api.herokuapp.com/product/")
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						product: result,
					})
				},
				(error) => {
					this.setState({
						isLoaded: false,
						error,
					})
				}
			)
	}

	renderGrid = (product) => {
		return (
			<>
				{product.map((products, index) => (
					<div className="row boxGrid mb-4" key={index}>
						<div className="col-sm-12 col-md-12 col-lg-3">
							<img src={products.image_url} alt="brand" width="80%" />
						</div>
						<div className="col-sm-12 col-md-12 col-lg-6 p-4">
							<h3>{products.name}</h3>
							<p>{products.description}</p>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-3 text-right p-4">
							<p className="price text-right font-weight-bold">
								{products.price}
							</p>
							<button
								className="btn btn-primary"
								onClick={() => this.props.history.push(`/${products._id}`)}
							>
								Detail
							</button>
						</div>
					</div>
				))}
			</>
		)
	}

	renderList = (product) => {
		return (
			<div className="row">
				{product.map((products, index) => (
					<div className="col-sm-12 col-md-6 col-lg-3 mb-4" key={index}>
						<Card>
							<Card.Img variant="top" src={products.image_url} />
							<Card.Body>
								<Card.Title>
									<div className="row">
										<div className="col-12 d-flex">
											<img
												className="mr-2"
												src={products.brand_info.url}
												alt="brand"
												width="20%"
												style={{ borderRadius: "5px" }}
											/>
											<p className="overflow-ellipsis">{products.name}</p>
										</div>
									</div>
								</Card.Title>
								<p className="overflow-ellipsis">{products.description}</p>
								<p className="price text-right font-weight-bold">
									{products.price}
								</p>
								<button
									className="btn btn-primary btn-block"
									onClick={() => this.props.history.push(`/${products._id}`)}
								>
									Detail
								</button>
							</Card.Body>
						</Card>
					</div>
				))}
			</div>
		)
	}

	handleLayout = (List) => {
		if (List === "list") {
			this.setState({
				isList: "list",
			})
		} else {
			this.setState({
				isList: "grid",
			})
		}
	}

	renderComponent = (product) => {
		const { isList } = this.state
		switch (isList) {
			case "list":
				return this.renderList(product)
			case "grid":
				return this.renderGrid(product)
			default:
				return this.renderList(product)
		}
	}

	render() {
		const { error, isLoaded, product } = this.state
		if (error) {
			return <div>Error: {error.message}</div>
		} else if (!isLoaded) {
			return <div>Loading...</div>
		} else {
			return (
				<div className="container">
					<div className="row justify-content-end m-3 ">
						<div className="btn-group btn-group-toggle" data-toggle="buttons">
							<button
								className="btn btn-primary active"
								onClick={() => this.handleLayout("list")}
							>
								list
							</button>
							<label
								className="btn btn-primary"
								onClick={() => this.handleLayout("grid")}
							>
								grid
							</label>
						</div>
					</div>
					{this.renderComponent(product)}
				</div>
			)
		}
	}
}

export default Product
