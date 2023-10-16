const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

// middleware
const corsOptions = {
  origin: 'https://mern-deploy-frontend-fjhr.onrender.com', // frontend URI (ReactJS)
};
app.use(express.json());
app.use(cors(corsOptions));

//routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
);

// connect MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     const PORT = process.env.PORT || 8000;
//     app.listen(PORT, () => {
//       console.log(`App is Listening on PORT ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
);

app.get('/', (req, res) => {
  res.status(201).json({ message: 'Connected to Backend!' });
});
const server = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

server();
