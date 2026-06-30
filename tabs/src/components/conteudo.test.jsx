import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import Conteudo from './Conteudo'

describe('Componentes Abas', () =>{
  test('deve renderizar o conteudo da primeira aba por padrão', () =>{
    render(<Conteudo abaAtiva={"qualquer"}/>);

    expect(screen.getByText('Conteudo da Primeira Aba')).toBeInTheDocument();
    expect(screen.getByText('Aqui está o paragrafo da primeira aba')).toBeInTheDocument();
  });

  test('deve renderizar o conteúdo exato da aba selecionada', () => {
    render(<Conteudo abaAtiva={"quarta"} />);

    expect(screen.getByRole('heading', {name: /Conteudo da Quarta Aba/i})).toBeInTheDocument();
    expect(screen.getByText(/Aqui está o paragrafo da quarta aba/i)).toBeInTheDocument();
  });

});
