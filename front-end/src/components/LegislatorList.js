import React, {Component} from 'react';
import autobind from 'react-autobind';

export default class LegislatorList extends Component {
  constructor(props){
    super(props);
    autobind(this);
    this.state = { legislators: [] };
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

  render(){
    return(
      <div className="App">
      <div className="Bill">
        <h4>Legislators</h4>
        {this.state.legislators.map(
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
            }
        )}
        <a href="/legislator/" className="back">Back</a>
      </div>
      </div>
    )
  }
}