'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Answer.belongsTo(models.Question, {
                as: 'question',
                foreignKey: 'question_id',
            })
        }
    }
    Answer.init(
        {
            question_id: {
                type: DataTypes.INTEGER,
            },
            content: {
                type: DataTypes.TEXT,
            },
            is_true: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'Answer',
        },
    )
    return Answer
}
