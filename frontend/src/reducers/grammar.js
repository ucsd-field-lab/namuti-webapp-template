export const GrammarClipsReducer = (state={
    grammarClips: [],
    fetched: false,
  }, action) => {
    switch (action.type) {
      case 'FETCH_GRAMMAR_CLIPS':
        return {
          ...state,
          fetched: true,
          grammarClips: action.grammarClips,
        }
      default:
        return state      
    }
  }