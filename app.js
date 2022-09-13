import express from 'express'

const PORT = 3000;

let app = express();

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => console.log(`server start at port : ${PORT}`));