/* eslint-env jest */

import { agregarProductoAlCarrito } from "./cartUtils";

describe("agregarProductoAlCarrito", () => {
  it("debe agregar un producto nuevo al carrito", () => {
    const carritoInicial = [];
    const producto = { id: 1, nombre: "Camisa", precio: 50 };

    const carritoActualizado = agregarProductoAlCarrito(
      carritoInicial,
      producto
    );

    expect(carritoActualizado).toEqual([
      { id: 1, nombre: "Camisa", precio: 50, quanty: 1 },
    ]);
  });

  it("debe incrementar la cantidad si el producto ya existe en el carrito", () => {
    const carritoInicial = [{ id: 1, nombre: "Camisa", precio: 50, quanty: 1 }];
    const producto = { id: 1, nombre: "Camisa", precio: 50 };

    const carritoActualizado = agregarProductoAlCarrito(
      carritoInicial,
      producto
    );

    expect(carritoActualizado).toEqual([
      { id: 1, nombre: "Camisa", precio: 50, quanty: 2 },
    ]);
  });
});
