const React = require('react');
const ReactDOM = require('react-dom');
const request = require('superagent');

class PlaceItem extends React.Component {
  render() {
    return (
      <div className="item">
        <i className="large youtube middle aligned icon"></i>
        <div className="content">
          <a className="header">{this.props.place}</a>
          <div className="description">{this.props.address}</div>
        </div>
      </div>
    )
  }
}

class PlaceItemList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      places: []
    }
  }

  componentDidMount() {
    this.update()
  }

  update() {
    let self = this;
    let url = 'http://localhost:3000/api/history';
    request
      .get(url)
      .end(function (error, response) {
        let result = JSON.parse(response.text)
        self.setState({ places: result })
      })
  }

  render() {
    return (
      <div id="resultList" className="ui relaxed divided list">
        {
          this.state.places.map(function (value, index) {
            return <PlaceItem key={index} place={value.place}
            address={value.result.formatted_address} />
          })
        }
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
  }

  handleChange(event) {
    this.setState({ searchPlace: event.target.value })
  }

  send() {
    let self = this;
    let url = 'http://localhost:3000/api/search-place';
    request
      .get(url)
      .query({ place: this.state.searchPlace })
      .end(function (error, response) {
        let result = JSON.parse(response.text)
        console.log(result)
      })
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="fourteen wide column">
          <h2 className="ui teal image header">
            <i className="hand spock icon"></i>
            <div className="content">
              Search the place
            </div>
          </h2>
          <div className="ui action input">
            <input id="urlText" type="text" placeholder="Search..."
              onChange={this.handleChange.bind(this)} />
            <button id="searchButton" className="ui blue button"
              onClick={this.send.bind(this)}>Search</button>
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

/*
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);