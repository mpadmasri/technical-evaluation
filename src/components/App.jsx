/**
 * This class represents App component which composes of invoice elements.
 * It also includes methods to handle changes to the state.
*/
import React from 'react';
import LineItems from './LineItems.jsx';
import Notifications, {notify} from 'react-notify-toast';

class App extends React.Component {
		/**
		*  @param {object} props - App props.
		*  This method initializes and also sets the default state.
		*  Pass its props to the super class
		*/
		constructor (props) {
					super(props);
					this.state = {
						lineItems: 1,
						amountTotal: 0,
						lineItemsArray: [{id: 0, desc:"", amount: 0}],
						name: "",
						email: "",
						date: "",
					};
					this._bind("addLineItem","onNameChange","onEmailChange","saveData","onDateChange","lineItemChangeListener","ref");
		}

		/**
		* Below method is used for incrementing the count of line items
		* and rerenders the DOM.
		*/
		addLineItem(){
				this.setState({
					lineItems: this.state.lineItems + 1
				});
				this.state.lineItemsArray.push({id: this.state.lineItems, desc: "", amount: 0});
		}

		/**
		*  @param {event}
		*  Below method is used for handling the name that is provided by the user. The new state for the name is set.
		*/
		onNameChange(event){
				this.setState({
						name: event.target.value
				});
		}

		/**
		*  @param {event}
		*  Below method is used for handling the email that is provided by the user. The new state for the email is set.
		*/
		onEmailChange(event){
				this.setState({
						email: event.target.value
				});
		}

		/**
		*  @param {event}
		*  Below method is used for handling the date that is provided by the user. The new state for the date is set.
		*/
		onDateChange(event){
				this.setState({
						date: event.target.value
				});
		}

		/**
		*  Below method is used for saving the data in the browser local storage.
		*/
		saveData(){
				localStorage.clear();
				let postData = {
									  invoice: {
									      customers: [
									        {
									          name: this.state.name,
									          email: this.state.email,
														data: this.state.date,
														lineItems: this.state.lineItemsArray
									        }
									      ]
									   }
									};
				localStorage.setItem('myData', JSON.stringify(postData));
				notify.show("Invoice successfully saved/sent", "success", 2000,"#0E1717");
				window.setTimeout(function(){location.reload()},1000)
		}

		/**
		*  @param {array} methods - all method names to bind/evaluate to the current execution context.
		*  All the methods as an array that should execute in the current context are set through constructor
		*/
    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }

		/**
		*  @param {id, description, amount} - When ever there is a change/update to the
		*		line items below listener method would be called to recaluclate the amount and display the updated total on the UI.
		*/
		lineItemChangeListener(id, desc, amt) {
				let totalAmount = 0;
		        let itemsArray = this.state.lineItemsArray;
		         itemsArray.forEach(function(amountObj) {
		            if(id === amountObj.id) {
		                if(amt === "") {
		                    amt = 0;
		                }
		                amountObj.amount = amt;
		                amountObj.desc = desc;
		            }
		            totalAmount += parseFloat(amountObj.amount);
		        });
		        this.setState({
		                amountTotal: totalAmount,
		                lineItemsArray: itemsArray
		            });
		}

		/**
	  *  @returns {Component} App
		*/
		render() {
				let lineItemsUI =[];
				for (var i = 0; i < this.state.lineItems; i +=1) {
					lineItemsUI.push(<LineItems lineItemChangeListener={this.lineItemChangeListener.bind(this)} id={i}/>);
				}
				return (
					<div>
							<br />
						<div className="container well">
							<div className="form-group">
									<h3 className="headerTextStyle">Invoice</h3>
							</div>
							<div className="form-group">
									<br />
							</div>
							<div>
								<div className="form-group row">
									<div className="col-md-2">
										<label className="textStyle"> Name </label>
									</div>
									<div className="col-md-3">
										<input type="name" className="form-control" value={this.state.name} onChange={this.onNameChange} name="name"  />
									</div>
								</div>
								<div className="form-group row">
									<div className="col-md-2">
										<label className="textStyle">
										    Email
										</label>
									</div>
									<div className="col-md-3">
										<input type="email" className="form-control" value={this.state.email} onChange={this.onEmailChange} name="email"  />
									</div>
								</div>
								<div className="form-group row">
									<div className="col-md-2">
										<label className="textStyle">
										    Due Date
										</label>
									</div>
									<div className="col-md-3" id="datetimepicker1">
										<input className="form-control" type="text" value={this.state.date} onChange={this.onDateChange} name="date" />
									</div>

								</div>
							<div className="form-group">
								<div className="row">
				  				<div className="col-md-5">
										<label className="textStyle">
												  Description
										</label>
								 	</div>
				  				<div className="col-md-2">
										<label className="textStyle">
													Amount
										</label>
									</div>
								</div>
							</div>
								<div className="form-group">
										{lineItemsUI}
								</div>
								<div className="form-group">
										<img src="/src/assets/Add.png" width="42" height="42" className="img-rounded" onClick={this.addLineItem} />
								</div>
								<div className="row">
									<div className="col-sm-1 col-sm-offset-5">
											<label className="readLabelsTextStyle">
												TOTAL
											</label>
									</div>
									<div className="col-sm-1">
											<label className="readLabelsTextStyle">${this.state.amountTotal.toFixed(2)}</label>
									</div>
								</div>
							<div>
								<div className="row col-sm-2 col-sm-offset-5">
										<button type="button" className="button col-sm-2 col-sm-offset-5" onClick={this.saveData}>SEND</button>
								</div>
										<div>
												<Notifications />
										</div>
							</div>
							</div>
						</div>
					</div>
				);
			}
		}

export default App;
