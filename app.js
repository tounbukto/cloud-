import express from "express"
import postgres from "pg-promise"

const PORT = process.env.PORT || 3000

const app = express()
const pg = postgres()
const db = pg(process.env.DATABASE_URL || {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});
db.query('drop table if exists connexion; create table connexion(id int primary key, counter int default 0); insert into connexion values(0, 0)')
console.log('db initialized')

app.get('/', (req, res) => {
  db.query("select counter from connexion")
      .then((data) => {
          let counter = data[0].counter || 0;
          counter = counter + 1;
          db.query(`update connexion set counter=${counter} where id=0`).catch((error) => console.log('ERROR', error));
          res.send(`Hello World! x${counter}`);
      })
      .catch((error) => {
          console.log("ERROR", error);
      })
});

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))