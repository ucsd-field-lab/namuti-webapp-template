export const StoriesReducer = (state={
  stories: {},
  fetched: false,
}, action) => {
  switch (action.type) {
    case 'FETCH_ALL_STORIES':
      return {
        ...state,
        fetched: true,
        stories: action.stories,
      }
    default:
      return state      
  }
}

export const StoryReducer = (state={
  storyFetched: false,
  story: {},
  error: null,
}, action) => {
  switch (action.type) {
    case 'FETCH_STORY':
      return {
        ...state,
        storyFetched: true,
        story: action.story,
      }
    case 'FETCH_STORY_REJECTED':
      return {
        ...state,
        fetched: false
      }
    default:
      return state      
  }
}