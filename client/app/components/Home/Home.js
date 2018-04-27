import React, {Component} from 'react';
import 'whatwg-fetch';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      locations: []
    };

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

  /*newCounter() {
    fetch('/api/counters', {method: 'POST'}) // method can be  'PUT' 'DELETE' ETC...
      .then(res => res.json())
      .then(json => {
        let data = this.state.counters;
        data.push(json);

        this.setState({
          counters: data
        });
      });
  }*/


  render() {

    const render = this.state.locations.map((location, i) => {
      console.log(location.Yela);
      const planet = location.Yela;
      let zones = Object.keys(location.Yela);
      console.log(zones);
      return (
        zones.map((zone, index) => {
          const theObject = Object.keys(planet[zone]).map((trade, index) => {

            const prices = planet[zone][trade].map(((item, index) => (
              <li key={index}>{item.price}</li>
            )));
            console.log("prices: " + prices);
            return (
              <li key={index}>
                {trade}
                <ul>
                  {prices}
                </ul>
              </li>
            )
          });
          return (
            <li key={index}>
              {zone},
              <ul>
                {theObject}
              </ul>
            </li>
          )
        })
      )
    });

    return (
      <>
        <p>Yela:</p>

        <ul>
          {render}
        </ul>
      </>
    );
  }
}

export default Home;
