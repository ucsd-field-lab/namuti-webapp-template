import React from 'react'
import { Link } from 'react-router-dom'

export const TextBySpeakers = props => {
    
    return (
        <div className="row">
            <div>{props.stories[0]['contributor']}</div>
            <ul className="speaker-texts">
                {
                    props.stories.map(function(story, i) {
                        let storyId = story["recording_filename"].substr(0, story["recording_filename"].indexOf('.'))
                        return(<TextBySpeaker filename={story['recording_filename']} data={story} title={story['story_name']} id={storyId} key={i} />);
                    })
                }
            </ul>
        </div>
    )
}

export const TextBySpeaker = props => {
    return (
        <li value={props.filename}>
            {props.title !== "" &&
            <Link to={'text/' + props.id}><span className="recording-labels">{props.title}</span></Link>
            }
            { props.title == null ?
        <Link to={'text/' + props.id}>
            <span className="text-filename">{props.filename}</span>
        </Link> : <span> ({props.filename})</span> }

        </li>
    )
}

export const TextByTitles = props => {
    return (<ul className="recording-list">{props.texts}</ul>)
}

export const TextByTitle = props => {
    return (
        <li value={props.filename}>
            { props.title !== null ?
        <div>
            <Link to={'text/' + props.id}>
            <span className="text-filename">{props.title}</span>
            </Link>
            <span className="recording-labels"> by {props.speaker}</span>
            <span> ({props.filename})</span>
        </div> :

        <div>
            <Link to={'text/' + props.id}>
            <span className="text-filename"> {props.filename} </span>
            </Link> by
            <span className="recording-labels"> {props.speaker}</span>
        </div>
        }
        </li>)
}