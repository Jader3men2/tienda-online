/* eslint-env jest */

export const agregarProductoAlCarrito = (prevCart, product) => {
  const existingProduct = prevCart.find((item) => item.id === product.id);
  if (existingProduct) {
    return prevCart.map((item) =>
      item.id === product.id ? { ...item, quanty: item.quanty + 1 } : item
    );
  } else {
    return [...prevCart, { ...product, quanty: 1 }];
  }
};
