const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios') ;
const { crearMensaje } = require('../utils/util');
const  usuarios  = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat',(data,callback) =>{
						
        if(!data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje: 'El nombre y sala son necesarios'
            });
				}
				
				// * Conectando a la sala
				client.join(data.sala);
        usuarios.agregarPersona(client.id,data.nombre, data.sala);

				// * emitiendo mensaje por sala
        client.broadcast.to(data.sala).emit('listaPersonas',usuarios.getPersonaPorSala(data.sala));
        callback(usuarios.getPersonaPorSala(data.sala));
        
    });

    client.on('crearMensaje',(data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);
    });

    client.on('disconnect',() =>{
       let personaBorrada =  usuarios.borrarPersona(client.id);
       client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje( 'Administrador', `${personaBorrada.nombre} abandono el chat`));
       client.broadcast.to(personaBorrada.sala).emit('listaPersonas',usuarios.getPersonaPorSala(personaBorrada.sala));
    });

    client.on('mensajePrivado',(data) =>{
        // *Mensaje Privado
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});