// Завантажуємо твою лямбду
const { handler } = require("./index");

// Запускаємо, як AWS робить
(async () => {
  const response = await handler({});
  console.log("Lambda result:", response);
})();
