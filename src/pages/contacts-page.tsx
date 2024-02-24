import React, { useEffect, useState } from "react";
import Card from "../components/card-component";
import axios from "axios";
import '../assets/styles/ContactsPage.css';

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
          company: user.company?.name
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
    <header className="contacts-page-header">Header</header>
    <main className="contacts-page-cards-container">
    {cardData.map((data, index) => (
        <div className="contacts-page-card">
        <Card key={index} name={data.name} email={data.email} company={data.company} />
        </div>
      ))}
    </main>
    <footer className="contacts-page-footer">Footer</footer>
  </div>
  );
};

export default ContactsPage;
