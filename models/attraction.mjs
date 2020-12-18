export default function attractionModel(sequelize, DataTypes) {
  return sequelize.define('Attraction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    // There is no need to specify the TripId foreign key in our model
    // because we do not need to access the foreign key from our application.
    // Sequelize uses the foreign key under the hood to get associated records.
    // Sequelize by default looks for a foreign key called TripId because of
    // belongsTo and hasMany associations defined in models/index.mjs.
  });
}
