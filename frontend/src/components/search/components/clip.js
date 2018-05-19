import React, { Component } from 'react'

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

export const Clip = props => {

  let filteredKeywords = {}
  let filteredLines = {}
  let keyword = props.searchQuery
  let languages = {
      "NewOrtho": props.newOrtho,
      "Broad": props.broad,
      "UttGloss": props.uttgloss,
      "Spanish": props.spanish,
      "English": props.english
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
                  <ClipContainer  searched      = {props.searched}
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
            <div><audio src={props.audio} controls></audio></div>
        </div>
      </div>
		</li>)
}


export class ClipContainer extends Component {

  render() {

      return (
        <div className={this.props.searched === this.props.language ? "searched-language" : null} data-language={this.props.language}>
          <Line beforeKeyword={this.props.beforeKeyword} keywordExists={this.props.keywordExists} keyword={this.props.keyword} afterKeyword={this.props.afterKeyword} />
        </div>
      )
  }
}

export class Line extends Component {
  render() {
    return (
      <div>
        <span>{this.props.beforeKeyword}</span>
        <span className="keyword">{ this.props.keywordExists ? this.props.keyword : null }</span>
        <span>{this.props.afterKeyword}</span>
      </div>
    )
  }
}
