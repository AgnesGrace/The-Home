const dotenv = require('dotenv');
const app = require('./app');
// console.log(app.get('env'));

dotenv.config({
  path: './config.env',
});
console.log(process.env);
const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port} `);
});
