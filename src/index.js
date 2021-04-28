require('dotenv').config();
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

app.use(BodyParser.json());

require('./socket')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

(async () => {
  await Mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  http.listen(8000);
})();
