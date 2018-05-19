import React, { Component } from                    'react'
import { fetchStory } from                          '../../actions/fetchStory'
import { connect } from                             'react-redux'

import { ClipContainer } from                       './components/clip'
import { StoryV } from                              './components/story-view'
import { StoryHeader, StoryLanguageHeaders } from   './components/header'
import Scroll from 'react-scroll'

import './story.css';

let scroller = Scroll.scroller

export class StoryContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      communityView: true,
      storyView: false,
      targetClip: this.props.match.params.clipID,
    }
  }

  toggleCommunityGlossView() {
    this.setState({
      communityView: !this.state.communityView,
      storyView: false,
    });
  }

  showStoryView() {
    this.setState({
      communityView: !this.state.communityView,
      storyView: !this.state.storyView,
    });
  }

  componentWillMount() {
    this.props.getStory(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (this.props.match.params.id !== undefined && this.props.match.params.clipID !== undefined) {
      scroller.scrollTo(this.props.match.params.clipID, {
          duration: 0,
          offset: -100,
      })
    }
  }

  render() {

    if (Object.keys(this.props.story).length > 0) {

      let story = this.props.story;

      return(
        <div className="row">
          <StoryHeader  recording={story["Filename"]}
                        story={story}
                        title={story["Title"]}
                        speaker={story["Speakers"]}
                        audio={story["RecordingPath"]}
                        className="story-header"
          />
          <button id="toggle-community-view" 
                  className="button hollow primary has-tip" 
                  onClick={(e) => this.toggleCommunityGlossView(e) }
                  data-tooltip aria-haspopup="true" data-disable-hover="false" tabIndex="1" title="Toggle Community/Gloss View"   
          >
          <i className="fa fa-2x fa-language" aria-hidden="true"></i>                      
          </button>
          

          <button id="toggle-story-view" className="button hollow primary has-tip" onClick={(e) => this.showStoryView(e) }
              data-tooltip aria-haspopup="true" data-disable-hover="false" tabIndex="1" title="Toggle Story View"
            >
            <i className="fa fa-2x fa-book" aria-hidden="true"></i>          
          </button>

          <div>
              {
                  !this.state.storyView ?

                    <ClipContainer  targetClip={this.state.targetClip}
                                    story={story}
                                    community-view={this.state.communityView} />
                    :
                    <div>
                      <StoryLanguageHeaders />
                      <StoryV story={story} />
                    </div>
              }

        </div>

        </div>
      )
    } else {
      return null;
    }

  }
}


const mapStateToProps = (state) => {
  return {
    storyFetched: state.StoryReducer.storyFetched,
    story: state.StoryReducer.story,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStory: (storyID) => {
      dispatch(fetchStory(storyID))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer)
