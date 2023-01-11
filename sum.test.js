const sum = require("./sum");

let test = test("adds 1 + 2 to equal 3", () => {
 let expect= expect(sum(1, 2)).toBe(3);
});
