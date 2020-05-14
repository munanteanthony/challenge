module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      sexo: {
          type: Sequelize.STRING
      },
      celular:{
          type: Sequelize.STRING
      },
      sueldo:{
          type:Sequelize.DOUBLE
      },
      afp: {
          type: Sequelize.BOOLEAN
      },
      onp:{
          type: Sequelize.BOOLEAN
      }
    },{
        timestamps: false
    });

    return User;
  };
  