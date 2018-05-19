import { axiosInstance } from '../shared/axios-config'
import qs from 'querystring'

export const fetchStories = () => {

  let params = qs.stringify({
    bySpeaker: true,
    byTitle: true
  })
  const request = axiosInstance.get('/api/stories?' + params)

  return ((dispatch) => {

    request.then((response) => {

      let stories = response.data.stories
      dispatch({
        type: 'FETCH_ALL_STORIES',
        stories: stories,
        storiesFetched: true,
      })

    })
    .catch((error) => {
      if (error) {
        console.log(error)
      }
    });
  });
};
