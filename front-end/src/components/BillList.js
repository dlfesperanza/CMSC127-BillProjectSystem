import React, { Component } from 'react';
import autobind from 'react-autobind';

class BillList extends Component{
	constructor(){
    super();
    autobind(this);
    this.state = {
	      bills: []
	    }
	}

  	componentDidMount = () => {
		fetch(`http://localhost:3001/bills`)
		.then((response) => { return response.json()})
		.then((result) => {
			console.log(result);
			this.setState({ bills: result });
		})
		.catch((e) => { console.log(e); });

    
    console.log(this.state.bills);
    this.forceUpdate();
  	}

	render(){
		return(
			<div className="App">
				<div className="Bill">
				<h4>Bills</h4>
				{
					this.state.bills.map((bill, i) => {
						return(
							<table key={i++}>
								<th>Category</th>
								<th>Information</th>
								<tr><td className="tableCat">Bill ID</td><td>{bill.billno}</td></tr>
								<tr><td className="tableCat">Title</td><td>{bill.title}</td></tr>
								<tr><td className="tableCat">Body</td><td>{bill.body}</td></tr>
								<tr><td className="tableCat">Scope</td><td>{bill.scope}</td></tr>
								<tr><td className="tableCat">Type</td><td>{bill.billtype}</td></tr>
								<tr><td className="tableCat">Status</td><td >{bill.status}</td></tr>
								<tr><td className="tableCat">Reading</td><td>{bill.reading}</td></tr>
								<tr><td className="tableCat">Date Filed</td><td>{bill.datefiled}</td></tr>
							</table>
						)	
						
					})
				}
				<a href="/bill" className="back">Back</a>
				</div>
		    </div>
		);
	}
}

export default BillList;
