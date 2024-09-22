const express = require('express');
const app = express();

const hospitalRoutes = require('./routes/Hospitalroutes');

app.use('/api', hospitalRoutes);

app.listen(4000, () => {
    console.log('Server running on PORT 4000');
});