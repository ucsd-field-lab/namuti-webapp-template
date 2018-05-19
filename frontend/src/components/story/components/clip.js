import React from        'react'
import Scroll from 'react-scroll'

let Element   = Scroll.Element

export const ClipContainer = props => {
  let clips = props.story.Clips.map(function(clip, i) {
    return(
        <div className="row" key={i}>
            <Element data-clip-tracker={clip.ClipFilename}>
            <div className="large-1 columns">
              ({i+1})
            </div>
            <div className="large-6 columns">
                {
                    props['community-view'] ?
                    <CommunityTextContainer
                      clip={clip}
                      targetClip={props.targetClip}
                    /> :
                  <GlossTextContainer
                    clip={clip}
                    targetClip={props.targetClip}
                    />
                }
          </div>
          <div className="large-5 columns">
            <audio src={clip.ClipRecordingPath} controls></audio>
          </div>
      </Element>
      </div>
    )
  })
  return (<div>{clips}</div>)
}


export const CommunityTextContainer = props => {
    let clip = props.clip
  return (
    <div className={ props.targetClip === clip.ClipFilename ? "target-clip text-component" : "text-component" } id={clip.ClipFilename}>
        <div className="language-new-ortho">{clip.NewOrtho}</div>
        <div className="language-spanish">{clip.Spanish}</div>
        <div className="citation">{clip.ClipFilename}</div>
    </div>
  );
}


export const GlossTextContainer = props => {
    let clip = props.clip
  return (
    <Element className={ props.targetClip === clip.ClipFilename ? "target-clip text-component" : "text-component" } id={clip.ClipFilename}>
      <div className="language-new-ortho">{clip.NewOrtho}</div>
      <div className="language-broad">{clip.Broad}</div>
      <div className="language-uttgloss">{clip.UttGloss}</div>
      <div className="language-spanish">{clip.Spanish}</div>
      <div className="language-english">{clip.English}</div>
      <div className="citation">{clip.ClipFilename}</div>
    </Element>
  );
}
