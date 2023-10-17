const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://michaelberckart:P3qdJJn14DiZtro8@michael.nm1pxsl.mongodb.net.mongodb.net/my_db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));