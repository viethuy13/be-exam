'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tokens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            at_secret: {
                type: Sequelize.TEXT,
            },
            rt_secret: {
                type: Sequelize.TEXT,
            },
            used_token: {
                type: Sequelize.TEXT('long'),
            },
            refresh_token: {
                type: Sequelize.TEXT,
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tokens')
    },
}
