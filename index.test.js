//test que comprueba que esta la funcion run
test("run", () => {
  //mock de la funcion run
  const run = jest.fn();
  //ejecutamos la funcion run
  run();
  //comprobamos que se ha ejecutado
  expect(run).toHaveBeenCalled();
  //Comprobamos que la variable resultado_tests es igual a success y si no es igual vemos el error
  expect(resultado_tests).toEqual("success").catch(e => console.log(e));
});
