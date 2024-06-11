// Card.js

import React, { useState } from "react";
import Visa from "../../assets/images/visa_logo.svg";
import AmericanExpress from "../../assets/images/american_express_logo.svg";
import Discover from "../../assets/images/discover_logo.svg";
import Mastercard from "../../assets/images/mastercard_logo.svg";
import Contactless from "../../assets/images/creditcard_contactless.svg";
import { Button } from "@mui/material";
import { getIssuer } from "../../helpers/getIssuer";
import "./style.css";

const Card = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [issuer, setIssuer] = useState("");

  const formatCardNumber = (e) => {
    let cardNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space every 4 digits
    setCardNumber(cardNumber);
  };

  const handleCheckIssuer = () => {
    const issuerName = getIssuer(cardNumber);
    setIssuer(issuerName);
    alert(`Issuer: ${issuerName}`); // Display issuer, can be replaced with a more sophisticated display method
  };

  return (
    <>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <div className="card-bg"></div>
            {(issuer === "Unknown" || issuer === "") && null}
            {issuer === "VISA" && (
              <img src={Visa} alt="Visa" className="logo-visa" />
            )}
            {issuer === "Mastercard" && (
            <img src={Mastercard} alt="Mastercard" className="logo-master" width={70} />
            )}
            {issuer === "Discover" && (
            <img src={Discover} alt="Discover" className="logo-discovery" width={70}/>
            )}
            {issuer === "AMEX" && (
            <img src={AmericanExpress} alt="AMEX" className="logo-amex" width={70} />
            )}


            <div className="card-contactless">
              <img src={Contactless} alt="Contactless" />
            </div>
            <div className="card-chip"></div>
            <div className="card-holder">Rafael Echart</div>
            <div className="card-number">**** **** **** ****</div>
            <div className="card-valid">12/24</div>
          </div>
        </div>
      </div>
      <div class="form-container">
        <div class="field-container">
          <input
            class="input-container"
            id="cardnumber"
            type="text"
            pattern="[0-9]*"
            inputmode="numeric"
            onInput={formatCardNumber}
            value={cardNumber}
            maxLength={19}
          />
        </div>
      </div>

      <Button variant="contained" onClick={handleCheckIssuer}>
        Verificar Emisor
      </Button>
    </>
  );
};

export default Card;
