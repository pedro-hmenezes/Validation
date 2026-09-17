import { Cliente } from './cliente';
import { Produto } from './produto';
import { calcularDesconto, calcularValorFinal } from './desconto';

export enum StatusPedido {
  CRIADO = 'CRIADO',
  EM_PREPARACAO = 'EM_PREPARACAO',
  PRONTO = 'PRONTO',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO',
}

export interface ItemPedido {
  produto: Produto;
  quantidade: number;
}

export class Pedido {
  private itens: ItemPedido[] = [];
  private status: StatusPedido = StatusPedido.CRIADO;

  constructor(public readonly cliente: Cliente) {}

  obterItens(): ItemPedido[] {
    return [...this.itens];
  }

  obterStatus(): StatusPedido {
    return this.status;
  }

  adicionarProduto(produto: Produto, quantidade: number): void {
    this.validarQuantidade(quantidade);

    this.itens.push({
      produto,
      quantidade,
    });
  }

  calcularSubtotal(): number {
    this.validarPedidoComProdutos();

    return this.itens.reduce((subtotal, item) => {
      return subtotal + item.produto.preco * item.quantidade;
    }, 0);
  }

  calcularDesconto(): number {
    const subtotal = this.calcularSubtotal();

    return calcularDesconto(subtotal);
  }

  calcularValorFinal(): number {
    const subtotal = this.calcularSubtotal();

    return calcularValorFinal(subtotal);
  }

  alterarStatus(novoStatus: StatusPedido): void {
    this.validarAlteracaoDeStatus(novoStatus);

    this.status = novoStatus;
  }

  private validarQuantidade(quantidade: number): void {
    if (quantidade < 0) {
      throw new Error('Quantidade do produto não pode ser negativa.');
    }
  }

  private validarPedidoComProdutos(): void {
    if (this.itens.length === 0) {
      throw new Error('Pedido deve possuir pelo menos um produto.');
    }
  }

  private validarAlteracaoDeStatus(novoStatus: StatusPedido): void {
    if (
      this.status === StatusPedido.ENTREGUE &&
      novoStatus === StatusPedido.CANCELADO
    ) {
      throw new Error('Pedido entregue não pode ser cancelado.');
    }

    if (
      novoStatus === StatusPedido.ENTREGUE &&
      this.status !== StatusPedido.PRONTO
    ) {
      throw new Error(
        'Pedido só pode ser marcado como ENTREGUE quando estiver PRONTO.'
      );
    }
  }
}