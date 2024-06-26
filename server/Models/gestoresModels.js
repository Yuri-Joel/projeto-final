import {conn}  from "../utils/conexao.js";


export const  CGestores =()=>{
    const query= "SELECT count(*) AS total FROM gestores"
    return new Promise ((resolve, reject)=>{
    conn.query(query,(err, data)=>{
        if(err)  reject (err);
        else resolve(data)

    })})

}
export const TodosGestores =()=>{
    const query= "SELECT *  FROM gestores"
    return new Promise ((resolve, reject)=>{
    conn.query(query,(err, data)=>{
        if(err)  reject (err);
        else resolve(data)

    })})

}


export const ObtergestorId =(gestorId) =>{
    
    const query= "SELECT * FROM gestores where id = ? "
    return new Promise ((resolve,reject )=>{
    conn.query(query,[gestorId], (err, data)=>{
        if(err)  reject (err);
        else resolve(data)

    })})
}
export const newGestores = (dados)=>{
    const query = "insert into gestores (nome,email,nome_user,senha,telefone,farmacia_id) value (?)"
    return new Promise((resolve)=>{

      conn.query(query,[dados], (err)=>{
          if(err)resolve ("ERRO! Esta farmacia já possui um Gestor");
          else resolve("Sucess")
  })
  })
}


export const deleteGestor = (usuarioId)=>{
    const query = "DELETE  FROM gestores where `id`=?";
    return new Promise ((resolve,reject)=>{
        conn.query(query,[usuarioId],(err)=>{
            if(err) reject(err)
            else resolve("Gestor deletado com sucesso")
        })})

}

export const ActuaGestor = (dados, usuarioId) => {
    const query = "UPDATE gestores SET `nome` =?, `email`=?  WHERE `id` = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [...dados, usuarioId], (err) => {
            if (err) reject(err)
            else resolve("Actualizado")
        })
    })

}
export const ActuaGestorsenha = (tabela, dados, usuarioId) => {
    const query = "UPDATE ?? SET `senha`=? WHERE `id` = ?"
    return new Promise((resolve, reject) => {
        conn.query(query, [tabela,dados, usuarioId], (err) => {
            if (err) reject(err)
            else resolve("Actualizado")
        })
    })

}

export const Nomefarmacias = (id)=>{

    const query =" SELECT farmacias.id, farmacias.nome, gestores.nome as gestor FROM farmacias join gestores  on gestores.farmacia_id = farmacias.id where gestores.id = ?"
    return new Promise ((resolve,reject)=>{
        conn.query(query,[id],(err,data)=>{
            if(err) reject(err)
            else resolve(data)
        })})

}