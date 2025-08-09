const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.json({message: "Hello API"});
});

const createRouter = require('./routes/create');
const readRouter = require('./routes/read');
const deleteRouter = require('./routes/delete');
const updateRouter = require('./routes/update');

app.use('/api/products', createRouter);
app.use('/api/products', readRouter);
app.use('/api/products', deleteRouter);
app.use('/api/products', updateRouter);


app.listen(port, ()=>{
    console.log(`http://127.0.0.1:${port} is running...`);
});