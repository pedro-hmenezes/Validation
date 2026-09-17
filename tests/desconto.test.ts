import {
  calcularDesconto,
  calcularValorFinal,
} from '../src/desconto';

describe('Desconto (RN03)', () => {
  describe('calcularDesconto', () => {
    it('não deve aplicar desconto para subtotal abaixo de R$ 100,00', () => {
      expect(calcularDesconto(99.99)).toBe(0);
    });

    it('não deve aplicar desconto para subtotal exatamente igual a R$ 100,00', () => {
      expect(calcularDesconto(100)).toBe(0);
    });

    it('deve aplicar 10% de desconto para subtotal acima de R$ 100,00', () => {
      expect(calcularDesconto(120)).toBe(12);
    });

    it('deve aplicar desconto para um subtotal imediatamente acima de R$ 100,00', () => {
      expect(calcularDesconto(100.01)).toBeCloseTo(10.001, 3);
    });
  });

  describe('calcularValorFinal', () => {
    it('deve manter o valor final quando não há desconto', () => {
      expect(calcularValorFinal(100)).toBe(100);
    });

    it('deve calcular o valor final após desconto de 10%', () => {
      expect(calcularValorFinal(120)).toBe(108);
    });

    it('deve calcular valor final com subtotal decimal', () => {
      expect(calcularValorFinal(159.9)).toBeCloseTo(143.91, 2);
    });
  });
});