import React from 'react';
export default class LineItems extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			amountFromLineItem: 0.0,
			description: ""
		}
	}
	render() {
		return (
			<div>
				<input type="text" name="desc" onChange={this.onDescChange.bind(this)}/>
				<input type="text" name="amount" onChange={this.onAmountChange.bind(this)}/>
			</div>
			);
	}

	onAmountChange(event){
		let amt = event.target.value;
		let desc = this.state.description;
		this.setState({
				amountFromLineItem: amt
		});
		if(this.props.amountChangeListener) {
				this.props.amountChangeListener(this.props.id, desc, amt);
		}
	}

	onDescChange(event){
		let desc = event.target.value;
		let amt = this.state.amountFromLineItem;
		this.setState({
				description: desc
		});
		if(this.props.amountChangeListener) {
				this.props.amountChangeListener(this.props.id, desc, amt);
		}
	}
}
