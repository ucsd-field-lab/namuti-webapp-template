import React, { Component } from 'react';
import './about.css';

import { connect } from 'react-redux'
import { fetchStories } from '../../actions/fetchStories'

export class About extends Component {
  render() {
    return (

      <div>About Page</div>      

    );
  }
}

const mapStateToProps = (state) => {
  return {   
    allStoriesFetched: state.StoriesReducer.allStoriesFetched
}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStories: () => {
      dispatch(fetchStories)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)