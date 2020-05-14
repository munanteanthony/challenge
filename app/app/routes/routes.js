module.exports = (app) => {
  const users = require("../controllers/controllers.js");

  var router = require("express").Router();

  // Crear un nuevo Usuario
  router.post("/users", users.create);

  // Obtener todos los usuarios
  router.get("/users", users.findAll);

  // Actualizar usuario por id
  router.put("/users/:id", users.update);

  // Eliminar usuario por id
  router.delete("/users/:id", users.delete);

  // Obtener usuario por id
  router.get("/users/:id", users.findOne);

  app.use(router);
};
