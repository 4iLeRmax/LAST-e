import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { config } from './routes/Routes'; // Import your config appropriately
import App from './App'; // Update the import path accordingly

// Mock Header and Footer components
jest.mock('./components/Header/Header', () => () => <div data-testid="header" />);
jest.mock('./components/Footer/Footer', () => () => <div data-testid="footer" />);

describe('App', () => {
  test('renders header and footer', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const header = screen.getByTestId('header');
    const footer = screen.getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  test('renders routes based on config', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if each route defined in the config renders properly
    config.forEach((c, index) => {
      const routeElement = screen.getByTestId(`route-${index}`);
      expect(routeElement).toBeInTheDocument();
    });
  });
});
