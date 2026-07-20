import {render, screen, fireEvent} from '@testing-library/react';
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

  test('deve salvar "accepted" no localStorage e fechar o pop-up, quando o usuário clicar em aceitar', async () =>{
    render(<CookieConsent />);

    const botaoAceitar = await screen.findByRole('button', {name: /aceitar cookies!/i});
    fireEvent.click(botaoAceitar)
    ;
    expect(window.localStorage.getItem('user-consent')).toBe('accepted');
    expect(screen.queryByText(/usamos cookies para melhorar sua experiência./i)).not.toBeInTheDocument();
  });

  test('deve salvar "rejected" no localStorage e fechar o pop-up, quando o usuário clicar em rejeitar', async () => {
    render(<CookieConsent />);
    const botaoRejeitar = await screen.findByRole('button', {name: /rejeitar cookies!/i});
    fireEvent.click(botaoRejeitar);

    expect(window.localStorage.getItem('user-consent')).toBe('rejected');
    expect(screen.queryByText(/usamos cookies para melhorar sua experiência./i)).not.toBeInTheDocument();
  });

  test('não deve renderizar o pop-up de cookie consent, quando localStorage possuir uma resposta', async () => {
    window.localStorage.setItem('user-consent', 'accepted');
    render(<CookieConsent />);

    expect(screen.queryByText(/usamos cookies para melhorar sua experiência./i)).not.toBeInTheDocument();
  });

});
