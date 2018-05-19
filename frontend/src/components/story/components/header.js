import React from 'react';

export const StoryLanguageHeaders = props => (
  <div className="row">
    <div className="large-4 columns">
      <h3>Clip Recordings</h3>
    </div>
    <div className="large-4 columns">
      <h3>YourLanguage</h3>
    </div>
    <div className="large-4 columns">
      <h3>Español</h3>
    </div>
  </div>
)


export const StoryHeader = props => {
  return (
    <div className="story-header">
      {props.title != null ? <h2 className="story-labels">{props.title}</h2> : <h2 className="story-labels">{props.recording}</h2> }
      <div className="story-labels">by {props.speaker}</div>
      <audio src={props.audio} controls preload></audio>
    </div>
  );
}
