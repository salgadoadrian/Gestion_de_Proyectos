const {Schema , model} = require('mongoose');

const RoleShema = Schema({
    rol:{
        type: 'String',
        required: [true, 'El rol es obligatorio'],
    },
    descripcion: {
        type: String,
    }

});

module.exports = model('Role', RoleShema);
