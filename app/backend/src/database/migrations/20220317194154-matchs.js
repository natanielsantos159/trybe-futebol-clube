module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      home_team: {
        type: Sequelize.DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
      },
      home_team_goals: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      away_team: {
        type: Sequelize.DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
      },
      away_team_goals: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      in_progress: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs')
  }
};
