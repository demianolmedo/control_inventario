//Rutas para productos
const express = require('express');
const router = express.Router();
const sgmController = require('../controllers/sgmController')
const jwt = require('jsonwebtoken');


router.get('/proveedor/lista', verifyToken, sgmController.obtenerProveedorLista);
router.get('/proveedor/:id', verifyToken, sgmController.obtenerProveedor);
router.post('/proveedor/nuevo', verifyToken, sgmController.NuevoProveedor);
router.post('/proveedor/editar', verifyToken, sgmController.EditarProveedor);
router.post('/proveedor/elimina', verifyToken, sgmController.EliminaProveedor);
router.post('/proveedor/guarda/contacto', verifyToken, sgmController.guardaContactoProveedor);

router.get('/items/lista', verifyToken, sgmController.obtenerItemsLista);
router.post('/items/nuevo', verifyToken, sgmController.NuevoItem);
router.post('/items/editar', verifyToken, sgmController.EditarItem);
router.post('/items/elimina', verifyToken, sgmController.eliminaItem);

router.get('/marca/lista', verifyToken, sgmController.obtenerMarcaLista);
router.get('/medida/lista', verifyToken, sgmController.obtenerMedidaLista);
router.get('/clasificacion/lista', verifyToken, sgmController.obtenerClasificacion);

router.post('/compras/lista', verifyToken, sgmController.obtenerComprasLista);
router.post('/compras/guardar', verifyToken, sgmController.guardarCompras);
router.post('/compras/status', verifyToken, sgmController.cambiaCompraStatus);
router.post('/compras/desembolso', verifyToken, sgmController.DesembolsoDescargoCompra);


// router.get('/:id', verifyToken, sgmController.obtenerMarcaciones);
// router.post('/', verifyToken, sgmController.buscarMarcaciones);
// router.post('/registrar/', verifyToken, sgmController.guardaMarcaciones);
// router.post('/salida/', verifyToken, sgmController.salidaMarcaciones);

// router.post('/plataforma/', verifyToken, sgmController.obtenerPlataformas);
// router.post('/usuarios/', verifyToken, sgmController.obtenerUsuarios);

function verifyToken(req,res, next){

    if(!req.headers.authorization) return res.status(401).json('Token Vacio');

    const token = req.headers.authorization.substr(7);
    //console.log(token)
    if(token!==''){
       // const content = jwt.verify(token,'demian', (err, result) => { return res.status(200).send({ err: err, result: result, }); });
        const content = jwt.verify(token,'demian', function (err, result) {
            if (err) {
                return res.status(401).json({ error: 'Token inválido o expirado' });
            }
                req.data = result;
                next();
          });
        
    }else{
        res.status(401).json({error: 'Token vacio'});
    }
}



module.exports = router;