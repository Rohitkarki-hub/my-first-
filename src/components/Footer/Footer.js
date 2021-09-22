
import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <div className="footer">
        
            <div className="row">
              {/*column1*/}
              <div className="col"></div>
                
                <ul className="list-unstyled">
                <h4>GamersChoice</h4>
                  <li><a href="!#">About us</a></li>
                  <li><a href="!#">News</a></li>
                  <li><a href="!#">Distribution</a></li>
                  <li><a href="!#">cookies policy</a></li>
                  <li><a href="!#">Privacy policy</a></li>
                </ul>
              {/*column2*/}
              <div className="col">
              <ul className="list-unstyled">
                <h4>Download and Support</h4>
                <li><a href="!#">Contact</a></li>
                <li><a href="!#">Download</a></li>
                <li><a href="!#">Logotype</a></li>
                </ul>
              </div>
              {/*column3*/}
              <div className="col">
              <ul className="list-unstyled">
                <h4>Socialmedia</h4>
                <li><a href="!#" >Facebook</a></li>
                <li><a href="!#">Twitter</a></li>
                <li><a href="!#">Instagram</a></li>
                <li><a href="!#">Youtube</a></li>
                </ul>
              </div>
        </div>
        
        <div className="row">
           
          <p className="col-sm"></p>
          &copy;{new Date().getFullYear()} GamerChoice.INC| All right reserved| Terms of services| privacy
        </div>
        </div>
   
  )
}
export default Footer;
