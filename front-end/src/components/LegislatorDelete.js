import React, { Component } from 'react';
import autobind from 'react-autobind'

class LegislatorDelete extends Component{
	constructor(props){
    super(props);
    autobind(this);
    this.state = { legislators: [], empid: '', prompt: '' };
  }

  componentDidMount = () => {
    fetch(`http://localhost:3001/legislators`)
    .then((response) => { return response.json()})
    .then((result) => {
      console.log(result);
      this.setState({ legislators: result });
    })
    .catch((e) => { console.log(e); });

    
    console.log(this.state.legislators);
    this.forceUpdate();
    }

    handleEmpidChange(e){
    	this.setState({ empid: e.target.value });
    }

  	handleSubmit(e){
    	fetch(`http://www.localhost:3001/deleteLegislator`,{
	    	method:'POST',
	    	headers:{
	        "Content-Type":"application/json"
	    	},
	      body:JSON.stringify(this.state)
	    })
	    .then(function (data){
	    	console.log('Request success',data);

	    })
	    .catch(function(error){
	    	console.log('Request failure: ',error);
	    });

	    this.setState({ prompt: 'Successfully deleted!' });
	    console.log(this.state);
	    this.forceUpdate();
  	}

	render(){
		return(
			<div className="App">
				<div className="Bill">
					<h4>Delete</h4>
					<select className="dropdown" id="dd1" onChange={this.handleEmpidChange}>
						<option selected disabled> Employee ID </option>
						{this.state.legislators.map((legislator, i) => {
							return(
									<option key={i++} value={legislator.empid}> {legislator.empid} </option>
								)	
							})
						}
					</select>
					<input onClick={this.handleSubmit} className="submit" type="button" value="Delete" />
					<p className="prompt">{this.state.prompt}</p>
					<a href="/legislator/" className="back">Back</a>
				</div>
	    	</div>
		)
	}
}

export default LegislatorDelete;