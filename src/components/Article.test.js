import React from 'react';
import { render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';
import Article from './Article';

const articleData = {
  id:"1234",
  headline:"Headline News",
  author:"Great Author",
  summary:"This is good",
  body:"Here is an article to read."
};
const noAuthorData = {
  id:"1234",
  headline:"Headline News",
  author:"",
  summary:"This is good",
  body:"Here is an article to read."
};

test('renders component without errors', ()=> {
  render(<Article article={articleData} />);
});

test('renders headline, author from the article when passed in through props', ()=> {
  render(<Article article={articleData} />);

  const headline = screen.queryByTestId(/headline/i);
  const author = screen.queryByTestId(/author/i);
  const summary = screen.queryByTestId(/summary/i);
  const body = screen.queryByTestId(/body/i);

  expect(headline).toBeTruthy();
  expect(headline).toBeInTheDocument();
  expect(author).toBeTruthy();
  expect(author).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toBeInTheDocument();
  expect(body).toBeTruthy();
  expect(body).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
  render(<Article article={noAuthorData} />);

  const author = screen.queryByTestId(/author/i);

  expect(author).toBeTruthy();
  expect(author).toHaveTextContent(/associated press/i);
});

test('executes handleDelete when the delete button is pressed', async ()=> {
  const handleDelete = jest.fn();
  render(<Article article={articleData} handleDelete={handleDelete} />);

  const button = screen.queryByTestId(/deletebutton/i);
  userEvent.click(button);

  await waitFor(() => {
    expect(handleDelete).toHaveBeenCalled();
  });
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.