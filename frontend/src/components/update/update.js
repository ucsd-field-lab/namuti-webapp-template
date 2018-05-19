import React, { Component } from 'react'
import { connect } from 'react-redux'
// import update.css
// import Dropzone from 'react-dropzone'

import { axiosInstance } from '../../shared/axios-config'


// Admin dashboard
// 
// 
// Link to Linker

export class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
      'data': null
    }
  }
  
  handleFileUpload = (event) => {
    console.log(event.target.files[0])

    let data = new FormData()
    data.append('foo', 'bar')
    data.append('csv_file', event.target.files[0])
    this.setState({
      'data': data
    })

  }

  uploadFile = () => {
    axiosInstance.post('/api/update', this.state.data)
      .then((res) => {
        alert('successful update')
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

	render() {
       return (
        <div>
          <h3>Update database</h3>
          <input type="file" onChange={this.handleFileUpload} />
          <button className="button" onClick={this.uploadFile}>Upload</button>
        </div>
       )
    }

}


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)