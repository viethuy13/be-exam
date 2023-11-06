'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const role = ['Admin', 'User']
        return queryInterface.bulkInsert(
            'roles',
            role.map((value, index) => {
                return {
                    role: value,
                }
            }),
        )
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', null, {})
    },
}
