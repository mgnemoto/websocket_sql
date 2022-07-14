const socket = io();
// socket.on('pepe',(data)=>{
//     alert(data);
//     socket.emit('notificacion', 'Mensaje recibido exitosamente')
// })


// const input = document.getElementById('texto');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const foto = document.getElementById('foto');



document.getElementById("enviar").addEventListener('click', (e)=>{
    e.preventDefault();
    let producto = ({"nombre" : nombre.value, "precio": precio.value, "foto": foto.value})
    socket.emit("mensaje", producto);
    console.log(producto);
});

socket.on('mensajes', (data) =>{
    console.log(data);
    let html = "";
    data.forEach(producto =>{
        html += `
        <tr class="table-dark">
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.foto}</td>
        </tr>
        `;
    });
    document.getElementById("listaItems").innerHTML = html;
});

