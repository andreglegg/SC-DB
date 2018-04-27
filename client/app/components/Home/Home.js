import React, {Component} from 'react';
import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      locations: []
    };

    this.newCounter = this.newCounter.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.deleteCounter = this.deleteCounter.bind(this);

    this._modifyCounter = this._modifyCounter.bind(this);
  }

  componentDidMount() {
    fetch('/api/counters')
      .then(res => res.json())
      .then(json => {
        this.setState({
          counters: json
        });
      });
    fetch('/api/location')
      .then(res => res.json())
      .then(json => {
        this.setState({
          locations: json
        });
      });
  }

  newCounter() {
    fetch('/api/counters', {method: 'POST'})
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
  }

  incrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/increment`, {method: 'PUT'})
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  decrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/decrement`, {method: 'PUT'})
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  deleteCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}`, {method: 'DELETE'})
      .then(_ => {
        this._modifyCounter(index, null);
      });
  }

  _modifyCounter(index, data) {
    let prevData = this.state.counters;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      counters: prevData
    });
  }

  render() {
    return (
      <>
        <p>Counters:</p>

        <ul>
          {this.state.counters.map((counter, i) => (
            <li key={i}>
              <span>{counter.count} </span>
              <button onClick={() => this.incrementCounter(i)}>+</button>
              <button onClick={() => this.decrementCounter(i)}>-</button>
              <button onClick={() => this.deleteCounter(i)}>x</button>
            </li>
          ))}
        </ul>

        <button onClick={this.newCounter}>New counter</button>

        <p>Locations:</p>

        <ul>
          {this.state.locations.map((location, i) => {
            console.log(location.Yela);
            const planet = location.Yela;
            let zones = Object.keys(location.Yela);
            console.log(zones);
            return (
              zones.map((key, index) => {
                const zone = key;
                let trade = "";
                Object.keys(planet[zone]).map((k, i)=> {
                  console.log(k)
                  trade = k;
                });
                return (
                  <li key={index}>
                    {zone}
                    {trade}
                  </li>
                )
              })
            )
          })}
            </ul>
            </>
            );
            }
          }

          export default Home;
