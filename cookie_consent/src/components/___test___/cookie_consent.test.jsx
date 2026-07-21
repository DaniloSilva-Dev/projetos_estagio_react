import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {describe, test, expect, beforeEach} from 'vitest';
import CookieConsent from '../cookie_consent'

describe('Component cookie consent', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('deve renderizar o pop-up de cookie consent, quando localStorage retornar nulo', async () => {
    render(<CookieConsent />);

    expect(await screen.findByText(/usamos cookies para melhorar sua experiência./i)).toBeInTheDocument();
  });

  test('não deve renderizar o pop-up de cookie consent, quando localStorage retornar true', async () =>{
    window.localStorage.setItem('user-consent', 'accepted');

    render(<CookieConsent />);
    expect(await screen.queryByText(/usamos cookies para melhorar sua experiência./i)).not.toBeInTheDocument();
  });

});
