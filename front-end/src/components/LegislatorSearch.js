import React, {Component} from 'react';
import autobind from 'react-autobind';

class LegislatorSearch extends Component {
  constructor(props){
    super(props);
    autobind(this);
    this.state = {
      empid: 0,
      fname: '',
      lname: '',
      type: '',
      results: [],
      category: '',
      prompt: '',
      value: ''
    }
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

  searchByName(){
  	fetch(`http://localhost:3001/searchLegislatorByName?value=${this.state.value}`)
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
  	if (this.state.category === ''){
  		return(
	      <div className="App">
	      	<div className="Bill">
	      	<h4>Search Legislator</h4>
	          <select id="dd1" className="dropdown"
	           onChange={(e)=> { this.setState({category: e.target.value })}}>
	            <option selected disabled>Category</option>
	            <option value="empid">Employee ID</option>
	            <option value="type">Type</option>
	            <option value="name">Name</option>
	          </select>
	          <a href="/legislator" className="back">Back</a>
	         </div>
	        </div>
  		)
  	}else if (this.state.category === 'empid'){
  		return(
  			<div className="App">
  				<div className="Bill">
  					<h4>Search Legislator</h4>
  					<input type="number" className="inputField" min="0" placeholder="Employee ID" onChange={ (e) => { this.setState({value: e.target.value}) }} />
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
  	}else if (this.state.category === 'type'){
  		return(
  			<div className="App">
  				<div className="Bill">
  					<h4>Search Legislator</h4>
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
  	}else if (this.state.category === 'name'){
  		return(
  			<div className="App">
  				<div className="Bill">
  					<h4>Search Legislator</h4>
  					<input className="inputField" placeholder="Name" onChange={(e) => { this.setState( { value: e.target.value } ) }}/>
  					<input onClick={ this.searchByName } className="submit" type="button" value="Submit" />
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
}

export default LegislatorSearch;