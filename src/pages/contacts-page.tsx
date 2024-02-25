import React, { useEffect, useState } from "react";
import Card from "../components/card-component";
import axios from "axios";
import "../assets/styles/ContactsPage.css";
import Modal from "../components/modal-component";
import Spinner from "../components/spinner";

interface CardData {
  name: string;
  email: string;
  company: string;
  address: string;
  username: string;
  website: string;
  phone: string;
  addressCity: string;
  addressStreet: string;
  addressSuite: string;
}

const ContactsPage: React.FC = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users?_start=0&_limit=6")
      .then((response) => {
        const data = response.data.map((user: any) => ({
          name: user.name,
          email: user.email,
          company: user.company?.name,
          username: user.username,
          website: user.website,
          phone: user.phone,
          addressCity: user.address?.city,
          addressStreet: user.address?.street,
          addressSuite: user.address?.suite,
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
      })
      .finally(() => {
        setIsLoading(false);
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
      {isLoading ? (
        <Spinner />
      ) : (
        <main className="contacts-page-cards-container">
          {cardData.map((data, index) => (
            <div className="contacts-page-card" key={index}>
              <Card
                name={data.name}
                email={data.email}
                company={data.company}
                onIconClick={() => handleCardClick(index)}
              />
            </div>
          ))}
          {isModalOpen && selectedCardIndex !== null && (
            <Modal
              name={cardData[selectedCardIndex].name}
              email={cardData[selectedCardIndex].email}
              company={cardData[selectedCardIndex].company}
              username={cardData[selectedCardIndex].username}
              website={cardData[selectedCardIndex].website}
              phone={cardData[selectedCardIndex].phone}
              addressCity={cardData[selectedCardIndex].addressCity}
              addressStreet={cardData[selectedCardIndex].addressStreet}
              addressSuite={cardData[selectedCardIndex].addressSuite}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          )}
        </main>
      )}

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
