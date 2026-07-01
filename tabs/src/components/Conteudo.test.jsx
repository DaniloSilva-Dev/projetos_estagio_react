import {render, screen } from '@testing-library/react'
import Conteudo, { ABAS_DISPONIVEIS } from './Conteudo'

describe('<Conteudo />', () => {


  it('should render only known keys',  () => {
    // Arrange
    const first = ABAS_DISPONIVEIS

    // Act
    render(<Conteudo abaAtiva={first}/>)

    // Assert

    const titulo = screen.queryByText('Conteudo da Primeira Aba')
    const subtitulo = screen.queryByText('Aqui está o paragrafo da primeira aba')

    expect(titulo).not.toBeInTheDocument()
    expect(subtitulo).not.toBeInTheDocument()
  })
})
