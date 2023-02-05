const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))

app.get('/product', (req,res) => {
    res.send('Obteniendo productos')
})

app.post('/product', (req,res) => {
    res.send('creando productos')

})

app.put('/product', (req,res) => {
    res.send('actualizando productos')

})

app.delete('/product', (req,res) => {
    res.send('eliminando productos')

})

app.get('/product/:id', (req,res) => {
    res.send('obteniendo un productos')

})

app.listen(3000)
console.log(`server on port ${3000}`)