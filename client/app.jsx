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
            return <PlaceItem key={index} place={value.place} />
          })
        }
      </div>
    )
  }
}

class App extends React.Component {
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
            <input id="urlText" type="text" placeholder="Search..." />
            <button id="searchButton" className="ui blue button">Search</button>
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