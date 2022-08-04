const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { faker } = require('@faker-js/faker')

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const contenedor = require('./database');
const { sqliteOptions } = require('./options/sqliteDB');
const { mysqlOptions } = require('./options/mariaDB');
const knex = require('knex')(mysqlOptions);

app.use(express.static('./public'));
app.get('/', (req, res) => { 
    res.sendFile('index.html', {root: __dirname})})


app.get('/api/productos-test', (req,res)=>{
    const productos= [];
    for(let i = 0; i < 5; i++) {
        const producto={
            nombre: faker.vehicle.vehicle(),
            precio: faker.commerce.price(4000, 20000,0,'$')
        };
        productos.push(producto)}

    res.json({productos})
})

httpServer.listen(3000, () => console.log('SERVER ON'))

const productos = new contenedor(mysqlOptions, 'productos');

io.on('connection', (socket) => { 
    console.log('¡Nuevo cliente conectado!');
    socket.emit('mensajes', productos);

    socket.on('mensaje', (data) =>{
        knex('productos')
            .insert(data)
            .then(()=>{
                console.log(`Producto ${data.nombre} agregado`);
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>
            knex.destroy())
        console.log(productos);
        io.sockets.emit('mensajes',productos);    
    });
    
    
});