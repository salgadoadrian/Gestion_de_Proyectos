 
const { Schema, model } = require('mongoose');

const TareaSchema = Schema({

    jefe_id:{
        type : Schema.Types.ObjectId,
        ref:  'Usuario',
        require: [true , 'El Jefe es obligatorio']
    },
    usuario_id:{
        type : Schema.Types.ObjectId,
        ref:  'Usuario',
        require: [true , 'El usuario para asiganarle la tarea es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion de la tarea es obligatoria'],
    },
    fecha: {
        type: String,
        required: [true, 'La fecha de culminacion de la tarea es obligatoria']
    },
    porciento:{
        type: Number,
        default: 10,

    },
    estado: {
        type: Boolean,
        default: true
    },
    completada: {
        type: Boolean,
        default: false
    },
});


TareaSchema.methods.toJSON = function() {
    const { __v, _id,  ...tarea  } = this.toObject();
    tarea.uid = _id;
    return tarea;
}

module.exports = model( 'Tarea', TareaSchema );
