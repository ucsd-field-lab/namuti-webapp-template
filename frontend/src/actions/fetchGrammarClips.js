import { axiosInstance } from '../shared/axios-config'

export const fetchGrammarClips = (examples) => {
  return ((dispatch) => {

    axiosInstance.get('/api/grammar/clips', {
      params: {
        examples: JSON.stringify(examples)
      }
    })
    .then((response) => {

      let grammarClips = response.data.data

      dispatch({
        type: 'FETCH_GRAMMAR_CLIPS',
        grammarClips: grammarClips,
      })
    })
    .then((err) => {
      return err
    })
  })


}
