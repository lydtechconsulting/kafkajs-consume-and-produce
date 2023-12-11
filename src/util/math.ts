export const add = (...numbers: number[]) => {
  return numbers.reduce((acc, num) => acc + num, 0);
};

export const subtract = (...numbers: number[]) => {
  return numbers.reduce((acc, num) => acc - num, 0);
};

export const divide = (...numbers: number[]) => {
  if (numbers.find((x) => x === 0)) {
    throw new Error("Cannot divide by zero");
  }

  return numbers.reduce((acc, num) => acc / num, 0);
};

export const multiply = (...numbers: number[]) => {
  return numbers.reduce((acc, num) => acc * num, 0);
};
