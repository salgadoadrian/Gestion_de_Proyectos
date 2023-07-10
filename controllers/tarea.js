const {request, response } = require('express');
const Tarea = require('../models/tarea');
const { message } = require('../helpers/message');
const kindOf = require('kind-of');


const tareasGet = async(req = request, res = response) => {
   
    const {limite = 5 , desde = 0} = req.query;

    const resp = await Promise.all([
        Tarea.countDocuments({estado : true}),
        Tarea.find({estado : true})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        resp
    });
}

const tareasGet_id = async( req = request, res = response ) => {
  
    const tarea = await Tarea.findById(req.params.id);
    res.json({
        tarea
    })

}
const tareasPost = async( req = request, res = response ) =>{

    const{id_jefe}=req.params;
    const{id_usuario , descripcion , fecha , ...resto_tarea }= req.body;

    const tarea = new Tarea({jefe_id:id_jefe,usuario_id:id_usuario,descripcion,fecha});

   // console.log(await Tarea.findById('64a4ad7236fe1c2660261550').populate('jefe_id','nombre'));
    await tarea.save();
    res.json({
        tarea
    })
}

const tareasPut = async( req = request, res = response ) => {

    const{id_tarea} = req.params;
    let {usuario_id, descripcion,fecha,porciento} = req.body;

    let bandera = false;

    const tarea = await Tarea.findById(id_tarea);

    console.log(tarea.jefe_id);

    if(usuario_id == tarea.usuario_id || usuario_id == tarea.jefe_id){
        bandera = true;
    }

    if(bandera)
        return res.json({
            msg: message.mss_021
        })

    if(!descripcion) descripcion = tarea.descripcion
    if(!fecha) fecha = tarea.fecha
    if(!porciento) porciento = tarea.porciento

    
    await Tarea.findByIdAndUpdate(id_tarea,{descripcion,fecha,porciento});

    const tarea2 = await Tarea.findById(id_tarea);
   res.json({
        tarea2
   });
}

const tareasPut_Asignacion = async( req = request, res = response ) => {

    const {usuario_id, id_tarea} = req.params;

    const tarea = await Tarea.findById(id_tarea);

    if(req.usuario._id.toString() != tarea.jefe_id.toString())  {
        return res.json({
            msg: message.mss_021
        })
    }

    await Tarea.findByIdAndUpdate(id_tarea,{usuario_id});
    const tarea2 = await Tarea.findById(id_tarea);

    res.json({
        tarea2
    })

}

const tareaDelete = async(req, res = response) => {

    const {id_tarea} = req.params;
    
    const tarea2 = await Tarea.findById(id_tarea);

    if(req.usuario._id.toString() != tarea2.jefe_id.toString())  {
        return res.json({
            msg: message.mss_021
        })
    }

   const tarea = await Tarea.findByIdAndUpdate(id_tarea , {estado : false});
   tarea.estado = false;
    res.json({
        msg:'DELETE: ',
        tarea
    });
}



module.exports = {
    tareasGet,
    tareasGet_id,
    tareasPost,
    tareasPut,
    tareasPut_Asignacion,
    tareaDelete
}