import React, { Component } from 'react'

import { fetchGrammarClips } from '../../actions/fetchGrammarClips'
import { fetchStories } from '../../actions/fetchStories'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './grammar.css'

import { LoadingSpinner } from '../loadingSpinner/loadingSpinner'

export class Grammar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			examples: [
			],
		}
	}

	componentWillMount() {
    if (!this.props.clipsFetched) {
      this.props.getGrammarClips(this.state.examples)
    }
    
    if (!(this.props.allStoriesFetched)) {
      this.props.getStories()
    }
	}

	render() {
        let matchingClips = this.props.matchingGrammarClips
		if (matchingClips != null && matchingClips.length > 0) {
    		return(
    			<div id="grammar-page">
    				<h3 className="header">Grammar Examples</h3>
    				<GrammarClips clips={matchingClips} />
    			</div>
    		)
		} else {
      return (<LoadingSpinner />)
		}
	}
}


export const GrammarClips = props => {
  return (
    <div className="row">
      <ul className="search-clips-list">
        {
          props.clips.map(function(clip, i) {
            return( <GrammarClip
					      clip={clip}
                          line={i+1}
                          key={i}
					/>)
          })
        }
      </ul>
    </div>
  )
}

export const GrammarClip = props => {
    let clip = props.clip

  return (
		<li className="search-clips-item" value={clip}>
      <div className="row">
        <div className="large-1 columns">
          ({props.line})
        </div>
        <div className="large-8 columns">
					<h6 className="grammar-example"><Link to={ 'text/' + clip.ClipRecording.substring(0, clip.ClipRecording.indexOf('['))+ '/citation/' + clip.ClipRecording}>
                        <span>{clip.Title}</span></Link> by {clip.Speakers}
                    </h6>
          <div data-language="broad">{clip.Broad}</div>
          <div data-language="spanish">{clip.Spanish}</div>
          <div data-language="english">{clip.English}</div>
          <div data-language="newOrtho">{clip.NewOrtho}</div>
          <div data-language="uttGloss">{clip.UttGloss}</div>
        </div>
		<div className="large-3 columns">
            <div>{clip.ClipRecording}</div>
			<div><audio src={clip.ClipRecordingPath} controls></audio></div>
		</div>
      </div>
		</li>);
}


const mapStateToProps = (state) => {
  return {
    clipsFetched: state.GrammarClipsReducer.fetched,
    matchingGrammarClips: state.GrammarClipsReducer.grammarClips,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGrammarClips: (examples) => {
      dispatch(fetchGrammarClips(examples))
    },
    getStories: () => {
      dispatch(fetchStories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grammar)