const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "the name already exists",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "the descripcion is required",
          },
        },
      },
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        validate: {
          is: {
            args: /^([0-9])(\.[0-9]{1})?$/,
            msg: "Rating must be number or decimal",
          },
          isNumeric: true,
        },
      },
      platform: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
        validate: {
          validatePlatform(value){
            if(!value.length){
              throw new Error("should select at least one platform");
            }
          }
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
