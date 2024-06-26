import {conn}  from "../utils/conexao.js";

export const addLog = (dados, tipo_usuario)=>{

    // Exemplo de log para uma atividade de um usuário normal
    if("usuario" == tipo_usuario){
        const query = " INSERT INTO log_atividades (tipo_usuario, usuario_id, caminho_url, detalhes) VALUES (?)";

        return new Promise ((resolve,reject )=>{
            conn.query(query,[dados],(err)=>{
                if(err) { reject (err);}
                else { resolve("caminho URL cadastrado") }
    })
    })
}
    //Exemplo de log para uma atividade de um administrador
    if("administrador" == tipo_usuario){ 
    const query =" INSERT INTO log_atividades (tipo_usuario, administrador_id, caminho_url, detalhes) VALUES (?)";

    return new Promise ((resolve,reject )=>{
        conn.query(query,[dados], (err, )=>{
            if(err)  reject (err);
            else resolve("caminho URL  cadastrado com sucesso")
    
        })})
}
    // Exemplo de log para uma atividade de um gestor
if ("gestor" == tipo_usuario){

    const query ="INSERT INTO log_atividades (tipo_usuario,gestor_id, caminho_url, detalhes) VALUES (?)";
    
    return new Promise ((resolve,reject )=>{
        conn.query(query,[dados], (err)=>{
            if(err)  reject (err);
            else resolve("caminho URL cadastrado ")
    
        })})
}
} 

export const ObterLog = (tipo_usuario, id) =>{
// exemplo usuario normal
    if(tipo_usuario == "usuario"){
        const query = "SELECT * FROM log_atividades WHERE usuario_id= ?"
    
        return new Promise ((resolve,reject )=>{
            conn.query(query,[id], (err,data )=>{
                if(err)  reject (err);
                else resolve(data)
        
            })})

    }
   
    // exemplo Gestores
    if(tipo_usuario == "gestor"){
        const query = "SELECT * FROM log_atividades WHERE gestor_id= ?"
    
        return new Promise ((resolve,reject )=>{
            conn.query(query,[id], (err,data )=>{
                if(err)  reject (err);
                else resolve(data)
        
            })})
    }

    // exemplo Admin
    if(tipo_usuario == "administrador"){
        const query = "SELECT * FROM log_atividades WHERE administrador_id= ?"
    
        return new Promise ((resolve,reject )=>{
            conn.query(query,[id], (err,data )=>{
                if(err)  reject (err);
                else resolve(data)
        
            })})

    }
}

export const Deletar = (id)=>{

    const query = "DELETE FROM log_atividades WHERE id= ?"
    return new Promise ((resolve,reject )=>{
        conn.query(query,[id], (err)=>{
            if(err)  reject (err);
            else resolve("Deletado")
    
        })})

}

export const DeletarTudo = ()=>{

    const query = "DELETE FROM log_atividades"
    
    return new Promise ((resolve,reject )=>{
        conn.query(query, (err )=>{
            if(err)  reject (err);
            else resolve("delatado com Sucesso")
    
        })})

}