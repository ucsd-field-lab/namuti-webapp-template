import React, { Component } from 'react'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { axiosInstance } from '../../shared/axios-config'

import CopyToClipboard from 'react-copy-to-clipboard'

export class Linker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clips: [],
            selectedClip: "",
            fullLink: "",
            copied: false,
        }
    }

    componentWillMount() {

        axiosInstance.get('/api/link-generator-data')
        .then((response) => {
          let data = response.data.data
          this.setState({clips: data["clips"]})
        })
        .then((err) => {
          return err
        })


    }

    updateLink(val) {
        this.setState({selectedClip: val["value"]}, () => {
            this.setState({fullLink: "http://nameforyourprojectbackend.ucsd.edu/#/text/" + this.state.selectedClip.substr(0,this.state.selectedClip.indexOf('[')) + "/citation/" + this.state.selectedClip})
        })
        this.setState({copied: false})
    }

    copyLink() {
        this.setState({copied: true})
    }

    render() {
        if (this.state.clips.length > 0) {
            return (
                <div className="row">
                    <div>
                        <h2>Clip Link Generator</h2>
                        <Select
                          name="clip-selector"
                          placeholder="Choose clip"
                          value={this.state.selectedClip}
                          options={this.state.clips}
                          onChange={this.updateLink.bind(this)}
                        />
                        <div>{this.state.fullLink}</div>
                        <CopyToClipboard text={this.state.fullLink}>
                            <button className="button primary" onClick={this.copyLink.bind(this)}>
                                {this.state.copied ? "Copied!" : "Copy"}
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>

            )
        } else {
            return null
        }
    }
}
