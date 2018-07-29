import React, { Component } from 'react';
import autobind from 'react-autobind'

class BillDelete extends Component{
	constructor(props) {
	    super(props);
	    autobind(this)
	    this.state={
		    billno:'',
		    billnos: [],
		    prompt: ''
	    };
  	}

  	handleBillNoChange(e){
  		this.setState({
  			billno: e.target.value
  		});
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

  	handleSubmit(e){
    	fetch(`http://www.localhost:3001/deleteBills`,{
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
					<select className="dropdown" id="dd1" onChange={this.handleBillNoChange}>
						<option selected disabled> Bill No. </option>
						{this.state.billnos.map((billnum, i) => {
							return(
									<option key={i++} value={billnum.billno}> {billnum.billno} </option>
								)	
							})
						}
					</select>
					<input onClick={this.handleSubmit} className="submit" type="button" value="Delete" />
					<p className="prompt">{this.state.prompt}</p>
					<a href="/bill/" className="back">Back</a>
				</div>
	    	</div>
		)
	}
}

export default BillDelete;