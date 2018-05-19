import React, { Component } from 'react'
import './text.css'
import { LoadingSpinner } from '../loadingSpinner/loadingSpinner'

import { connect } from 'react-redux'
import { fetchStories } from '../../actions/fetchStories'

import { TextBySpeakers, TextByTitles, TextByTitle } from './components/individual-text'

export class TextsRetriever extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showByTitle: true,
			showBySpeaker: false,
		}
	}

  componentDidMount() {
    if (!(this.props.allStoriesFetched)) {
			this.props.getStories()
		}
  }

	viewByTitle(e) {
		this.setState({ showByTitle: true })
		this.setState({ showBySpeaker: false });
	}


	viewBySpeaker(e) {
		this.setState({ showByTitle: false });
		this.setState({ showBySpeaker: true });
	}

	render() {

   	if (this.props.stories == null || !('by_title' in this.props.stories)) {
			return (<LoadingSpinner />)			
		 } else {
				// REFACTOR THIS
  			let allTextByTitle = this.props.stories['by_title'].data.map(function(story, i) {
          let storyId = story["recording_filename"].substr(0, story["recording_filename"].indexOf('.'))
  				return(<TextByTitle filename={story['recording_filename']} data={story} speaker={story['contributors']} title={story['story_name']} id={storyId} key={i} />)
  			});

  			return(
  				<div>
  					<div className="row">
  						<button className="button hollow primary" onClick={ (e) => this.viewByTitle(e) }>View by Titles</button>
  						<button className="button hollow primary" onClick={ (e) => this.viewBySpeaker(e) }>View by Speakers</button>
  					</div>
  					<div className="row">
              <div className="large-6 columns">
    						{ this.state.showByTitle ? <TextByTitles texts={allTextByTitle} /> : null }
    						{ this.state.showBySpeaker ? renderTextBySpeakers(this.props.stories) : null }
              </div>
  					</div>
  				</div>
  			);

		}
	}

}

let renderTextBySpeakers = (stories) => {

  if (stories['by_speakers'] != null && Object.keys(stories['by_speakers']).length > 0) {
    return (
      <div>
        {
          Object.keys(stories['by_speakers']).map(function(speaker, i) {
            return(<TextBySpeakers stories={stories['by_speakers'][speaker]} key={i} />);
          })
        }
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
		stories: state.StoriesReducer.stories,		
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

export default connect(mapStateToProps, mapDispatchToProps)(TextsRetriever)