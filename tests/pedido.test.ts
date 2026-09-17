import { Cliente } from '../src/cliente';
import { Pedido, StatusPedido } from '../src/pedido';
import { Produto } from '../src/produto';

describe('Pedido (RN02)', () => {
  const cliente = new Cliente('Maria');
  const hamburguer = new Produto('Hambúrguer', 20);

  it('deve criar um pedido sem produtos inicialmente', () => {
    const pedido = new Pedido(cliente);

    expect(pedido.obterItens()).toHaveLength(0);
  });

  it('deve adicionar um produto com quantidade válida', () => {
    const pedido = new Pedido(cliente);

    pedido.adicionarProduto(hamburguer, 2);

    expect(pedido.obterItens()).toHaveLength(1);
    expect(pedido.obterItens()[0].produto.nome).toBe('Hambúrguer');
    expect(pedido.obterItens()[0].quantidade).toBe(2);
  });

  it('deve aceitar produto com quantidade igual a zero', () => {
    const pedido = new Pedido(cliente);

    pedido.adicionarProduto(hamburguer, 0);

    expect(pedido.obterItens()[0].quantidade).toBe(0);
  });

  it('não deve permitir que alterações externas modifiquem os itens do pedido', () => {
    const pedido = new Pedido(cliente);

    pedido.adicionarProduto(hamburguer, 1);

    const itensExternos = pedido.obterItens();
    itensExternos.push({
      produto: new Produto('Produto externo', 10),
      quantidade: 1,
    });

    expect(pedido.obterItens()).toHaveLength(1);
  });

  it('deve calcular o subtotal de um pedido com um produto', () => {
    const pedido = new Pedido(cliente);

    pedido.adicionarProduto(hamburguer, 2);

    expect(pedido.calcularSubtotal()).toBe(40);
  });

  it('deve calcular o subtotal de um pedido com vários produtos', () => {
    const pedido = new Pedido(cliente);
    const batata = new Produto('Batata', 10);
    const refrigerante = new Produto('Refrigerante', 7);

    pedido.adicionarProduto(hamburguer, 2);
    pedido.adicionarProduto(batata, 1);
    pedido.adicionarProduto(refrigerante, 2);

    expect(pedido.calcularSubtotal()).toBe(64);
  });

  it('deve lançar erro ao calcular subtotal de pedido sem produtos', () => {
    const pedido = new Pedido(cliente);

    expect(() => pedido.calcularSubtotal()).toThrow(
      'Pedido deve possuir pelo menos um produto.'
    );
  });

  it('deve calcular corretamente subtotal com valores decimais', () => {
    const pedido = new Pedido(cliente);
    const produtoDecimal = new Produto('Produto decimal', 9.99);

    pedido.adicionarProduto(produtoDecimal, 3);

    expect(pedido.calcularSubtotal()).toBeCloseTo(29.97, 2);
  });
});

describe('Pedido (RN03)', () => {
  const cliente = new Cliente('Maria');

  it('não deve aplicar desconto quando o subtotal for exatamente R$ 100,00', () => {
    const pedido = new Pedido(cliente);
    const produto = new Produto('Combo', 100);

    pedido.adicionarProduto(produto, 1);

    expect(pedido.calcularDesconto()).toBe(0);
    expect(pedido.calcularValorFinal()).toBe(100);
  });

  it('deve aplicar 10% de desconto quando o subtotal for acima de R$ 100,00', () => {
    const pedido = new Pedido(cliente);
    const produto = new Produto('Combo', 120);

    pedido.adicionarProduto(produto, 1);

    expect(pedido.calcularDesconto()).toBe(12);
    expect(pedido.calcularValorFinal()).toBe(108);
  });

  it('deve calcular desconto com vários produtos', () => {
    const pedido = new Pedido(cliente);
    const batata = new Produto('Batata', 10);
    const refrigerante = new Produto('Refrigerante', 7);
    const hamburguer = new Produto('Hambúrguer', 20);

    pedido.adicionarProduto(hamburguer, 5);
    pedido.adicionarProduto(batata, 1);
    pedido.adicionarProduto(refrigerante, 1);

    expect(pedido.calcularSubtotal()).toBe(117);
    expect(pedido.calcularDesconto()).toBeCloseTo(11.7, 2);
    expect(pedido.calcularValorFinal()).toBeCloseTo(105.3, 2);
  });

  it('deve impedir cálculo de desconto para pedido sem produtos', () => {
    const pedido = new Pedido(cliente);

    expect(() => pedido.calcularDesconto()).toThrow(
      'Pedido deve possuir pelo menos um produto.'
    );
  });

  it('deve impedir cálculo do valor final para pedido sem produtos', () => {
    const pedido = new Pedido(cliente);

    expect(() => pedido.calcularValorFinal()).toThrow(
      'Pedido deve possuir pelo menos um produto.'
    );
  });
});

describe('Pedido (RN04)', () => {
  const cliente = new Cliente('Maria');
  const hamburguer = new Produto('Hambúrguer', 20);

  it('deve lançar erro ao adicionar produto com quantidade negativa', () => {
    const pedido = new Pedido(cliente);

    expect(() => pedido.adicionarProduto(hamburguer, -1)).toThrow(
      'Quantidade do produto não pode ser negativa.'
    );
  });

  it('não deve adicionar o item quando a quantidade for negativa', () => {
    const pedido = new Pedido(cliente);

    expect(() => pedido.adicionarProduto(hamburguer, -3)).toThrow(
      'Quantidade do produto não pode ser negativa.'
    );

    expect(pedido.obterItens()).toHaveLength(0);
  });
});

describe('Pedido (RN05, RN06 e RN07)', () => {
  const cliente = new Cliente('Maria');

  it('deve iniciar o pedido com status CRIADO', () => {
    const pedido = new Pedido(cliente);

    expect(pedido.obterStatus()).toBe(StatusPedido.CRIADO);
  });

  it('deve permitir alterar o status para EM_PREPARACAO', () => {
    const pedido = new Pedido(cliente);

    pedido.alterarStatus(StatusPedido.EM_PREPARACAO);

    expect(pedido.obterStatus()).toBe(StatusPedido.EM_PREPARACAO);
  });

  it('deve permitir alterar o status para PRONTO', () => {
    const pedido = new Pedido(cliente);

    pedido.alterarStatus(StatusPedido.PRONTO);

    expect(pedido.obterStatus()).toBe(StatusPedido.PRONTO);
  });

  it('deve permitir marcar um pedido PRONTO como ENTREGUE', () => {
    const pedido = new Pedido(cliente);

    pedido.alterarStatus(StatusPedido.PRONTO);
    pedido.alterarStatus(StatusPedido.ENTREGUE);

    expect(pedido.obterStatus()).toBe(StatusPedido.ENTREGUE);
  });

  it('não deve permitir marcar como ENTREGUE um pedido que não está PRONTO', () => {
    const pedido = new Pedido(cliente);

    expect(() => pedido.alterarStatus(StatusPedido.ENTREGUE)).toThrow(
      'Pedido só pode ser marcado como ENTREGUE quando estiver PRONTO.'
    );

    expect(pedido.obterStatus()).toBe(StatusPedido.CRIADO);
  });

  it('não deve permitir cancelar um pedido ENTREGUE', () => {
    const pedido = new Pedido(cliente);

    pedido.alterarStatus(StatusPedido.PRONTO);
    pedido.alterarStatus(StatusPedido.ENTREGUE);

    expect(() => pedido.alterarStatus(StatusPedido.CANCELADO)).toThrow(
      'Pedido entregue não pode ser cancelado.'
    );

    expect(pedido.obterStatus()).toBe(StatusPedido.ENTREGUE);
  });

  it('deve permitir cancelar um pedido que ainda não foi entregue', () => {
    const pedido = new Pedido(cliente);

    pedido.alterarStatus(StatusPedido.CANCELADO);

    expect(pedido.obterStatus()).toBe(StatusPedido.CANCELADO);
  });
});