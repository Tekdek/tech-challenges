import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


// Create table of surveys
function Surveys(props) {
  const surveys = (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
        </tr>
      </thead>
      <tbody>
        {props.surveys.map((survey) =>
          <tr key={survey.code}>
            <td>{survey.name}</td>
            <td>{survey.code}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
  return (
    <div>
      {surveys}
    </div>
  );
} 

class App extends Component {

  constructor() {
    super();
     this.state={
     surveys:[],
     requestFailed: false
   };
  }

  // fetch data 
  componentDidMount(){
    fetch(`http://localhost:8080/api/surveys`)
    .then(response => {
      if (!response.ok) {
        throw Error("request failed")
      }
      return response
    })
    .then(d=>d.json())
    .then(surveys=>this.setState({surveys}))
    setTimeout(() => console.log(this.state.surveys), 2000)
  } 




  render() {
    // If request failed
    if (this.state.requestFailed) return <p>Failed!</p>
    // If loading
    if (this.state.surveys === []) return <p>Loading...</p>

    return (
      <div className="App">
          <Surveys surveys={this.state.surveys} />
      </div>
    );
  }
}

export default App;


