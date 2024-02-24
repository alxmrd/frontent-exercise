import React from "react";

interface CardProps {
  name: string;
  email: string;
  company: string;
}

const Card: React.FC<CardProps> = ({ name, email, company }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{company}</p>
    </div>
  );
};

export default Card;
