import React from "react";
import "../assets/styles/ContactCard.css";
import icon from "../assets/images/icon-supervisor.svg"

interface CardProps {
  name: string;
  email: string;
  company: string;
}

const Card: React.FC<CardProps> = ({ name, email, company }) => {
  return (
    <div className="card">
      <div>
      <div className="card-title">{name}</div>
      <div className="card-description-container">
      <div className="card-description"> Company:  <span className="card-description--value">{email}</span> </div>
      <div className="card-description">E-mail: <span className="card-description--value">{company}</span>  </div>
      </div>
      </div>
      <div className="card-description-icon"><img alt="supervisor-icon" src={icon}></img></div>
    </div>
  );
};

export default Card;
