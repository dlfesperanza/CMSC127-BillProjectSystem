import React, { Component } from 'react';
import autobind from 'react-autobind';

class BillSearch extends Component{
	constructor(){
    super();
    autobind(this);
    this.state = {
	      bills: [],
	      category: '',
	      billno: '',
	      type: '',
	      legislator: '',
	      house: '',
	      datefiled: '',
	      reading: '',
	      prompt: '',
	      legnos: [],
	      empid: ''
	    }
	}

	handleCategoryChange(e){
  		this.setState({
  			category: e.target.value
  		});
  	}

  	handleBillNoChange(e){
  		this.setState({
  			billno: e.target.value
  		});
  	}

  	handleEmpidChange(e){
  		this.setState({
  			empid: e.target.value
  		});
  	}

  	handleReadingChange(e){
  		this.setState({
  			reading: e.target.value
  		});
  	}

  	handleBillTypeChange(e){
  		this.setState({
  			type: e.target.value
  		});
  	}

  	handleDateChange(e){
  		this.setState({
  			datefiled: e.target.value
  		});
  	}

  	componentDidMount = () => {
		fetch(`http://localhost:3001/legislators`)
		.then((response) => { return response.json()})
		.then((result) => {
			console.log(result);
			this.setState({ legnos: result });
		})
		.catch((e) => { console.log(e); });
	    
	    this.forceUpdate();
  	}

  	handleSubmitBillNo(e){
    	fetch(`http://www.localhost:3001/viewBillByBillno?billno=${this.state.billno}`,{
	    })
		.then((response) => { return response.json()})
		.then((result) => {
			this.setState({ bills: result });
			if ((this.state.bills).length === 0){
				this.setState({
			        prompt: 'Record not existing!'
			      })
			}
		})
		.catch((e) => { console.log(e); });
	    this.forceUpdate();
  	}

  	handleSubmitReading(e){
    	fetch(`http://www.localhost:3001/viewBillByReading?reading=${this.state.reading}&type=${this.state.type}`,{
	    })
		.then((response) => { return response.json()})
		.then((result) => {
			this.setState({ bills: result });
			if ((this.state.bills).length === 0){
				this.setState({
			        prompt: 'Record not existing!'
			      })
			}
		})
		.catch((e) => { console.log(e); });
	    this.forceUpdate();
  	}

  	handleSubmitDate(e){
    	fetch(`http://www.localhost:3001/viewBillByYear?year=${this.state.datefiled}&type=${this.state.type}`,{
	    })
		.then((response) => { return response.json()})
		.then((result) => {
			this.setState({ bills: result });
			if ((this.state.bills).length === 0){
				this.setState({
			        prompt: 'Record not existing!'
			      })
			}
		})
		.catch((e) => { console.log(e); });
	    this.forceUpdate();
  	}

  	handleSubmitLegislator(e){
    	fetch(`http://www.localhost:3001/viewBillsByLegislator?empid=${this.state.empid}`,{
	    })
		.then((response) => { return response.json()})
		.then((result) => {
			this.setState({ bills: result });
			if ((this.state.bills).length === 0){
				this.setState({
			        prompt: 'Record not existing!'
			      })
			}
		})
		.catch((e) => { console.log(e); });
	    this.forceUpdate();
  	}

	render(){
		if (this.state.category === ''){
			return(
				<div className="App">
					<div className="Bill">
						<h4>Search Bill</h4>
						<select className="dropdown" id="dd1" onChange={this.handleCategoryChange}>
							<option selected disabled> Category </option>
							<option value="BillNo"> Bill No. </option>
							<option value="Reading"> Reading </option>
							<option value="Date"> Year</option>
							<option value="Legislator"> Legislator </option>
						</select>

						
					</div>	
			    </div>
			)
		}else if (this.state.category === 'BillNo'){
			return(
				<div className="Bill">
					<h4>Search</h4>
					<input onChange={this.handleBillNoChange} className="inputField" placeholder="Bill No."/>
					<input onClick={this.handleSubmitBillNo} className="submit" type="button" value="Submit" />
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
									<tr><td className="tableCat">Reading</td><td>{bill.reading}</td></tr>
									<tr><td className="tableCat">Date Filed</td><td>{bill.datefiled}</td></tr>
								</table>
								)	
								
							})
						}
						<p className="prompt">{this.state.prompt}</p>
					<a href="/bill/search" className="back">Back</a>
				</div>
			);
		}else if (this.state.category === 'Reading'){
			return(
				<div className="Bill">
					<h4>Search</h4>
					<select className="dropdown" id="dd1" onChange={this.handleReadingChange}>
						<option selected disabled> Reading </option>
						<option value="1st"> 1st </option>
						<option value="2nd"> 2nd </option>
						<option value="3rd"> 3rd </option>
					</select>
					<select className="dropdown" id="dd1" onChange={this.handleBillTypeChange}>
						<option selected disabled> Bill Type </option>
						<option value="Senate Bill"> Senate Bill </option>
						<option value="House Bill"> House Bill </option>
					</select>
					<input onClick={this.handleSubmitReading} className="submit" type="button" value="Submit" />
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
						<p className="prompt">{this.state.prompt}</p>
					<a href="/bill/search" className="back">Back</a>
				</div>
			);
		}else if (this.state.category === 'Date'){
			return(
				<div className="Bill">
					<h4>Search</h4>
					<input onChange={this.handleDateChange} className="inputField" placeholder="Year" maxlength="4"/>
					<select className="dropdown" id="dd1" onChange={this.handleBillTypeChange}>
						<option selected disabled> Bill Type </option>
						<option value="Senate Bill"> Senate Bill </option>
						<option value="House Bill"> House Bill </option>
					</select>
					<input onClick={this.handleSubmitDate} className="submit" type="button" value="Submit" />
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
						<p className="prompt">{this.state.prompt}</p>
					<a href="/bill/search" className="back">Back</a>
				</div>
			);
		}else if (this.state.category === 'Legislator'){
			return(
				<div className="Bill">
					<h4>Search</h4>
					<select className="dropdown" id="dd1" onChange={this.handleBillTypeChange}>
						<option selected disabled> Bill Type </option>
						<option value="Senate Bill"> Senate Bill </option>
						<option value="House Bill"> House Bill </option>
					</select>
					<select className="dropdown" id="dd1" onChange={this.handleEmpidChange}>
						<option selected disabled> Legislator </option>
						{this.state.legnos.map((lno, i) => {
							if (this.state.type === "Senate Bill"){
								if (lno.type === "SENATOR"){
									return(
										<option key={i++} value={lno.empid}> {lno.lname} </option>
									)	
								}
							}else if (this.state.type === "House Bill"){
								if (lno.type === "HOUSEMEMBER"){
									return(
										<option key={i++} value={lno.empid}> {lno.lname} </option>
									)	
								}
							}
						})
							
						}
					</select>
					<input onClick={this.handleSubmitLegislator} className="submit" type="button" value="Submit" />
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
						<p className="prompt">{this.state.prompt}</p>
					<a href="/bill/search" className="back">Back</a>
				</div>
			);
		}
	}

}

export default BillSearch;
