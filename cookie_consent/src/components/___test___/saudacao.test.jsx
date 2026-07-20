import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import {describe, test, expect,  beforeEach} from 'vitest';
import Saudacao from '../saudacao';

 describe('Componente Saudacao', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  test('deve renderizar mensagem de bem vindo, quando o localStorage rentornar nulo', async () => {
    render(<Saudacao />);
    expect(screen.getByText(/Bem-vindo! É sua primeira vez aqui./i)).toBeInTheDocument();
  });

  test('deve renderizar mensagem de bem vindo de volta, quando o localStorage retornar aceito', async () => {
    window.localStorage.setItem('user-consent','accepted');
    render(<Saudacao />);
    expect(await screen.findByText(/bem-vindo de volta!/i)).toBeInTheDocument();
  });

  test('deve sumir a saudação quando o botão de fechar for clicado', async () => {
    render(<Saudacao />);

    const botaoFechar = await screen.findByRole('button', {name: /fechar/i});
    fireEvent.click(botaoFechar);

    expect(screen.queryByText(/bem-vindo! é sua primeira vez aqui./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bem-vindo de volta!/i)).not.toBeInTheDocument();
  });

});
