# Projeto de Testes - Controle de Pedidos de Lanchonete

Este projeto implementa um sistema simples para controle de pedidos de uma lanchonete, com foco em **testes unitarios** usando **TypeScript** e **Jest**.

## Regras de Negócio

- **RN01 — Cliente**: Nome não pode estar vazio e deve ter pelo menos 3 caracteres.
- **RN02 — Pedido**: Um pedido precisa ter pelo menos um produto.
- **RN03 — Desconto**: Pedidos acima de R$ 100,00 recebem 10% de desconto.
- **RN04 — Valor negativo**: Sistema não aceita preço ou quantidade menor que zero.
- **RN05 — Status**: CRIADO, EM_PREPARACAO, PRONTO, ENTREGUE, CANCELADO.
- **RN06 — Cancelamento**: Pedido entregue não pode ser cancelado.
- **RN07 — Pedido pronto**: Só pode marcar como ENTREGUE depois de PRONTO.

## Estrutura do Projeto

```
projeto-testes/
├── src/
│   ├── cliente.ts
│   ├── produto.ts
│   ├── pedido.ts
│   └── desconto.ts
├── tests/
│   ├── cliente.test.ts
│   ├── produto.test.ts
│   ├── pedido.test.ts
│   └── desconto.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Como Rodar

1. Instale as dependencias:
   ```bash
   npm install
   ```

2. Execute os testes:
   ```bash
   npm test
   ```

## Produtos Disponiveis

| Produto      | Preço  |
|--------------|--------|
| Hamburgher   | R$ 20  |
| Batata       | R$ 10  |
| Refrigerante | R$ 7   |
| Sobremesa    | R$ 8   |
