import React, { Component } from 'react'
import './search.css'

import SearchExamples from './components/examples'

import _ from 'lodash'
import { connect } from 'react-redux'

import { fetchMatchingClips } from '../../actions/fetchMatchingClips'
import { fetchStories } from '../../actions/fetchStories'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

import queryString from 'query-string'

import { Link } from 'react-router-dom'

export class Search extends Component {
	constructor(props) {
		super(props)
        this.state = {
          query: this.props.searchQuery.query || this.props.exampleQuery.keyword || "",
          languages: [
            { value: "english",   label: "English"  },
            { value: "broad",     label: "Broad Transcription" },
            { value: "spanish",   label: "Español"  },
            { value: "newortho",  label: "Ortografía Rarámuri" },
            { value: "uttgloss",  label: "Morpheme Glosses" },
            { value: "global",    label: "Global"   }
          ],
          // selectedLanguage: this.props.selectedLanguage || this.languages[0],
          selectedLanguage: this.props.searchQuery.language || this.props.exampleQuery.language,          
          searchEntered: false
        }

	}

	componentWillMount() {

        // update url based on search query

        // this.props.location.query.language = this.state.selectedLanguage.value
        // hashHistory.replace(this.props.location)

        // update searchbox based on url parameters
				const params = queryString.parse(this.props.location.search)
        if (params != null) {
            if ("search" in params && "language" in params) {
                this.setState({ query: params.search })
                this.setState({ selectedLanguage: params.language })
                this.props.getMatchingClips(params.language, params.search)
            }
        }
        
  }
  
  // always gets called when store changes
  componentWillReceiveProps = (store) => {
    let query = store.exampleQuery
    if (!this.isDuplicateSearch(this.props.exampleQuery, query)) {
      this.setQuery(query)
    }
  }

  isDuplicateSearch = (oldProps, newProps) => {
    return (oldProps.language === newProps.language && oldProps.keyword === newProps.keyword) ? true : false
  }

  getLanguageObject = (query) => {
    return this.state.languages.find(o => o.value === query.language)    
  }

  setQuery = (query) => {
    if (!_.isEmpty(query)) {
      this.setState({ selectedLanguage: this.getLanguageObject(query)})
      this.setState({ query: query.keyword })
      this.props.getMatchingClips(this.getLanguageObject(query), query.keyword)
    }
  }

  selectLanguage = (selectedLanguage) => {
    this.setState({ selectedLanguage: selectedLanguage })
    queryString.parse(this.props.location.search).language = selectedLanguage.value
    // HashRouter.replace(this.props.location)
  }

  toggleResults = (results) => {
    if (Object.keys(results).length === 0) {
      this.setState({ resultsToShow: false })
    } else {
      this.setState({ resultsToShow: true })
    }
  }

  _handleKeyPress = (e) => {
      if (e.key === 'Enter') {
				let params = ''
				if (this.props.location.search !== undefined ) {
					params = queryString.parse(this.props.location.search)
				}
        params.language = this.state.selectedLanguage.value || params.language
        params.search = e.currentTarget.value
        // HashRouter.replace(this.props.location)
				this.props.getMatchingClips(this.getLanguageObject(params), e.currentTarget.value)
      }
  }

  getInput = (e) => {
      this.setState({ query: e.currentTarget.value })
  }

	render() {

      return(

        <div>
          <div className="row">
            <div className="large-6 columns">
              <Select
                  className="language-search"
                  name="language-search"
                  value={this.state.selectedLanguage}
                  options={this.state.languages}
                  onChange={this.selectLanguage}
                  placeholder="Select Language..."
                  //isLoading={true}
              />
            </div>
            <div className="large-6 columns">
              <input
                  type="text"
                  name="recording-search"
                  value={this.state.query !== null ? this.state.query : "" }
                  placeholder= "Search for a word..."
                  onChange={this.getInput}
                  onKeyPress={this._handleKeyPress}
              />
            </div>
          </div>
          <div>
            <SearchExamples></SearchExamples>
          </div>
          {/* {
              this.state.searchEntered ? <LoadingSpinner /> : null
          } */}
        {
          this.props.resultsToShow ?
            <div>
                <div className="row">{this.props.numOfClipsFound} clips found</div>
                <div id="matching-clips">
                {

                  Object.keys(this.props.matchingSearchClips).map((wav, i) => {

                      let story = this.props.matchingSearchClips[wav]
                      return(
                            <SearchStoryContainer
                               story={story}
                               searchQuery={this.props.searchQuery}
                               languageSearched={this.props.selectedLanguage.label}
                               id={wav.substr(0, wav.indexOf('.'))}
                               key={i} />
                        )

                  })
                }
                </div>
            </div>
             : <div className="row"><span id="no-match-found">No Match Found</span></div>

        }

      </div>

      )

	}

}

export const SearchStoryContainer = props => {
    let story = props.story
    return (
        <div className="row matching-clips-container">
          <h5><Link to={'text/' + props.id}>{story.StoryName}</Link> by {story.Speakers}</h5>
          <ul className="search-clips-list">
            {
              story.Clips.map((clip, i) => {
                return( <Clip clip={clip}
                              languageSearched={props.languageSearched}
                              searchQuery={props.searchQuery}
                              line={i+1}
                              key={i} />)
              })
            }
          </ul>
        </div>
      )
}


export const Clip = props => {

  // let filteredKeywords = {}
  let filteredLines = {}
  let keyword = props.searchQuery
  let clip = props.clip
  let languages = {
      "NewOrtho": clip.NewOrtho,
      "Broad": clip.Broad,
      "UttGloss": clip.UttGloss,
      "Spanish": clip.Spanish,
      "English": clip.English
  }

  _.forOwn(languages, (clip, language) => {
    filteredLines[language] = getKeywords(clip, language, props.searchQuery)
  })

  return (
		<li className="search-clips-item" value={props.clip}>
      <div className="row">
        <div className="large-1 columns">
          ({props.line})
        </div>
        <div className="large-6 columns">
          {
            Object.keys(filteredLines).map(function(language, i) {
              let line = filteredLines[language]
              if (languages[language]) {
                return(
                  <ClipContainer  languageSearched = {props.languageSearched}
                                  language      = {language}
                                  beforeKeyword = {line.beforeKeyword}
                                  afterKeyword  = {line.afterKeyword}
                                  keywordExists = {line.keywordExists}
                                  keyword       = {keyword}
                                  key           = {i}
                  />
                )
              } else {
                return(null)
              }
            })
          }
        </div>
        <div className="large-5 columns">
            <div><audio src={clip.ClipRecordingPath} controls></audio></div>
        </div>
      </div>
		</li>)
}


export const ClipContainer = props => {
  return (
    <div className={props.languageSearched === props.language ? "searched-language" : null} data-language={props.language}>
      <Line beforeKeyword={props.beforeKeyword} keywordExists={props.keywordExists} keyword={props.keyword} afterKeyword={props.afterKeyword} />
    </div>
  )
}

export const Line = props => {
    return (
      <div>
        <span>{props.beforeKeyword}</span>
        <span className="keyword">{ props.keywordExists ? props.keyword : null }</span>
        <span>{props.afterKeyword}</span>
      </div>
    )
}

let wrapSearchQuery = (line, keyword) => line ? line.replace(new RegExp('(' + keyword + ')'), '<spans className="keyword">$1</span>') : line

let getKeywords = (line, language, searchQuery) => {

  if (line != null) {
    let lineWithSpan = wrapSearchQuery(line, searchQuery)
    let beforeKeyword = lineWithSpan.substr(0, lineWithSpan.indexOf('<'))
    let afterKeyword = lineWithSpan.substr(lineWithSpan.indexOf('>', lineWithSpan.indexOf('>') + 1)+1, lineWithSpan.length)
    let keywordExists = line.includes(searchQuery)

    return {"beforeKeyword": beforeKeyword, "afterKeyword": afterKeyword, "keywordExists": keywordExists}
  }
  return {"beforeKeyword": null, "afterKeyword": null, "keywordExists": null}
}


const mapStateToProps = (state) => {
  return {
    matchingSearchClips: state.SearchClipsReducer.searchClips,
    searchQuery: state.SearchClipsReducer.searchQuery,
    selectedLanguage: state.SearchClipsReducer.selectedLanguage,
    resultsToShow: state.SearchClipsReducer.resultsToShow,
    numOfClipsFound: state.SearchClipsReducer.numOfClipsFound,
    exampleQuery: state.SearchExamplesReducer.example
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStories: () => {
      dispatch(fetchStories())
    },
		getMatchingClips: (language, query) => {
			dispatch(fetchMatchingClips(language, query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)