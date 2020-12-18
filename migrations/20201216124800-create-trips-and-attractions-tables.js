module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Categories needs to be created first because Items references Categories
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('Attractions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // By convention, foreign keys in Sequelize are in UpperCamelCase
      TripId: {
        type: Sequelize.INTEGER,
        // This links the TripId column to the id column in the Trips table
        references: {
          model: 'Trips',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Items table needs to be dropped first because Items references Categories
    await queryInterface.dropTable('Attractions');
    await queryInterface.dropTable('Trips');
  },
};
