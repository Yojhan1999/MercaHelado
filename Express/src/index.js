const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;


app.use("/usuarios", require('./routes/usuarios'));
app.use("/empleado", require('./routes/empleado'));
app.use("/administrador", require('./routes/administrador'));


app.listen(PORT, () => {
    console.log("localhost:" + PORT);
});
