import { axiosInstance } from '../shared/axios-config'

export const fetchMatchingClips = (languageObject, query) => {

  // console.log(languageObject)
  // console.log(query)
  return ((dispatch) => {

    axiosInstance.get('/api/search/clips', {
      params: {
        language: languageObject.value,
        query: query
      }
    })
    .then((response) => {

      let foundClips = response.data.foundClips
      let matchingClips = response.data.data;
      let numOfClips = response.data.numOfClips

      // console.log(matchingClips)

      dispatch({
        type: 'FETCH_SEARCH_CLIPS',
        searchClips: matchingClips,
        searchQuery: query,
        numOfClipsFound: numOfClips,
        resultsToShow: foundClips,
        searchedLanguage: languageObject
      })
    })
    .then((err) => {
      return err
    })
  })


}
