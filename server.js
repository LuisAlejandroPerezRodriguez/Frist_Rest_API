const express = require('express');
const morgan = require('morgan');

const app = express();
let products = [ //Para poder guardar los productos tengo que hacer uso de un archivo o una base de datos
    {
        id: 1,
        name: "Monitor",
        price: 300
    }
]

app.use(morgan('dev'))
app.use(express.json())

app.get('/product', (req,res) => {
    res.json(products)
})

app.post('/product', (req,res) => {
    const newProduct = {... req.body, id: products.length + 1}
    products.push(newProduct)
    res.send(newProduct)

})

app.put('/product/:id', (req,res) => {

    const newData = req.body // Nombre nuevo o precio nuevo
    const productFound = products.find(function (product){
        return product.id == req.params.id
    })

    if (!productFound)  return res.status(404).json({
        message: " No se encuentra el producto"
    });

   products = products.map(p => p.id == parseInt(req.params.id) ? {...p, ...newData} : p)

    res.json({
        message: " Producto actualizado"
    })

})

app.delete('/product/:id', (req,res) => {
    const productFound = products.find(function (product){
        return product.id == req.params.id
    })

    if (!productFound)  return res.status(404).json({
        message: " No se encuentra el producto"
    });

    products = products.filter(p=> p.id !== parseInt(req.params.id))
    
    res.sendStatus(204);

})

app.get('/product/:id', (req,res) => {
    const productFound = products.find(function (product){
        return product.id == req.params.id
    })

    if (!productFound)  return res.status(404).json({
        message: " No se encuentra el producto"
    });

    res.json(productFound)
})

app.listen(3000)
console.log(`server on port ${3000}`)