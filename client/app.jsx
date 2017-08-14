import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

class PlaceItem extends React.Component {
  render() {
    return (
      <div className="item">
        <i className="large map signs middle aligned icon"></i>
        <div className="content">
          <a className="header" style={{ textAlign: "left" }}>{this.props.searchPlace}</a>
          <div className="description">{this.props.address}</div>
        </div>
      </div>
    )
  }
}

class PlaceItemList extends React.Component {
  render() {
    return (
      <div className="ui relaxed divided list">
        <PlaceItem searchPlace="Taipei 101" address="110台灣台北市信義區信義路五段7號台北101" />
      </div>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchPlace: ''
    }

    // This binding is necessary to make `this` work in the callback
    this.send = this.send.bind(this)
  }

  handleChange(e) {
    this.setState({ searchPlace: e.target.value });
  }

  send() {
    const { searchPlace } = this.state;
    const { host, port } = window.location;
    const url = `http://${host}/api/search-place`
    request
      .get(url)
      .query({ place: searchPlace })
      .end(function (error, response, body) {
        let result = JSON.parse(response.text)
        console.log(result)
      })

  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="fourteen wide column">
          <h2> Search the place </h2>
          <div className="ui action input">
            <input type="text" placeholder="Search..." value={this.state.searchPlace}
              onChange={this.handleChange.bind(this)}
            />
            <button className="ui blue button" onClick={this.send}>Search</button>
          </div>
          <div className="ui horizontal divider">
            place-spot
          </div>
          <PlaceItemList />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);