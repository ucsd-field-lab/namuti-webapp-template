import { axiosInstance } from '../shared/axios-config'

export const fetchStory = (storyID) => {

  const request = axiosInstance.get('/api/stories/story?id=' + storyID)
  return ((dispatch) => {
    request.then((response) => {

          let story = response.data.story
          dispatch({
            type: 'FETCH_STORY',
            story: story,
            storyFetched: true,
          });
    })
  });
};
