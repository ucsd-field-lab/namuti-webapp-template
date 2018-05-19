import React from 'react'
import './loadingSpinner.css'

export const LoadingSpinner = (props) => (
  <div className="row" id="loading-container">
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div>
  </div>
);
