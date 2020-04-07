import React, { Component } from "react"

class ProductDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			isLoaded: false,
			product: [],
			count: 1,
		}
	}
	async componentDidMount() {
		await fetch(
			`https://cc-mock-api.herokuapp.com/product/${this.props.match.params.id}`
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.setState({ isLoaded: true, product: result })
				},
				(error) => {
					this.setState({ isLoaded: false, error })
				}
			)
	}

	handleMinus = () => {
		const { count } = this.state
		this.setState({
			count: count - 1,
		})
	}

	handlePlus = (price) => {
		const { count } = this.state
		this.setState({
			count: count + 1,
		})
	}

	render() {
		const { error, isLoaded, product, count } = this.state
		if (error) {
			return <div>Error: {error.message}</div>
		} else if (!isLoaded) {
			return <div>Loading...</div>
		} else {
			return (
				<div className="container">
					<div className="row mt-4">
						<div className="col-sm-12 col-md-12 col-lg-4">
							<img
								src={product.image_url}
								alt="brand"
								width="80%"
								style={{ border: "1px solid #f6f6f6", borderRadius: "5px" }}
							/>
						</div>
						<div className="col-sm-12 col-md-12 col-lg-8">
							<h3>{product.name}</h3>
							<p>{product.description}</p>
							<p className="price">B{parseFloat(product.price)}</p>
							<div
								className="btn-group mb-3"
								role="group"
								aria-label="Basic example"
							>
								<button
									type="button"
									className="btn btn-secondary"
									onClick={this.handleMinus}
								>
									-
								</button>
								<button type="button" className="btn btn-secondary">
									{count < 1 ? 1 : count > 0 ? count : count}
								</button>
								<button
									type="button"
									className="btn btn-secondary"
									onClick={this.handlePlus}
								>
									+
								</button>
							</div>
							<br />
							<button className="btn btn-primary">Add to Cart</button>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default ProductDetail
