import React from 'react';
import Invoice from './invoice';
import Send from './send';
import LineItems from './lineItems';

export default class App extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			lineItems: 1,
			amountTotal: 0,
			lineItemsArray: [{id: 0, amount: 0}]
		};
	}
	render() {
		let lineItemsUI =[];
		for(var i = 0; i < this.state.lineItems; i +=1){
			lineItemsUI.push(<LineItems amountChangeListener={this.amountChangeListener.bind(this)} id={i}/>);
		};
		return (
			<div>
				<div>
						<h1>Evaluation Exercise</h1>
				</div>
				<div className = "mainDiv">
					<div className = "elementsStyle">
							<Invoice />
					</div>
					<div>
						{lineItemsUI}
					</div>
					<div>
							<img src="/src/assets/Add.png" width="42" height="42" onClick={this.addLineItem.bind(this)} />

					</div>
					<div>
							<label>
								Total
								${this.state.amountTotal}
							</label>
					</div>
					<div>
							<Send />
					</div>
				</div>
			</div>
		);
	}

	addLineItem(){
		this.setState({
			lineItems: this.state.lineItems + 1
		});
		this.state.lineItemsArray.push({id: this.state.lineItems, amount: 0});
	}

	amountChangeListener(amt, id) {
		let totalAmount = 0;
        let amountArray = this.state.lineItemsArray;

        amountArray.forEach(function(amountObj) {
            if(id === amountObj.id) {
                if(amt === "") {
                    amt = 0;
                }
                amountObj.amount = amt;
            }
            totalAmount += parseInt(amountObj.amount);
        });
        this.setState({
                amountTotal: totalAmount,
                lineItemsArray: amountArray
            });

	}
}
