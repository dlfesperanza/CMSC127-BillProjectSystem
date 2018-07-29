import React, { Component } from 'react';
import autobind from 'react-autobind';

class BillEdit extends Component{
	constructor(props) {
	    super(props);
	    autobind(this)
	    this.state={
		    billno:'',
		    prompt: '',
		    bills: [],
		    billnos: [],
		    category: '',
		    flag: 0,
		    value: ''
	    };
  	}

  	handleBillNoChange(e){
  		this.setState({
  			billno: e.target.value
  		});
  	}

  	handleValueChange(e){
  		this.setState({
  			value: e.target.value
  		});
  	}

  	handleCategoryChange(e){
  		this.setState({
  			category: e.target.value
  		});
  		console.log(this.state.category);
  	}
  	
  	componentDidMount = () => {
		fetch(`http://localhost:3001/bills`)
		.then((response) => { return response.json()})
		.then((result) => {
			console.log(result);
			this.setState({ billnos: result });
		})
		.catch((e) => { console.log(e); });
	    
	    this.forceUpdate();
  	}

  	handleSubmitBillNo(e){
    	fetch(`http://www.localhost:3001/viewBillByBillno?billno=${this.state.billno}`,{
	    })
		.then((response) => { return response.json()})
		.then((result) => {
			this.setState({ 
				bills: result,
				flag: 1
			});
		})
		.catch((e) => { console.log(e); });
	    this.forceUpdate();
  	}

  	handleSubmitEdit(e){
    	fetch(`http://www.localhost:3001/editBill?category=${this.state.category}&value=${this.state.value}`,{
	      method:'POST',
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify(this.state)
	    })
	    .then(function (data){
	      	console.log('Request success',data);
	      	this.setState({ 
				prompt: 'Successfully edited!',
				flag: 1
			});
	    })
	    .catch(function(error){
	      console.log('Request failure: ',error);
	    });

	    console.log(this.state);
	    this.forceUpdate();
  	}

  	

	render(){
		if (this.state.flag === 0){
			return(
				<div className="App">
					<div className="Bill">
						<h4>Bill Edit</h4>
						<select className="dropdown" id="dd1" onChange={this.handleBillNoChange}>
							<option selected disabled> Bill No. </option>
							{this.state.billnos.map((billnum, i) => {
								return(
										<option key={i++} value={billnum.billno}> {billnum.billno} </option>
									)	
								})
							}
						</select>

						<select className="dropdown" id="dd1" onChange={this.handleCategoryChange}>
								<option selected disabled> Category </option>
								<option value="title"> Title </option>
								<option value="body"> Body </option>
								<option value="billtype"> Bill Type </option>
								<option value="scope"> Scope </option>
								<option value="status"> Status </option>
								<option value="reading"> Reading </option>
								<option value="datefiled"> Date Filed </option>
								<option value="legislator"> Legislator </option>
							</select>
						<input onClick={this.handleSubmitBillNo} className="submit" type="button" value="Submit" />
						<a href="/bill/edit" className="back">Back</a>
					</div>	
			    </div>
			)
		}else{
			if (this.state.category === "title"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.bills.map((bill, i) => {
								return(
									<div key={i++}>
										<h4>Edit Title</h4>
										<input onChange={this.handleValueChange} className="inputField" placeholder={bill.title}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/bill/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "body"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.bills.map((bill, i) => {
								return(
									<div key={i++}>
										<h4>Edit Body</h4>
										<input onChange={this.handleValueChange} className="inputField" placeholder={bill.body}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/bill/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "billtype"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.bills.map((bill, i) => {
								return(
									<div key={i++}>
										<h4>Edit Bill Type</h4>
										<select className="dropdown" id="dd1" onChange={this.handleValueChange}>
											<option selected disabled> Bill Type </option>
											<option value="Senate Bill"> Senate Bill </option>
											<option value="House Bill"> House Bill </option>
										</select>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/bill/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "scope"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.bills.map((bill, i) => {
								return(
									<div key={i++}>
										<h4>Edit Scope</h4>
										<input onChange={this.handleValueChange} className="inputField" placeholder={bill.scope}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/bill/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "status"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.bills.map((bill, i) => {
								return(
									<div key={i++}>
										<h4>Edit Status</h4>
										<select className="dropdown" id="dd1" onChange={this.handleValueChange}>
											<option selected disabled> Status </option>
											<option value="Pending"> Pending </option>
											<option value="Passed"> Passed </option>
										</select>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/bill/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "reading"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.bills.map((bill, i) => {
								return(
									<div key={i++}>
										<h4>Edit Reading</h4>
										<select className="dropdown" id="dd1" onChange={this.handleValueChange}>
											<option selected disabled> Reading </option>
											<option value="1st"> 1st </option>
											<option value="2nd"> 2nd </option>
											<option value="3rd"> 3rd </option>
										</select>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/bill/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "datefiled"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.bills.map((bill, i) => {
								return(
									<div key={i++}>
										<h4>Edit Date Filed</h4>
										<input onChange={this.handleValueChange} className="inputField" type="date" placeholder={bill.datefiled}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/bill/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}
		}
		
	}
}

export default BillEdit;
