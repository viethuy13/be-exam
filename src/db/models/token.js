'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Token.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
            },
            at_secret: {
                type: DataTypes.TEXT,
            },
            rt_secret: {
                type: DataTypes.TEXT,
            },
            used_token: {
                type: DataTypes.TEXT('long'),
            },
            refresh_token: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: 'Token',
        },
    )
    return Token
}
