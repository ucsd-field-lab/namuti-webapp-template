export const SearchExamplesReducer = (state={
  example: {},
}, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':   
      return {
        ...state,
        example: action.payload
      }
    default:
      return state
  }
}

export const SearchClipsReducer = (state={
  fetched: false,
  searchClips: {},
  resultsToShow: false,
  numOfClipsFound: 0,
  searchQuery: "",
  selectedLanguage: {},
}, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH_CLIPS':
      return {
        ...state,
        fetched: true,
        searchClips: action.searchClips,
        searchQuery: action.searchQuery,
        resultsToShow: action.resultsToShow,
        numOfClipsFound: action.numOfClipsFound,
        selectedLanguage: action.searchedLanguage
      }
    case 'FETCH_SEARCH_CLIPS_REJECTED':
      return {
        ...state,
        fetched: false
      }
    default:
      return state      
  }
}