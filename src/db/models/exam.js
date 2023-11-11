'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Exam.hasMany(models.Question, {
                as: 'questions',
                foreignKey: 'exam_id',
            })
        }
    }
    Exam.init(
        {
            user_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            slug: DataTypes.STRING,
            subject: DataTypes.STRING,
            number_question: DataTypes.INTEGER,
            time: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Exam',
        },
    )
    return Exam
}
