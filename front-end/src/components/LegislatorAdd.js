import React, { Component } from 'react';
import autobind from 'react-autobind';

class LegislatorAdd extends Component {
  constructor(props){
    super(props);
    autobind(this);
    this.state = {
      fname: '',
      mname: '',
      lname: '',
      bday: new Date(),
      sex: '',
      type: '',
      sal: 0,
      noOfTerms: 0,
      termstart: new Date(),
      termend: new Date(),
      //can be used for party or representation in senate/housemember table
      affiliation: '',
      prompt: ''
      // can be used for house or senate
      // congress_membership: {
      //   congressno: 0,
      //   type: '',
      //   meetingplace: '',
      //   speaker: '',
      //   termstart: new Date()
      // }
    };
  }

  handleSubmit(){
    fetch(`http://www.localhost:3001/addLegislator`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(this.state)
    })
    .then( (response) => {console.log(response)
      this.setState({
        prompt: 'Successfully added!'
      })
    })
    .catch( ()=> {console.log("FAILURE") } )
  }

  render(){
		return(
      <div className="App">
		    <div className="Bill">
        <h4>Add Legislator</h4>
				<form>
          <input className="inputField" placeholder="First Name" onChange={(e) => { this.setState( { fname: e.target.value } ) }}/>
					<input className="inputField" placeholder="Middle Name" onChange={(e) => { this.setState( { mname: e.target.value } ) }}/>
          <input className="inputField" placeholder="Last Name" onChange={(e) => { this.setState( { lname: e.target.value } ) }}/>
          <input
            type="date" className="inputField"  placeholder="Birthday"
            onChange={ (e) => { this.setState({bday: e.target.value}) } } />
          <select className="dropdown" id="dd1" onChange={ (e) => { this.setState({ sex: e.target.value}) } }>
            <option selected disabled> Sex </option>
            <option value="M"> Male </option>
            <option value="F"> Female </option>
          </select>
          <select className="dropdown" id="dd1" onChange={ (e)=> { this.setState({type: e.target.value})} }>
						<option selected disabled> Type </option>
						<option value="SENATOR"> Senator </option>
						<option value="HOUSEMEMBER"> House Member </option>
					</select>
          <input className="inputField" placeholder="Affiliation" onChange={(e) => { this.setState( { affiliation: e.target.value } ) }}/>
          <input type="number" className="inputField" placeholder="No. of Terms" onChange={ (e) => {this.setState({ noofterms: e.target.value}) } }/>
					<input
            type="date" className="inputField" placeholder="Term Starts"
            onChange={ (e) => {this.setState({ termstart: e.target.value}) } }/>
					<input onClick={this.handleSubmit} className="submit" type="button" value="Submit" />
				  <p className="prompt">{this.state.prompt}</p>
        </form>
        </div>
			</div>
		);
	}
}

export default LegislatorAdd