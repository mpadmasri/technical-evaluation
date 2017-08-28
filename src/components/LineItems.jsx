/**
 * This class represents LineItems component
 * It also includes methods to handle changes to the description and Amount elements.
*/
import React from 'react';

class LineItems extends React.Component {
			/**
			*  @param {object} props - LineItems props.
			*  This method initializes and also sets the default state.
			*/
			constructor(props) {
					super(props);
					this.props = props;
					this.state = {
						amountFromLineItem: 0.0,
						description: ""
					};
					this._bind("onDescChange","onAmountChange");
			}

			/**
			*  @param {array} methods - all method names to bind/evaluate to the current execution context.
			*  All the methods as an array that should execute in the current context are set through constructor
			*/
			_bind(...methods) {
					methods.forEach(method => this[method] = this[method].bind(this));
			}

			/**
			*  @param {event} - When ever there is a change/update to the amount in the
			*		line items below method would be called to set the new state and notify the parent component about the changes.
			*/
			onAmountChange(event){
					let amt = event.target.value;
					let desc = this.state.description;
					this.setState({
							amountFromLineItem: amt
					});
					this.props.changeListener(this.props.id, desc, amt);
			}

			/**
			*  @param {event} - When ever there is a change/update to the Description in the
			*		line items below method would be called to set the new state and notify the parent component about the changes.
			*/
			onDescChange(event){
					let desc = event.target.value;
					let amt = this.state.amountFromLineItem;
					this.setState({
							description: desc
					});
					this.props.changeListener(this.props.id, desc, amt);
				}
				/**
			  *  @returns {Component} LineItems
				*/
				render() {
							return (
									<div className="form-group row pullAmountField">
										<div className="col-sm-5">
												 <input className="form-control" type="text" name="desc" onChange={this.onDescChange}/>
										</div>
										<div className="col-sm-2">
												<input className="form-control" type="text" name="amount" onChange={this.onAmountChange}/>
										</div>
									</div>
								);
					}
		}

		export default LineItems;
