/* eslint-disable prefer-const */
import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import attractionModel from './attraction.mjs';
import tripModel from './trip.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Attraction = attractionModel(sequelize, Sequelize.DataTypes);
db.Trip = tripModel(sequelize, Sequelize.DataTypes);

db.Attraction.belongsTo(db.Trip);
db.Trip.hasMany(db.Attraction);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
