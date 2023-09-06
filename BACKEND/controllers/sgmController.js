const pool = require("../config/sgm");
//const {MarcacionesModel} = require("../models/Marcaciones")



/////////////////////////////////         ITEM              /////////////////////////////////////////////
exports.obtenerItemsLista= async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
		const rows = await conn.query("SELECT i.item, m.marca, p.razonSocial as proveedor, mc.medida as medidaCompra, mi.medida as medidaInventario, i.observacion, i.id_proveedor, i.id_item, m.id_marca, mc.id_medida as id_medidacompra, mi.id_medida as id_medidainventario, i.presentacion, i.bitacora, i.clasificacion FROM tbl_item i INNER JOIN tbl_proveedor p on p.id_proveedor= i.id_proveedor INNER JOIN tbl_marca m on m.id_marca=i.marca INNER JOIN tbl_medida mc on mc.id_medida=i.medidaCompra INNER JOIN tbl_medida mi on mi.id_medida=i.medidaInventario WHERE i.estado=1 and p.estado=1 ORDER BY i.item");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.NuevoItem= async (req, res) => {      
  let conn;
  const {id_proveedor, item, medidaCompra, medidaInventario, marca, observacion, bitacora, presentacion, clasificacion} = req.body;

  try {
	conn = await pool.getConnection();
  const rows = await conn.query("INSERT INTO tbl_item (id_proveedor, item, medidaCompra, medidaInventario, marca, observacion, estado, bitacora, presentacion, clasificacion) VALUES ("+id_proveedor+", '"+item+"', '"+medidaCompra+"', '"+medidaInventario+"', "+marca+", '"+observacion+"', 1, '"+bitacora+"', '"+presentacion+"', '"+clasificacion+"')");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.EditarItem= async (req, res) => {      
  let conn;
  const {id_item, id_proveedor, item, medidaCompra, medidaInventario, marca, observacion, bitacora, presentacion} = req.body;
  try {
	conn = await pool.getConnection();
  const rows = await conn.query("UPDATE tbl_item SET id_proveedor="+id_proveedor+", item='"+item+"', medidaCompra='"+medidaCompra+"', medidaInventario='"+medidaInventario+"', marca="+marca+", observacion='"+observacion+"', bitacora='"+bitacora+"', presentacion='"+presentacion+"' WHERE id_item="+id_item+"");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.eliminaItem= async (req, res) => {      
  let conn;
  const {id_item, bitacora, usuario, fecha} = req.body;
  const jsonString = JSON.stringify(bitacora);

  try {
	conn = await pool.getConnection();
		const rows = await conn.query("UPDATE tbl_item SET estado=0, bitacora='"+jsonString+"' WHERE id_item="+id_item+"");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}


exports.obtenerMarcaLista= async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
		const rows = await conn.query("SELECT id_marca, marca FROM tbl_marca WHERE estado=1 ORDER BY marca");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.obtenerMedidaLista= async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM tbl_medida WHERE estado=1 ORDER BY medida");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }  
}

exports.obtenerClasificacion= async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM tbl_clasificacion WHERE estado=1 ORDER BY tipo");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }  
}



/////////////////////////////////         PROVEEDOR              /////////////////////////////////////////////

exports.obtenerProveedorLista= async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM tbl_proveedor WHERE estado=1 ORDER BY razonSocial");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.obtenerProveedor= async (req, res) => {      
  let conn;
  try {
	conn = await pool.getConnection();
		const rows = await conn.query("SELECT * FROM tbl_proveedor WHERE id_proveedor="+req.params.id+"");
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.NuevoProveedor= async (req, res) => {   
  let conn;
  const {nombre, telefono, direccion, nit, departamento, email, observacion,  usuario, fecha} = req.body;

  const jsonData = [{
    usuario: usuario,
    accion: 'Nuevo',
    fecha: fecha
  }];
  const jsonString = JSON.stringify(jsonData);

  try {
	conn = await pool.getConnection();
		const rows = await conn.query("INSERT INTO tbl_proveedor (razonSocial, telefono, direccion, nit, departamento, email, observacion, estado, bitacora)  VALUES ('"+nombre+"', '"+telefono+"', '"+direccion+"', '"+nit+"', '"+departamento+"', '"+email+"', '"+observacion+"', 1, '"+jsonString+"')  RETURNING id_proveedor, razonSocial, contacto_j, bitacora");
    res.send(rows[0]);
    //console.log(rows[0])
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.EditarProveedor= async (req, res) => {   
  let conn;
  const {id_proveedor, nombre, telefono, direccion, nit, departamento, email, observacion,  usuario, fecha, bitacora} = req.body;

  const jsonData = [{
    usuario: usuario,
    accion: 'Editado',
    fecha: fecha
  }];
  
  const bitacoraN = bitacora.concat(jsonData)
  const jsonString = JSON.stringify(bitacoraN);

  try {
	conn = await pool.getConnection();
		const rows = await conn.query("UPDATE tbl_proveedor SET razonSocial='"+nombre+"', telefono='"+telefono+"', direccion='"+direccion+"', nit='"+nit+"', departamento='"+departamento+"', email='"+email+"', observacion='"+observacion+"',  bitacora='"+jsonString+"' where id_proveedor="+id_proveedor+" ");
    res.send({id_proveedor: id_proveedor, razonSocial:nombre, contacto:'', bitacora:bitacoraN});
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.EliminaProveedor= async (req, res) => {   
  let conn;
  const {id_proveedor, bitacora, usuario, fecha} = req.body;

  const jsonData = [{
    usuario: usuario,
    accion: 'Eliminar',
    fecha: fecha
  }];

  const bitacoraN = bitacora.concat(jsonData)
  const jsonString = JSON.stringify(bitacoraN);

  try {
	conn = await pool.getConnection();
		const rows = await conn.query("UPDATE tbl_proveedor SET ESTADO=0, bitacora='"+jsonString+"' WHERE id_proveedor="+id_proveedor+" ");
    res.send(rows[0]);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

exports.guardaContactoProveedor= async (req, res) => {   
  let conn;
  const {contacto_j, bitacora, id_proveedor, razonSocial} = req.body;
  const contacto_jS = JSON.stringify(contacto_j);
  const bitacoraS = JSON.stringify(bitacora);
  try {
	conn = await pool.getConnection();
		const rows = await conn.query("UPDATE tbl_proveedor SET contacto_j = '"+contacto_jS+"', bitacora = '"+bitacoraS+"' WHERE id_proveedor="+id_proveedor+" ");
    const jsonData = {
      id_proveedor:id_proveedor, 
      razonSocial:razonSocial, 
      contacto_j:contacto_j, 
      bitacora:bitacora
    };
    res.send(jsonData);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}



/////////////////////////////////         COMPRAS              /////////////////////////////////////////////

exports.obtenerComprasLista= async (req, res) => {      
  let conn;
  const {estado} = req.body;

  if(estado=="Pendientes"){sql="SELECT p.razonSocial, i.item, m.marca, c.* FROM bd_SGM.tbl_compra c INNER JOIN  bd_SGM.tbl_proveedor p on p.id_proveedor=c.id_proveedor INNER JOIN  bd_SGM.tbl_item i on i.id_item=c.id_item INNER JOIN bd_SGM.tbl_marca m on m.id_marca=i.marca WHERE (c.estado=1 and jefatura<>'Rechazado' and gerencia='Pendiente')"}
  if(estado=="Aprobados"){sql="SELECT p.razonSocial, i.item, m.marca, c.* FROM bd_SGM.tbl_compra c INNER JOIN  bd_SGM.tbl_proveedor p on p.id_proveedor=c.id_proveedor INNER JOIN  bd_SGM.tbl_item i on i.id_item=c.id_item INNER JOIN bd_SGM.tbl_marca m on m.id_marca=i.marca WHERE (c.estado=1 and jefatura<>'Rechazado' and gerencia='Aprobado')"}
  if(estado=="Rechazados"){sql="SELECT p.razonSocial, i.item, m.marca, c.* FROM bd_SGM.tbl_compra c INNER JOIN  bd_SGM.tbl_proveedor p on p.id_proveedor=c.id_proveedor INNER JOIN  bd_SGM.tbl_item i on i.id_item=c.id_item INNER JOIN bd_SGM.tbl_marca m on m.id_marca=i.marca WHERE (c.estado=1 and (jefatura='Rechazado' OR gerencia='Rechazado'))"}
  try {
	conn = await pool.getConnection();
		const rows = await conn.query(sql);
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }  
}

exports.guardarCompras= async (req, res) => {      
  let conn;
  const {id_proveedor, id_item, cantidadCompra, medidaCompra, precioUnitarioCompra, precioTotalCompra, presentacionItem, presentacionMedida, cantidadTotal, observacion, login_solicita, nombre_solicita, departamento_solicita, fecha_solicita, departamentos_j, tipoCompra} = req.body;

  
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("INSERT INTO tbl_compra (codigoCompra, id_proveedor, id_item, cantidadCompra, medidaCompra, precioUnitarioCompra, precioTotalCompra, presentacionItem, presentacionMedida, cantidadTotal, observacion, estado, login_solicita, nombre_solicita, departamento_solicita, fecha_solicita, departamentos_j, tipoCompra, jefatura, gerencia) VALUES (CONCAT('CPR-', SUBSTRING(CONCAT('000000000',LAST_INSERT_ID(id_compra)), -7)), "+id_proveedor+", "+id_item+", "+cantidadCompra+", '"+medidaCompra+"', "+precioUnitarioCompra+", "+precioTotalCompra+", '"+presentacionItem+"', '"+presentacionMedida+"', "+cantidadTotal+", '"+observacion+"', 1, "+login_solicita+", '"+nombre_solicita+"', '"+departamento_solicita+"', '"+fecha_solicita+"', '"+departamentos_j+"', '"+tipoCompra+"', 'Pendiente', 'Pendiente') RETURNING id_compra, codigoCompra");
  res.send(rows[0]);

  const rows1 = await conn.query("UPDATE tbl_compra SET codigoCompra=CONCAT('CPR-', SUBSTRING(CONCAT('000000000','"+rows[0].id_compra+"'), -7)) WHERE id_compra="+rows[0].id_compra+"");
  //res.send(rows1);

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }  
}

exports.cambiaCompraStatus= async (req, res) => {       
  
  let conn;
  const {codigoCompra, area, status, login, nombre, fecha, obs} = req.body;
  
  if(area=="jefatura"){sql="UPDATE tbl_compra SET jefatura='"+status+"', login_jefatura='"+login+"', nombre_jefatura='"+nombre+"', fecha_jefatura='"+fecha+"', obs_jefatura='"+obs+"' WHERE codigoCompra='"+codigoCompra+"'"};
  if(area=="gerencia"){sql="UPDATE tbl_compra SET gerencia='"+status+"', login_gerencia='"+login+"', nombre_gerencia='"+nombre+"', fecha_gerencia='"+fecha+"', obs_gerencia='"+obs+"' WHERE codigoCompra='"+codigoCompra+"'"};
  if(area=="elimina"){sql="UPDATE tbl_compra SET estado="+status+", login_elimina='"+login+"', nombre_elimina='"+nombre+"', fecha_elimina='"+fecha+"', obs_elimina='"+obs+"' WHERE codigoCompra='"+codigoCompra+"'"};
  // console.log(sql);
  try {
	conn = await pool.getConnection();
		const rows = await conn.query(sql);
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }  
  
}

exports.DesembolsoDescargoCompra= async (req, res) => {      
  let conn;
  const {codigoCompra, tipo, login, nombre, fecha, fecha_manual, comprobante} = req.body;

  if(tipo=="desembolso"){sql="UPDATE tbl_compra SET nro_comprobante='"+comprobante+"', fecha_desembolso='"+fecha_manual+"', login_desembolso='"+login+"', nombre_desembolso='"+nombre+"', fecha_regDesembolso='"+fecha+"' WHERE codigoCompra='"+codigoCompra+"'"}
  if(tipo=="descargo"){sql="UPDATE tbl_compra SET fecha_descargo='"+fecha_manual+"', login_descargo='"+login+"', nombre_descargo='"+nombre+"', fecha_regDescargo='"+fecha+"' WHERE codigoCompra='"+codigoCompra+"'"}
  // console.log(sql)
  try {
	conn = await pool.getConnection();
		const rows = await conn.query(sql);
  //console.log(rows);
  res.send(rows);
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }  
}


// departamentos_j tbl_compras:  {"LA PAZ":{"cantidadCompra":"","cantidadPresentacion":"","precioTotal":"","observacion":"","estado":"","login_almacen":"","nombre_almacen":"","fecha_ingAlmacen":"","subjefatura":"","login_subjefatura":"","nombre_subjefatura":"","fecha_subjefatura":"","fecha_calidad":"","obsCalidad":""},"COCHABAMBA":{"cantidadCompra":"","cantidadPresentacion":"","precioTotal":"","observacion":"","estado":"","login_almacen":"","nombre_almacen":"","fecha_ingAlmacen":"","subjefatura":"","login_subjefatura":"","nombre_subjefatura":"","fecha_subjefatura":"","fecha_calidad":"","obsCalidad":""}}

// exports.obtenerMarcaciones = async (req, res) => {      
//   let conn;
//   try {
// 	conn = await pool.getConnection();
// 		const rows = await conn.query("SELECT * FROM bd_marcaciones.tbl_marcacion where id_user='"+req.params.id+"' ORDER BY id_marcacion desc limit 10");
//   //console.log(rows);
//   res.send(rows);
//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }

// exports.buscarMarcaciones = async (req, res) => {    
//   const {tipo, fecha_inicio, fecha_fin, usuario, plataforma} = req.body;
//   let conn;
//   let consulta
//   try {
// 	conn = await pool.getConnection();
//   if(tipo=='usuario'){
//     consulta="SELECT TOKEN.DESCRIPTION AS nombre_usuario,TOKEN.plataforma AS txt_plataforma,tbl_marcacion.* FROM bd_marcaciones.tbl_marcacion INNER JOIN CORE.TOKEN ON USER_ID=id_user WHERE id_user='"+usuario+"' AND fecha_ingreso BETWEEN '"+fecha_inicio+"' AND '"+fecha_fin+"'";
//   }
//   else{
//     consulta="SELECT TOKEN.DESCRIPTION AS nombre_usuario,TOKEN.plataforma AS txt_plataforma,tbl_marcacion.* FROM bd_marcaciones.tbl_marcacion INNER JOIN CORE.TOKEN ON USER_ID=id_user WHERE tbl_marcacion.plataforma='"+plataforma+"' AND fecha_ingreso BETWEEN '"+fecha_inicio+"' AND '"+fecha_fin+"'";
//   }
//   console.log(consulta);
// 	const rows = await conn.query(consulta);
// 	res.send(rows);
//   console.log(req.body)
//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }

// exports.guardaMarcaciones = async (req, res) => {   
  
//   const { id_user, fecha_ingreso, hora_ingreso, loc_ingreso, estado, ip_on, dispositivo_on, so_on, trabajo, plataforma, tiempo_ingreso, foto_ingreso } = req.body;
//    let conn;
//   try {
// 	conn = await pool.getConnection();
//   const rows = await conn.query("INSERT INTO bd_marcaciones.tbl_marcacion (id_user, fecha_ingreso, hora_ingreso, loc_ingreso, estado, ip_on, dispositivo_on, so_on, trabajo, plataforma, tiempo_ingreso, foto_ingreso) VALUES ("+id_user+", '"+fecha_ingreso+"', '"+hora_ingreso+"', '"+loc_ingreso+"', "+estado+", '"+ip_on+"', '"+dispositivo_on+"', '"+so_on+"', '"+trabajo+"', "+plataforma+", '"+tiempo_ingreso+"', '"+foto_ingreso+"')");
//   res.send(rows);
  
//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) res.send("ok"); return conn.end();
//   }
//  }

// exports.salidaMarcaciones = async (req, res) => {    
//   const { id_marcacion, fecha_salida, hora_salida, loc_salida, ip_off, dispositivo_off, so_off, tiempo_salida, foto_salida } = req.body;
//   let conn;
//   try {
//   conn = await pool.getConnection();
//   const rows = await conn.query("UPDATE bd_marcaciones.tbl_marcacion SET fecha_salida='"+fecha_salida+"', hora_salida='"+hora_salida+"', loc_salida='"+loc_salida+"', ip_off='"+ip_off+"', dispositivo_off='"+dispositivo_off+"', so_off='"+so_off+"', tiempo_salida='"+tiempo_salida+"', foto_salida='"+foto_salida+"' WHERE id_marcacion="+id_marcacion+"");
//   //res.send(marcaciones);
//   console.log(req.body)
//   } catch (err) {
//   throw err;
//   } finally {
//   if (conn) res.send("ok"); return conn.end();
//   }
// }

// exports.obtenerUsuarios = async (req, res) => {   
//   const { id, l6, l3 } = req.body;
//   console.log(id, l6, l3)
//   //console.log("yo")
//   let conn;
//   try {
// 	conn = await pool.getConnection();
//   if ((l6=='0' && l3=='30') || l6=='8'){sql="SELECT USER_ID, DESCRIPTION  FROM CORE.TOKEN  ORDER BY DESCRIPTION"}
//   else {sql="SELECT USER_ID, DESCRIPTION FROM CORE.TOKEN WHERE IDREL_SUPERVISOR="+id+" OR ID_JEFE_SUP="+id+" OR USER_ID="+id+" ORDER BY DESCRIPTION"}  
//   const rows = await conn.query(sql);
//   res.send(rows);
//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }

// exports.obtenerPlataformas = async (req, res) => {    
//   const { id, l6, l3 } = req.body;  
//   //console.log(id, l6, l3 )
//   let conn;
//   try {
// 	conn = await pool.getConnection();
//   if ((l6==0 && l3==30) || l6==8){sql="SELECT L6_PLATAFORMA,PLATAFORMA   FROM CORE.TOKEN   GROUP BY PLATAFORMA  ORDER BY PLATAFORMA"}
//   else {sql="SELECT L6_PLATAFORMA, PLATAFORMA FROM CORE.TOKEN WHERE IDREL_SUPERVISOR="+id+" OR ID_JEFE_SUP="+id+" OR USER_ID="+id+" GROUP BY PLATAFORMA  ORDER BY PLATAFORMA"}  
//   const rows = await conn.query(sql);
// 	res.send(rows);
//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }





