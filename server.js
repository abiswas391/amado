const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(
  'mongodb://127.0.0.1:27017/',
  {
    // dbName: 'event_db',
    dbName: 'amado',
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => (err ? console.log(err) : console.log('Connected to database..'))
);

const app = require('./app');

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App is running on port number ${port}`);
});
