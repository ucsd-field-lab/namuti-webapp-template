import React from 'react'

export const StoryView = props => (
  <div className="row">
    <div className="large-4 columns">
      <audio src={props.audio} controls preload></audio>
    </div>
    <div className="large-4 columns">
      <div className={props.story ? null : "language-new-ortho" }>{props.newOrtho}</div>
    </div>
    <div className="large-4 columns">
      <div className="language-spanish">{props.spanish}</div>
    </div>
  </div>
)


export const StoryV = props => {
  let clips = props.story.Clips.map(function(clip, i) {
      // let audio = props.path + "clips/" + clip.File
      return(
        <StoryView newOrtho={clip.NewOrtho}
                   spanish = {clip.Spanish}
                   audio = {clip.ClipRecordingPath}
                   story = {true}
                   key={i} />
      )
  });
  return (<div>{clips}</div>)
}
