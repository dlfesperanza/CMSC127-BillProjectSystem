import React, { Component } from 'react';
import autobind from 'react-autobind';

class BillAdd extends Component{
	constructor(props) {
	    super(props);
	    autobind(this)
	    this.state={
		    billno:'',
		    title:'',
		    body:'',
		    billtype:'',
		    scope:'',
		    status:'',
		    reading:'',
		    datefiled:'',
		    prompt: '',
		    empid: '',
		    legnos: []
	    };
  	}

  	handleBillNoChange(e){
  		this.setState({
  			billno: e.target.value
  		});
  	}

  	handleTitleChange(e){
  		this.setState({
  			title: e.target.value,
  			newtitle: e.target.value
  		});
  	}

  	handleBodyChange(e){
  		this.setState({
  			body: e.target.value
  		});
  	}

  	handleBillTypeChange(e){
  		this.setState({
  			billtype: e.target.value
  		});
  	}

  	handleScopeChange(e){
  		this.setState({
  			scope: e.target.value
  		});
  	}

  	handleStatusChange(e){
  		this.setState({
  			status: e.target.value
  		});
  	}

  	handleReadingChange(e){
  		this.setState({
  			reading: e.target.value
  		});
  	}

  	handleDateChange(e){
  		this.setState({
  			datefiled: e.target.value
  		});
  	}

  	handleEmpidChange(e){
  		this.setState({
  			empid: e.target.value
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

  	handleSubmit(e){
    	fetch(`http://www.localhost:3001/addBills`,{
	      method:'POST',
	      headers:{
	        "Content-Type":"application/json"
	      },
	      body:JSON.stringify(this.state)
	    })
	    .then(function (data){
	      	console.log('Request success',data);
	      	this.setState({
				prompt: 'Successfully added!'
			})
	    })
	    .catch(function(error){
	      console.log('Request failure: ',error);
	    });

	    

	    console.log(this.state);
	    this.forceUpdate();
  	}


	render(){
		return(
			<div className="App">
				<div className="Bill">
				<h4>Add Bill</h4>
				<form>
					<input onChange={this.handleBillNoChange} className="inputField" placeholder="Bill No." maxlength="4"/>
					<input onChange={this.handleTitleChange} className="inputField" placeholder="Title"/>
					<input onChange={this.handleBodyChange} className="inputField" placeholder="Body"/>
					<select className="dropdown" id="dd1" onChange={this.handleBillTypeChange}>
						<option selected disabled> Bill Type </option>
						<option value="Senate Bill"> Senate Bill </option>
						<option value="House Bill"> House Bill </option>
					</select>
					<input onChange={this.handleScopeChange} className="inputField"  placeholder="Scope"/>
					<select className="dropdown" id="dd1" onChange={this.handleStatusChange}>
						<option selected disabled> Status </option>
						<option value="Pending"> Pending </option>
						<option value="Passed"> Passed </option>
					</select>
					<select className="dropdown" id="dd1" onChange={this.handleReadingChange}>
						<option selected disabled> Reading </option>
						<option value="1st"> 1st </option>
						<option value="2nd"> 2nd </option>
						<option value="3rd"> 3rd </option>
					</select>
					<input onChange={this.handleDateChange} className="inputField" type="date" placeholder="Date Filed"/>
					<select className="dropdown" id="dd1" onChange={this.handleEmpidChange}>
						<option selected disabled> Legislator </option>
						{this.state.legnos.map((lno, i) => {
							if (this.state.billtype === "Senate Bill"){
								if (lno.type === "SENATOR"){
									return(
										<option key={i++} value={lno.empid}> {lno.lname} </option>
									)	
								}
							}else if (this.state.billtype === "House Bill"){
								if (lno.type === "HOUSEMEMBER"){
									return(
										<option key={i++} value={lno.empid}> {lno.lname} </option>
									)	
								}
							}
						})
							
						}
					</select>
					<input onClick={this.handleSubmit} className="submit" type="button" value="Submit" />
					<a href="/bill/edit" className="back">Back</a>
					<p className="prompt">{this.state.prompt}</p>
				</form>
				</div>
		    </div>
		);
	}
}

export default BillAdd;
