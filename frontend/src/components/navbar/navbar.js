import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


import './navbar.css';

export class Navbar extends Component {
	render () {
		return (
			<div className="top-bar">
			  <div className="top-bar-left">
			    <ul className="menu" data-dropdown-menu>
			      <li><NavLink exact to='/'>nameforyourproject</NavLink></li>
			      <li><NavLink to='/about'>About</NavLink></li>
			      <li><NavLink to='/text'>Text</NavLink></li>
			      <li><NavLink to='/search'>Search</NavLink></li>
						<li><NavLink to='/grammar'>Grammar</NavLink></li>
						<li><NavLink to='/docs'>Documentation</NavLink></li>
					</ul>
			  </div>
			  <div className="top-bar-right">
			  	<ul className="menu" data-dropdown-menu>
					</ul>
			  </div>
			</div>
		)
	}
}
