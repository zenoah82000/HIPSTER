import React from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function BlogSort(props) {  
  const {url} = props
  
  return (
    <>
     <ul class="nav blog-sort-nav">
        <li> 
          <NavLink activeClassName="active" className="nav-link" exact to={url}>
          全部
          </NavLink>
        </li>
        <li> 
          <NavLink activeClassName="active" className="nav-link" to={`${url}/1`}>
          心情抒發
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="nav-link"
            to={`${url}/2`}
          >
            靈感角落
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="nav-link"
            to={`${url}/3`}
          >
            重點書評
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="nav-link"
            to={`${url}/4`}
          >
            活動分享
          </NavLink>
        </li>
        <li> 
          <NavLink
            activeClassName="active"
            className="nav-link"
            to={`${url}/5`}
          >
            新人新書
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            className="nav-link"
            to={`${url}/6`}
          >
            手寫日記
          </NavLink>
        </li>
      </ul>
    </>
  )
}

export default withRouter(BlogSort)
