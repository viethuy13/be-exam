'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Question.belongsTo(models.Exam, {
                as: 'exam',
                foreignKey: 'exam_id',
            })
            Question.hasMany(models.Answer, {
                as: 'answers',
                foreignKey: 'question_id',
            })
        }
    }
    Question.init(
        {
            exam_id: DataTypes.INTEGER,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Question',
        },
    )
    return Question
}
