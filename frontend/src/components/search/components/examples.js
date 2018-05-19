import React, { Component } from 'react'
import { connect } from 'react-redux'

export class SearchExamples extends Component {
	constructor(props) {
		super(props)
    this.state = {
      examples: [
        { label: "Ortografía Rarámuri", language: "newortho",   keyword: "čabé"  },
        { label: "Ortografía Rarámuri", language: "newortho",   keyword: "tiyópa-či"  },
        { label: "Ortografía Rarámuri", language: "newortho",   keyword: "birá=timi"  },
        { label: "Broad Transcription", language: "broad",   keyword: "tʃaˈbe"  },
        { label: "Broad Transcription", language: "broad",   keyword: "aʔˈri"  },
        { label: "Broad Transcription", language: "broad",   keyword: "ruˈwa ba"  },
        { label: "Español", language: "spanish",   keyword: "mañana"  },
        { label: "Español", language: "spanish",   keyword: "llegaron"  },
        { label: "Broad Transcription", language: "broad",   keyword: "está"  },
        { label: "Morpheme Glosses", language: "uttgloss",   keyword: "PTCP"  },
        { label: "Morpheme Glosses", language: "uttgloss",   keyword: "-FUT.SG"  },            
        { label: "Morpheme Glosses", language: "uttgloss",   keyword: "=DEM"  },            
        { label: "Morpheme Glosses", language: "uttgloss",   keyword: "DEM"  },                        
      ],
    }
  }
  autoSearch = (language, keyword) => {
    this.props.setQuery({
      "language": language,
      "keyword": keyword
    })
  }
  render () {
    return (
      <div className="row">
        <h5>Search Examples</h5>
        <ul className="search-examples">
          {
            [...this.state.examples].map((example, i) => {
              return (
                <li key={i} className="search-example">
                  <a onClick={() => this.autoSearch(example.language, example.keyword)}>
                  <div>
                    <span className="example-language">{example.label}</span>
                    <span className="example-keyword">{example.keyword}</span>
                  </div>
                  </a>
                </li>
              )
            })
          }
        </ul>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		setQuery: (payload) => {
      dispatch({
        type: 'SET_SEARCH_QUERY',
        payload: payload,
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(SearchExamples)