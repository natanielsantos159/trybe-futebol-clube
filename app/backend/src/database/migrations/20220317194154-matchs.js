module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
      },
      home_team: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: Clubs,
          key: 'id',
        },
      },
      home_team_goals: Sequelize.DataTypes.STRING,
      away_team: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: Clubs,
          key: 'id',
        },
      },
      in_progress: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs')
  }
};
