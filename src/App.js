import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      planes: [],
      planetype: '',
      passengercount: ''
    }
  }

  componentDidMount () {
    axios.get('http://localhost:3000/api/planes')
    .then(response => {
      this.setState({ planes: response.data })
    })
  }

  addPlane = () => {
    const { planetype, passengercount } = this.state;

    axios.post('http://localhost:3000/api/planes', {
      planetype,
      passengercount: Number(passengercount)
    }).then((response) => {
      this.setState({ planes: response.data})
    })
  }

  render() {
    return (
      <div className="App">
        <input onChange={(e) => this.setState({planetype: e.target.value})} placeholder="planetype" />
        <input onChange={(e) => this.setState({passengercount: e.target.value})} placeholder="passengercount" />
        <button onClick={this.addPlane}>Add Plane!</button>

        {this.state.planes.map((plane) => {
          return (
            <div key={plane.planeid}>
              PASSENGER COUNT: {plane.passengercount} TYPE: {plane.planetype}
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
