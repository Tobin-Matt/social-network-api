const express = require('express');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/api/userRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));