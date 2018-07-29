import React, { Component } from 'react';
import autobind from 'react-autobind';

class LegislatorEdit extends Component{
	constructor(props) {
	    super(props);
	    autobind(this)
	    this.state={
		    empid:'',
		    prompt: '',
		    legislators: [],
		    legnos: [],
		    category: '',
		    flag: 0,
		    value: '',
		    prompt: ''
	    };
  	}

  	handleEmpidChange(e){
  		this.setState({
  			empid: e.target.value
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
		fetch(`http://localhost:3001/legislators`)
		.then((response) => { return response.json()})
		.then((result) => {
			console.log(result);
			this.setState({ legnos: result });
		})
		.catch((e) => { console.log(e); });
	    
	    this.forceUpdate();
  	}

  	handleSubmitEmpID(e){
    	fetch(`http://www.localhost:3001/viewLegByID?empid=${this.state.empid}`,{
	    })
		.then((response) => { return response.json()})
		.then((result) => {
			this.setState({ 
				legislators: result,
				flag: 1
			});
		})
		.catch((e) => { console.log(e); });
		console.log(this.state.legislators);
	    this.forceUpdate();
  	}

  	handleSubmitEdit(e){
    	fetch(`http://www.localhost:3001/editLegislator?category=${this.state.category}&value=${this.state.value}&empid=${this.state.empid}`,{
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
						<h4>Edit Legislator</h4>
						<select className="dropdown" id="dd1" onChange={this.handleEmpidChange}>
							<option selected disabled> Employee ID </option>
							{this.state.legnos.map((lno, i) => {
								return(
										<option key={i++} value={lno.empid}> {lno.empid} </option>
									)	
								})
							}
						</select>

						<select className="dropdown" id="dd1" onChange={this.handleCategoryChange}>
								<option selected disabled> Category </option>
								<option value="fname"> First Name </option>
								<option value="mname"> Middle Name </option>
								<option value="lname"> Last Name </option>
								<option value="bday"> Birthday </option>
								<option value="sex"> Sex </option>
								<option value="type"> Type </option>
								<option value="sal"> Salary </option>
								<option value="noofterms"> No. of Terms </option>
								<option value="termstart"> Date Term Started </option>
							</select>
						<input onClick={this.handleSubmitEmpID} className="submit" type="button" value="Submit" />
						<a href="/legislator/edit" className="back">Back</a>
					</div>	
			    </div>
			)
		}else{
			if (this.state.category === "fname"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.legislators.map((legislator, i) => {
								return(
									<div key={i++}>
										<h4>Edit First Name</h4>
										<input onChange={this.handleValueChange} className="inputField" placeholder={legislator.fname}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/legislator/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "mname"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.legislators.map((legislator, i) => {
								return(
									<div key={i++}>
										<h4>Edit Middle Name</h4>
										<input onChange={this.handleValueChange} className="inputField" placeholder={legislator.mname}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/legislator/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "lname"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.legislators.map((legislator, i) => {
								return(
									<div key={i++}>
										<h4>Edit Last Name</h4>
										<input onChange={this.handleValueChange} className="inputField" placeholder={legislator.lname}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/legislator/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "bday"){
				return(
					<div className="App">
						<div className="Bill">
							<h4>Edit Birthday</h4>
							<input
				            type="date" className="inputField"  placeholder="Birthday" onChange={this.handleValueChange} />
							<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
							<a href="/legislator/edit" className="back">Back</a>
							<p className="prompt">{this.state.prompt}</p>
						</div>	
				    </div>
				)
			}else if (this.state.category === "sex"){
				return(
					<div className="App">
						<div className="Bill">
							
							<h4>Edit Sex</h4>
							<select className="dropdown" id="dd1" onChange={this.handleValueChange}>
					            <option selected disabled> Sex </option>
					            <option value="M"> Male </option>
					            <option value="F"> Female </option>
					          </select>
							<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
							<a href="/legislator/edit" className="back">Back</a>
							<p className="prompt">{this.state.prompt}</p>
									
						</div>	
				    </div>
				)
			}else if (this.state.category === "type"){
				return(
					<div className="App">
						<div className="Bill">
							<h4>Edit Type</h4>
							<select className="dropdown" id="dd1" onChange={this.handleValueChange}>
					            <option selected disabled> Type </option>
								<option value="SENATOR"> Senator </option>
								<option value="HOUSEMEMBER"> House Member </option>
					          </select>
							<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
							<a href="/legislator/edit" className="back">Back</a>
							<p className="prompt">{this.state.prompt}</p>
									
						</div>	
				    </div>
				)
			}else if (this.state.category === "sal"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.legislators.map((legislator, i) => {
								return(
									<div key={i++}>
										<h4>Edit Salary</h4>
										<input className="inputField" placeholder={legislator.sal} onChange={this.handleValueChange}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/legislator/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "noofterms"){
				return(
					<div className="App">
						<div className="Bill">
							{
							this.state.legislators.map((legislator, i) => {
								return(
									<div key={i++}>
										<h4>Edit No. of Terms</h4>
										<input className="inputField" placeholder={legislator.noofterms} onChange={this.handleValueChange}/>
										<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
										<a href="/legislator/edit" className="back">Back</a>
										<p className="prompt">{this.state.prompt}</p>
									</div>
									)	
								})
							}
						</div>	
				    </div>
				)
			}else if (this.state.category === "termstart"){
				return(
					<div className="App">
						<div className="Bill">
							<h4>Edit Date Term Started</h4>
							<input
				            type="date" className="inputField"  placeholder="Term Started" onChange={this.handleValueChange} />
							<input onClick={this.handleSubmitEdit} className="submit" type="button" value="Submit" />
							<a href="/legislator/edit" className="back">Back</a>
							<p className="prompt">{this.state.prompt}</p>
						</div>	
				    </div>
				)
			}
		}
		
	}
}

export default LegislatorEdit;
