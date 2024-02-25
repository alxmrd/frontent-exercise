import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  getByAltText,
  findByAltText,
  getByTestId,
  findAllByLabelText,
  findByTestId,
  findByRole,
  findByLabelText,
  getByRole,
} from "@testing-library/react";
import axios from "axios";
import ContactsPage from "../../pages/contacts-page";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

test("fetches data from API and renders it on mount", async () => {
  const data = {
    data: [
      {
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        company: { name: "Romaguera-Crona" },
        username: "Bret",
        website: "hildegard.org",
        phone: "1-770-736-8031 x56442",
        address: {
          city: "Gwenborough",
          street: "Kulas Light",
          suite: "Apt. 556",
        },
      },
      // Add more users as needed
    ],
  };

  mockedAxios.get.mockResolvedValue(data);

  const { findAllByText } = render(<ContactsPage />);

  // Wait for the promise to resolve
  await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
  await waitFor(() =>
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users?_start=0&_limit=6",
    ),
  );

  // Check if the data is rendered
  const nameElement = await findAllByText(/Leanne Graham/i);
  expect(nameElement[0]).toBeInTheDocument();

  const emailElement = await findAllByText(/Sincere@april.biz/i);
  expect(emailElement[0]).toBeInTheDocument();

  const companyElement = await findAllByText(/Romaguera-Crona/i);
  expect(companyElement[0]).toBeInTheDocument();
});

test("handleCardClick opens the modal", async () => {
  const { getByText, findByAltText } = render(<ContactsPage />);
  const card = await findByAltText(/supervisor-icon/i);

  fireEvent.click(card);

  const modal = getByText(/Website/i);
  expect(modal).toBeInTheDocument();
});
