import {soma} from './soma'

describe('soma', () => {
  beforeAll(() => {})

  beforeEach(() => {})

  afterEach(() => {})

  afterAll(() => {})

  test('deve somar corretamente', () => {
    // Arrange -> preparar/planejar
    const primeiro = 5
    const segundo = 10
    const resultadoExperado = 15

    // Act -> agir
    const resultado = soma(primeiro, segundo)

    // Assert -> afirmar
    expect(resultado).toBe(resultadoExperado)
    expect(resultado).toBeGreaterThan(10)
  })

  // TDD - Test Driven Development
})
