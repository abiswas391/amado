const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// mongoose.connect(
//   'mongodb://127.0.0.1:27017/',
//   {
//     // dbName: 'event_db',
//     dbName: 'amado',
//     useNewUrlParser: true,
//     useFindAndModify: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//   },
//   (err) => (err ? console.log(err) : console.log('Connected to database..'))
// );

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successfull..');
  });

const app = require('./app');

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App is running on port number ${port}`);
});
