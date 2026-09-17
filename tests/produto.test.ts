import { Produto } from '../src/produto';

describe('Produto (RN04)', () => {
  describe('criação de produto', () => {
    it('deve criar um produto com nome e preço válidos', () => {
      const produto = new Produto('Hambúrguer', 20);

      expect(produto.nome).toBe('Hambúrguer');
      expect(produto.preco).toBe(20);
    });

    it('deve aceitar produto com preço igual a zero', () => {
      const produto = new Produto('Produto promocional', 0);

      expect(produto.preco).toBe(0);
    });

    it('deve lançar erro quando o nome estiver vazio', () => {
      expect(() => new Produto('', 20)).toThrow(
        'Nome do produto não pode estar vazio.'
      );
    });

    it('deve lançar erro quando o nome possuir apenas espaços', () => {
      expect(() => new Produto('   ', 20)).toThrow(
        'Nome do produto não pode estar vazio.'
      );
    });

    it('deve lançar erro quando o preço for negativo', () => {
      expect(() => new Produto('Hambúrguer', -0.01)).toThrow(
        'Preço do produto não pode ser negativo.'
      );
    });
  });
});