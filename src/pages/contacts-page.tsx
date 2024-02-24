import React, { useEffect, useState } from "react";
import Card from "../components/card-component";
import axios from "axios";
import "../assets/styles/ContactsPage.css";

interface CardData {
  name: string;
  email: string;
  company: string;
}

const ContactsPage: React.FC = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users?_start=0&_limit=6")
      .then((response) => {
        const data = response.data.map((user: any) => ({
          name: user.name,
          email: user.email,
          company: user.company?.name,
        }));
        setCardData(data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setError("Bad Request");
              break;
            case 404:
              setError("Not Found");
              break;
            case 500:
              setError("Internal Server Error");
              break;
            default:
              setError("An error occurred");
          }
        } else if (error.request) {
          setError("No response received");
        } else {
          setError("Error setting up request");
        }
      });
  }, []);

  return (
    <div className="contacts-page-container">
      <header className="contacts-page-header">
        <div className="contacts-page-header--stack">CSS, Javascript, API</div>
        <div className="contacts-page-header--title">Contacts Application</div>
        <div className="contacts-page-header--description">
          View basic info of contacts in a 3x2 layout. Click on the magnifier
          icon to open a modal and view detailed contact info contact
        </div>
      </header>
      <main className="contacts-page-cards-container">
        {cardData.map((data, index) => (
          <div className="contacts-page-card">
            <Card
              key={index}
              name={data.name}
              email={data.email}
              company={data.company}
            />
          </div>
        ))}
      </main>
      <footer className="contacts-page-footer">
        Challenge by{" "}
        <a target="blank" href="https://www.speedcast.com/">
          Speedcast
        </a>
      </footer>
    </div>
  );
};

export default ContactsPage;
