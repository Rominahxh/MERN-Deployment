const express = require('express');
const cors = require('cors')    
const app = express();
app.use(cors())   
const port = 8000;

app.use(express.json(), express.urlencoded({ extended: true }));
require('./routes/pirate.routes')(app);

const AllMyProductRoutes = require("./routes/pirate.routes");
AllMyProductRoutes(app);
require('./config/mongoose.config');  
require('./routes/pirate.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );
