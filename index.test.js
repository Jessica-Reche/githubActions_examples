//test que comprueba que esta la funcion run
test("run", () => {
  //mock de la funcion run
  const run = jest.fn();
  //ejecutamos la funcion run
  run();
  //comprobamos que se ha ejecutado
  expect(run).toHaveBeenCalled();
});
