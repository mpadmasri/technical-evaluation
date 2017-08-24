import React from 'react';
export default class Invoice extends React.Component {
	render() {
		return (
			<div>
					<div className="block">
						<label className="elementsStyle">
						    Name
						</label>
						    <input type="text" name="name" className="inputFields" />
					</div>
					<div className="block">
						<label className="elementsStyle">
						    Email
						</label>
						    <input type="email" name="email" className="inputFields" />
					</div>
					<div className="block">
						<label className="elementsStyle">
						    DueDate
						</label>
						    <input type="date" name="date" className="inputFields" />
					</div>
					<div className="block">
						<label className="elementsStyle1">
						    Description
								Amount
						</label>
					</div>
			</div>
			);
	}
}
