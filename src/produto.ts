export class Produto {
  constructor(
    public readonly nome: string,
    public readonly preco: number
  ) {
    this.validarNome();
    this.validarPreco();
  }

  private validarNome(): void {
    if (this.nome.trim() === '') {
      throw new Error('Nome do produto não pode estar vazio.');
    }
  }

  private validarPreco(): void {
    if (this.preco < 0) {
      throw new Error('Preço do produto não pode ser negativo.');
    }
  }
}