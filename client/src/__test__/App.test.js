import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App.jsx';

test('renders app', () => {
  render(<App />);
  const appDiv = screen.getByTestId('testApp');
  expect(appDiv).toBeTruthy();
});
