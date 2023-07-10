const  Role = require('../models/role.js');
const {Usuario, Tarea} = require('../models/index.js');
const { message } = require('../helpers/message');
const tarea = require('../models/tarea.js');


const esRoleValido = async(rol = '') => {

    const existRole = await Role.findOne({rol});
    
    if( !existRole ){
        throw new Error(message.mss_009);
    }  
}


const emailExiste = async(correo = '') =>{

    const existeCorreo = await Usuario.findOne({correo});

    if( existeCorreo ) {
        throw new Error(message.mss_010);

    }
}

const existeUsuarioPorId = async( id ) =>{

    const existeUsuario = await Usuario.findById(id );
  
    if( !existeUsuario ) {
        throw new Error(message.mss_011);
    }
   
}

const existeUsuarioPorId_USER = async( id ) =>{

    const existeUsuario = await Usuario.findById(id );
  
    if( !existeUsuario ) {
        throw new Error(message.mss_011);
    }

    if( existeUsuario.rol != 'USER_ROLE') {
        throw new Error(message.mss_002);
    }

}

const existeTareaPorId = async( id ) =>{

    const existeTarea = await Tarea.findById(id );
  
    if( !existeTarea ) {
        throw new Error(message.mss_011);
    }
   
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeUsuarioPorId_USER,
    existeTareaPorId
}