// Card.js

import React from 'react';
import Logo from '../../assets/images/creditcard_logo.svg';
import Contactless from '../../assets/images/creditcard_contactless.svg';
import './style.css'

const Card = () => (
  <div className="card">
    <div className="card-inner">
      <div className="card-front">
        <div className="card-bg"></div>
        <div className="card-glow"></div>
        <img src={Logo} alt="Logo" className="logo" />
        <div className="card-contactless">
          <img src={Contactless} alt="Contactless" />
        </div>
        <div className="card-chip"></div>
        <div className="card-holder">Rafael Echart</div>
        <div className="card-number">**** **** **** 1234</div>
        <div className="card-valid">12/24</div>
      </div>
    
    </div>
  </div>
);

export default Card;
