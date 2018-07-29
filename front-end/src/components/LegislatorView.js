import React, {Component} from 'react';
import autobind from 'react-autobind';

export default class LegislatorList extends Component {
  constructor(props){
    super(props);
    autobind(this);
    this.state = { results: [], category: 'type', value: '' };
  }

  search(){
  	fetch(`http://localhost:3001/searchLegislator?category=${this.state.category}&value=${this.state.value}`)
    .then((response) => { return response.json()})
    .then((result) => {
      this.setState({results: result})
      if ((this.state.results).length === 0){
			this.setState({
		        prompt: 'Record not existing!'
		      })
		}
    })
    .catch( () => console.log("failure"))
  }

  render(){
    return(
		<div className="App">
			<div className="Bill">
				<h4>View Legislators</h4>
				<select className="dropdown" id="dd1" placeholder="Type" onChange={ (e) => { this.setState({value: e.target.value}) }}>
				<option selected disabled> Type </option>
				<option value="SENATOR"> Senator </option>
				<option value="HOUSEMEMBER"> House Member </option>
			</select>
				<input onClick={ this.search } className="submit" type="button" value="Submit" />
				{ this.state.results.map(
	            (legislator, i) => {
	              return (
	                <table key={i++}>
	                  <th>Category</th>
	                  <th>Information</th>
	                  <tr><td className="tableCat">Emp ID</td><td>{legislator.empid}</td></tr>
	                  <tr><td className="tableCat">Name</td><td>{legislator.fname + " " + legislator.lname}</td></tr>
	                  <tr><td className="tableCat">Sex</td><td>{legislator.sex}</td></tr>
	                  <tr><td className="tableCat">Birthday</td><td>{legislator.bday}</td></tr>
	    			  <tr><td className="tableCat">Type</td><td>{legislator.type}</td></tr>
	                  <tr><td className="tableCat">Salary</td><td>{legislator.sal}</td></tr>
	                  <tr><td className="tableCat">Terms</td><td>{legislator.noofterms}</td></tr>
	                  <tr><td className="tableCat">Start of Term</td><td>{legislator.termstart}</td></tr>
	                  <tr><td className="tableCat">End of Term</td><td>{legislator.termend}</td></tr>
	      			</table>
	              )
	            })
	          }
	          <p className="prompt">{this.state.prompt}</p>
	          <a href="/legislator/search" className="back">Back</a>
			</div>
		</div>	
	)
  }
}