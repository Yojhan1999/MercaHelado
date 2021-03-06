const router = require('express').Router();
const database = require('../database');
//Login
router.post('/login',async(req,res)=>{
    const {correo,contra} = req.body;
    const datos = [correo,contra];
    const usuario = await database.query("select *from usuarios where correo = ? AND contra = ?",datos)
    res.json({ usuario })
})
// Registro de usuarios
// Listar
router.get('/', async (req,res) => {
    const usuarios = await database.query("SELECT u.id_usuario,u.nombre,u.apellido,u.correo,u.telefono,u.contra, r.descripcion,r.id_rol FROM usuarios u, rol r WHERE u.id_rol = r.id_rol");
    res.json({ usuarios })
});
// Consultar
router.get('/:id', async (req,res) => {
    const {id} = req.params;
    const usuarios = await database.query("Select * from usuarios where id_usuario = ?", [id] );
    res.json({usuarios})
});
// Agregar
router.post('/',async (req,res) =>{
    const {nombre,apellido,correo,telefono,contra,id_rol} = req.body;
    const datos = [nombre,apellido,correo,telefono,contra,id_rol];
    await database.query("Insert Into usuarios (nombre,apellido,correo,telefono,contra,id_rol) values (?,?,?,?,?,?)",datos);
    res.json({msg:"Registro exitoso"});
});
// Eliminar 
router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    await database.query("Delete from usuarios where id_usuario = ?",[id]);
    res.json({msg:"Usuario eliminado"});
});
// Modificar
router.put('/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const {nombre,apellido,correo,telefono,contra,id_rol} = req.body;
        const datos = [nombre,apellido,correo,telefono,contra,id_rol,id];
        await database.query("Update usuarios set nombre = ?, apellido= ?, correo = ?, telefono = ?, contra = ?, id_rol = ? Where id_usuario=?",datos);
        res.status(200).json({msg:"Registro modificado"})
        console.log(req.body);
    } catch (error) {
        res.status(401).json({error})
        console.log(error);
    }
});

//Comentario
//listar
router.get('/listarcomentario', async (req,res) => {
    const comenta = await database.query("select * from comentarios");
    res.json({ comenta });
    console.log(comenta);
});
//Agregar
router.post('/listarcomentario',async (req,res) =>{
    const {descripcion} = req.body;
    const dato = [descripcion];
    await database.query("Insert Into comentarios (descripcion)  values (?)",dato);
    res.json({msg:"Comentario exitoso"});
});

// 
/*
exports.ListarUsuario = async (req,res) => {
    const usuarios = await database.query("select * from usuarios");
    res.json({ usuarios })
}

exports.ListarUsuario = async (req,res) => {
    const {id} = req.params;
    const usuarios = await database.query("select * from usuarios where id_usuario = ?", [id] );
    res.json({usuarios});
}*/

module.exports = router;