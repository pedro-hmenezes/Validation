export function calcularDesconto(subtotal: number): number {
  if (subtotal > 100) {
    return subtotal * 0.1;
  }

  return 0;
}

export function calcularValorFinal(subtotal: number): number {
  const desconto = calcularDesconto(subtotal);

  return subtotal - desconto;
}