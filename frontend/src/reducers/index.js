import { combineReducers } from 'redux'

import {
    StoryReducer,
    StoriesReducer
} from './stories'

import { GrammarClipsReducer } from './grammar'
import { SearchClipsReducer, SearchExamplesReducer } from './search'

export default combineReducers({
    SearchExamplesReducer: SearchExamplesReducer,
    StoryReducer: StoryReducer,
    SearchClipsReducer: SearchClipsReducer,
    GrammarClipsReducer: GrammarClipsReducer,
    StoriesReducer: StoriesReducer,
})