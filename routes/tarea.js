
const { Router } = require('express');
const {check} = require('express-validator');
const { message } = require('../helpers/message')

const {
    validarCampos,
    validarJWT,
    esJefeRole,
    esAdminRole,
} = require('../middlewares/index.js');

const{  
    esRoleValido , 
    emailExiste ,
    existeUsuarioPorId,
    existeUsuarioPorId_USER,
    existeTareaPorId
} = require('../helpers/db_validators.js');
const { 
    tareasGet, tareasGet_id, tareasPost, tareasPut, tareasPut_Asignacion, tareaDelete,
} = require('../controllers/tarea');


const router = Router();

router.get('/', tareasGet);

router.get('/:id', [
    check('id',message.mss_001).notEmpty(),
    check('id', message.mss_006).isMongoId(),
    validarCampos
],tareasGet_id);



router.post('/:id_jefe',[
    validarJWT,
    esJefeRole,
    check('id_usuario').custom(existeUsuarioPorId_USER),
    check('descripcion',message.mss_005).notEmpty(),
    check('fecha',message.mss_020).notEmpty(),
    validarCampos
],tareasPost);


router.put('/:id_tarea',[
    validarJWT,
    check('id_tarea').custom(existeTareaPorId),
    check('id_usuario').custom(existeUsuarioPorId),
    
    validarCampos,
],tareasPut)

router.put('/:id_tarea/:usuario_id',[
    validarJWT,
    check('id_tarea',message.mss_011).isEmpty(),
    check('id_tarea').custom(existeTareaPorId),
    check('usuario_id').custom(existeUsuarioPorId_USER),
    validarCampos,
],tareasPut_Asignacion);


router.delete('/:id_tarea',[
    validarJWT,
    check('id_tarea',message.mss_001).notEmpty(),
    check('id_tarea').custom(existeTareaPorId),
    validarCampos,
],tareaDelete)

module.exports = router;