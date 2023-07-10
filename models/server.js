const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT ;
        this.path = {
            auth: '/api/auth',
            usuario: '/api/usuarios',
            tarea: '/api/tareas'
        }
        this.conectarDB();
        this.middleware();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.path.auth , require('../routes/auth.js'));
        this.app.use( this.path.usuario , require('../routes/usuarios.js')); 
        this.app.use( this.path.tarea, require('../routes/tarea.js')); 
    }

    listen(){
        this.app.listen(this.port , () => {
            console.log('corrieendo en el puerto ', this.port);
        }); 
    }

}




module.exports = Server;