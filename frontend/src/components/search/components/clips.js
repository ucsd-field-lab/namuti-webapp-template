import React from 'react'

import { Clip } from './clip'
import { Link } from 'react-router'

// MOVE COMPONENTS FROM SEARCH.JS TO THIS FOLDER
// REFACTOR!!!

export const Clips = props => {
  return (
    <div className="row matching-clips-container">
      <h5><Link to={'text/' + props.id}>{props.name}</Link> by {props.speakers}</h5>
      <ul className="search-clips-list">

        {
          props.clips.map((clip, i) => {
            return( <Clip clip={clip}
                          broad={clip.Broad}
                          spanish={clip.Spanish}
                          english={clip.English}
                          newOrtho={clip.NewOrtho}
                          uttGloss={clip.Uttgloss}
                          searched={props.searched}
                          searchQuery={props.searchQuery}
                          audio = {clip.ClipRecordingPath}
                          line={i+1}
                          key={i} />)
          })
        }
      </ul>
    </div>
  )
}
