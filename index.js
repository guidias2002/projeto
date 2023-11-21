const UsuariosController = require('./controllers/Usuarios/usuarios.controller')
const express = require('express');
const app = express();

app.use(express.json());

app.get("/usuario",(req,res)=>{
    return res.send(UsuariosController.getAll());
})

app.get("/usuario/:id",(req,res)=>{
    const {id} = req.params
    return res.send(UsuariosController.getById(id));
})

app.post("/usuario",(req,res)=>{
    const usuario = req.body;
    return res.send(UsuariosController.createUser(usuario));
})
app.patch("/usuario/:id",(req,res)=>{
    edit_usuario = req.body
    const {id} = req.params
    const indice = id - 1 
    if (id > usuarios.length){
        res.status(400).send(erro_mensagem[0])
    }else{
        if (id == usuarios[indice].id){
            if ("nomeCompleto" in edit_usuario && "username" in edit_usuario && "email" in edit_usuario){
                edit_usuario.id = indice + 1
                usuarios[indice] = edit_usuario
                res.status(200).send(usuarios[indice])
            }else{
                res.status(400).send(erro_mensagem[1])
            }
        } 
    }
})
app.delete("/usuario/:id",(req,res)=>{
    const {id} = req.params
    const indice = id - 1 
    if (id > usuarios.length){
        res.status(400).send(erro_mensagem[0])
    }else{
        usuarios.splice(indice,1)
        res.status(200).send(erro_mensagem[2])
        var i = 0
        while(i < usuarios.length){
            usuarios[i]["id"] = (i+1)
            i++
        }
            
    }   
})

//Outros
const port = 3000
app.listen(port, ()=>{
    console.log(`Iniciando servidor...`)
})