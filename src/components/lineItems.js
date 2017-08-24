import React from 'react';
export default class LineItems extends React.Component {

	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			amountFromLineItem: 0
		}
	}
	render() {
		return (
			<div>
				<input type="text" name="desc" />
				<input type="text" name="amount"  onChange={this.onChange.bind(this)}/>
			</div>
			);
	}

	onChange(event){
		let amt = event.target.value;
		this.setState({
				amountFromLineItem: amt
		});
		if(this.props.amountChangeListener) {
				this.props.amountChangeListener(amt, this.props.id);
		}
	}
}

