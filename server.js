const express = require('express');
const cors = require('cors');
const app = express();


global.__basedir = __dirname ;

var corsOptions = {
    origin : "http://localhost:8899"
}


app.use(cors(corsOptions));

//Init Routes

const initRoutes = require('./routes');


app.use(express.json({extended : true}));

initRoutes(app);

app.get('/' , (req , res) => res.send('API running....'));

app.listen(process.env.PORT || 8899 , () => console.log('Server running....'));
