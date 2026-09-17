# Sistema de Controle de Pedidos de Lanchonete

Projeto desenvolvido em TypeScript com Jest para aplicar conceitos de testes unitários, validação de regras de negócio e orientação a objetos.

O sistema permite cadastrar clientes, criar pedidos, adicionar produtos, calcular valores, aplicar desconto e controlar o status de cada pedido.

## Tecnologias

- TypeScript
- Node.js
- Jest
- ts-jest

## Estrutura do projeto

```text
projeto-testes-lanchonete/
├── src/
│   ├── cliente.ts
│   ├── produto.ts
│   ├── pedido.ts
│   └── desconto.ts
│
├── tests/
│   ├── cliente.test.ts
│   ├── produto.test.ts
│   ├── pedido.test.ts
│   └── desconto.test.ts
│
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Produtos disponíveis

| Produto | Preço |
|---|---:|
| Hambúrguer | R$ 20,00 |
| Batata | R$ 10,00 |
| Refrigerante | R$ 7,00 |
| Sobremesa | R$ 8,00 |

## Regras de negócio

| Código | Regra | Implementação |
|---|---|---|
| RN01 | Cliente deve possuir nome não vazio e com ao menos 3 caracteres | `Cliente` valida o nome no construtor |
| RN02 | Pedido deve possuir pelo menos um produto | O cálculo de subtotal, desconto e valor final é bloqueado para pedidos vazios |
| RN03 | Subtotal acima de R$ 100,00 recebe 10% de desconto | Funções em `desconto.ts` |
| RN04 | Preço e quantidade não podem ser negativos | Validações em `Produto` e `Pedido` |
| RN05 | Status permitidos: CRIADO, EM_PREPARACAO, PRONTO, ENTREGUE e CANCELADO | Enum `StatusPedido` |
| RN06 | Pedido entregue não pode ser cancelado | Validação em `alterarStatus()` |
| RN07 | Pedido só pode ser entregue se estiver pronto | Validação em `alterarStatus()` |

## Como executar

Instale as dependências:

```bash
npm install
```

Execute os testes:

```bash
npm test
```

Execute os testes com relatório de cobertura:

```bash
npm run test:coverage
```

## Cenário de exemplo

```ts
const cliente = new Cliente('Maria');
const hamburguer = new Produto('Hambúrguer', 20);
const batata = new Produto('Batata', 10);

const pedido = new Pedido(cliente);

pedido.adicionarProduto(hamburguer, 5);
pedido.adicionarProduto(batata, 1);

console.log(pedido.calcularSubtotal());
// 110

console.log(pedido.calcularDesconto());
// 11

console.log(pedido.calcularValorFinal());
// 99

pedido.alterarStatus(StatusPedido.PRONTO);
pedido.alterarStatus(StatusPedido.ENTREGUE);

console.log(pedido.obterStatus());
// ENTREGUE
```

## Testes

O projeto possui testes para cenários válidos, cenários inválidos e valores de fronteira, incluindo:

- Cliente com nome válido, vazio, com espaços e menor que três caracteres.
- Produtos com preço válido, zero e negativo.
- Itens com quantidade válida, zero e negativa.
- Pedido sem itens e com múltiplos produtos.
- Desconto abaixo, exatamente e acima de R$ 100,00.
- Cálculos com números decimais.
- Alterações válidas e inválidas de status.
- Bloqueio de cancelamento de pedido entregue.
- Bloqueio de entrega sem status PRONTO.