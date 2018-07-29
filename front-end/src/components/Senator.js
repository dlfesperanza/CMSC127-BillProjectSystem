import React, { Component } from 'react';
import autobind from 'react-autobind';

const showHeader = (billtype) => {
	if (billtype === "Senate Bill"){
		return <h4>Senate Bill</h4>
	}else if (billtype === "House Bill"){
		return <h4>House Bill</h4>
	}
}

class BillView extends Component{
	constructor(props){
		super(props);
		autobind(this);
		 this.state={
		    billtype:'',
		    bills: [],
		    flag: 0
	    };
	}

	handleBillTypeChange(e){
  		this.setState({
  			billtype: e.target.value
  		});
  	}

  	handleSubmit(e){
    	fetch(`http://localhost:3001/viewBillByBillType?billtype=${this.state.billtype}`)
	    .then((response) => { return response.json()})
		.then((result) => {
			this.setState({ bills: result, flag: 1 });
		})
		.catch((e) => { console.log(e); });
	    this.forceUpdate();
  	}

	render(){
		if (this.state.flag === 0){
			return(
				<div className='App'>
					<div className='Bill'>
						 <h4>View Bill</h4>
						<select className="dropdown" id="dd1" onChange={this.handleBillTypeChange}>
							<option selected disabled> Bill Type </option>
							<option value="Senate Bill"> Senate Bill </option>
							<option value="House Bill"> House Bill </option>
						</select>
						<input onClick={this.handleSubmit} className="submit" type="button" value="Submit" />
						<a href="/bill/view" className="back">Back</a>
					</div>
				</div>
			);
		}else if (this.state.flag === 1){
			return(
				<div className='App'>
					<div className='Bill'>
						{showHeader(this.state.billtype)}
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
						<a href="/bill/view" className="back">Back</a>
					</div>
				</div>
			);
		}
		
	}
}

export default BillView;
