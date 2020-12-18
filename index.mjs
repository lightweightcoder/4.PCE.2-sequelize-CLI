import db from './models/index.mjs';

const userInput = process.argv[2];

if (userInput === 'create') {
  db.Trip
    .create({
      name: process.argv[3],
    })
    .then((trip) => {
      console.log('success creating trip!');
      console.log(trip);
    })
    .catch((error) => console.log('error creating trip!:', error));
} else if (userInput === 'add-attrac') {
  db.Trip
    .findOne({
      where: {
        name: process.argv[3],
      },
    })
    // eslint-disable-next-line arrow-body-style
    .then((returnedTrip) => {
      // Docs on .create
      // https://sequelize.org/master/class/lib/model.js~Model.html#static-method-create
      // Return statement returns the Promise returned by the final .then
      console.log('returned trip is: ', returnedTrip);
      return db.Attraction.create(
        {
          name: process.argv[4],
          // TripId: returnedTrip.dataValues.id,
        },
        {
          // Return only the id column
          returning: ['id'],
        },
        // eslint-disable-next-line arrow-body-style
      ).then((newAttraction) => {
        // Associate newAttraction with returnedTrip using the setTrip
        // method on newAttraction that Sequelize provides for us because of the
        // belongsTo association we defined in models/index.mjs.
        // eslint-disable-next-line arrow-body-style
        console.log('new attraction is:', newAttraction);
        return newAttraction.setTrip(returnedTrip).then(() => newAttraction);
      });
    }).then((result) => {
      console.log('success creating an attraction!');
      // result is newAttraction in line 43
      console.log('result.id is:', result.id);
    }).catch((error) => {
      console.log('error adding attraction!', error);
    });
} else if (userInput === 'trip') {
  db.Trip.findAll({
    where: {
      name: [process.arg[3]],
    },
  })
    .then((attractions) => console.log('attractions:', attractions[0]))
    .catch((error) => console.log('error finding attractions!', error));
}
