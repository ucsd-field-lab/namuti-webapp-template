import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchStories } from '../../actions/fetchStories'

import './home.css'
export class Home extends Component {
  componentDidMount() {
    if (!(this.props.allStoriesFetched)) {
      this.props.getStories()
    }
  }

  render() {
    return(
<div>
    <div className="row" id="home">
      <div>
          <h1 className="header-label">Choguita Rarámuri Language Project</h1>
          <h4 className="header-label">Kuira ba!</h4>
          <div className="large-7 columns nameforyourprojectbackend-language-description">
          <p>
Home page information
          </p>
      </div>
  </div>
</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {   
    allStoriesFetched: state.StoriesReducer.fetched
}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStories: () => {
      dispatch(fetchStories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
