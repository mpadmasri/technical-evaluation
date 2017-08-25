/**
 * This class represents App component which composes of
 invoice elements.
 It also includes methods to handle changes.
 */
import React from 'react';
import LineItems from './lineItems';

export default class App extends React.Component {
	/**
	*  @param {object} props - App props.
	*  This method initializes and also sets the default state.
	*/
	constructor (props) {
		super(props);
		this.state = {
			lineItems: 1,
			amountTotal: 0.0,
			lineItemsArray: [{id: 0, desc:"", amount: 0.0}],
			name: "",
			email: "",
			date: ""
};
		this._bind("onNameChange","onEmailChange","postData","onDateChange","amountChangeListener");
		}
	/**
	*  This method is used for adding a line item.
	*/
	addLineItem(){
		this.setState({
			lineItems: this.state.lineItems + 1
		});
		this.state.lineItemsArray.push({id: this.state.lineItems, desc: "", amount: 0.0});
	}

	onNameChange(event){
		this.setState({
				name: event.target.value
		});
	}

	onEmailChange(event){
		this.setState({
				email: event.target.value
		});
	}

	onDateChange(event){
		this.setState({
				date: event.target.value
		});
	}

	postData(){
		console.log(this.state.name);
		console.log(this.state.email);
		console.log(this.state.date);
		console.log(this.state.lineItemsArray);
	}

		/**
		*  @param {array} methods - all method names to bind.
		*/
    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }


	amountChangeListener(id, desc, amt) {
		let totalAmount = 0.0;
        let amountArray = this.state.lineItemsArray;

        amountArray.forEach(function(amountObj) {
            if(id === amountObj.id) {
                if(amt === "") {
                    amt = 0.0;
                }
                amountObj.amount = amt;
                amountObj.desc = desc;
            }
            totalAmount += parseFloat(amountObj.amount);
        });
        this.setState({
                amountTotal: totalAmount,
                lineItemsArray: amountArray
            });
	}

	/**
	*
  *  @returns {Component} App
	*/
	render() {
		let lineItemsUI =[];
		for (var i = 0; i < this.state.lineItems; i +=1) {
			lineItemsUI.push(<LineItems amountChangeListener={this.amountChangeListener.bind(this)} id={i}/>);
		}
		return (
			<div className="container">
				<div>
						<h3>Evaluation Exercise</h3>
				</div>
				<div className="col-xs-6 col-md-3">
					<div>
						<label>
						    Name
						</label>
						    <input type="name" value={this.state.name} onChange={this.onNameChange} name="name"  />
					</div>
					<div>
						<label>
						    Email
						</label>
						    <input type="email" value={this.state.email} onChange={this.onEmailChange} name="email"  />
					</div>
					<div>
						<label>
						    DueDate
						</label>
						    <input type="date" value={this.state.date} onChange={this.onDateChange} name="date" />
					</div>
				<div>
					<br />
				</div>
				<div>
					<label>
							  Description
								Amount
					</label>
					</div>
					<div>
						{lineItemsUI}
					</div>
					<div>
							<img src="/src/assets/Add.png" width="42" height="42" className="img-rounded" onClick={this.addLineItem.bind(this)} />

					</div>
					<div>
							<label>
								Total
							</label>
							<label>${this.state.amountTotal}</label>
					</div>
					<div>
							<button type="button" className="btn btn-primary" onClick={this.postData}>SEND</button>
					</div>
				</div>
			</div>
		);
	}
}
