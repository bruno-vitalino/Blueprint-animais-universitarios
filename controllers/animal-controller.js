const mysql = require('../mysql');


//CRUD ANIMAL
exports.getAnimal = async (req, res, next) => {
  try {
    let nome = '';
    if (req.query.nome) {
      nome = req.query.nome;
    }

    const query = `SELECT * FROM animais WHERE idAnimais = ? AND (nome LIKE '%${nome}%');`;
    const result = await mysql.execute(query, [req.params.idAnimais])
    const response = { 
      length: result.length,
      animais: result.map(animal => {
        return {
          idAnimais: animal.idAnimais,
          nome: animal.nome,
          adotado: animal.adotado,
          especie: animal.especie,
          porte: animal.porte,
          sexo: animal.sexo,
          idadeAno: animal.idadeAno,
          idadeMes: animal.idadeMes,
          enderecoRua: animal.enderecoRua,
          enderecoBairro: animal.enderecoBairro,
          historia: animal.historia,
          request: {
            type: 'GET',
            description: 'Detalhes do animal',
            url: process.env.URL_API + 'animais/' + animal.idAnimais
            
          }
        }
      })
    }
    console.log(response.animais);
    return res.render('pages/perfil', {animais: response.animais});
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.getAnimais = async (req, res, next) => {
  try {
    


    const query = `SELECT * FROM animais`;
    const result = await mysql.execute(query)
    const response = { 
      length: result.length,
      animais: result.map(animal => {
        return {
          idAnimais: animal.idAnimais,
          nome: animal.nome,
          adotado: animal.adotado,
          especie: animal.especie,
          porte: animal.porte,
          sexo: animal.sexo,
          idadeAno: animal.idadeAno,
          idadeMes: animal.idadeMes,
          enderecoRua: animal.enderecoRua,
          enderecoBairro: animal.enderecoBairro,
          historia: animal.historia,
          request: {
            type: 'GET',
            description: 'Detalhes do animal',
            url: process.env.URL_API + 'animais/' + animal.idAnimais
            
          }
        }
      })
    }
    console.log(response.animais);
    return res.render('pages/home', {animais: response.animais});
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};


exports.postAnimal = async (req,res,next) => {
  try {
    const query = 'INSERT INTO animais (nome, adotado, especie, porte, sexo, idadeAno, idadeMes, enderecoRua, enderecoBairro, historia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    const result = await mysql.execute(query, [
      req.body.nome,
      req.body.adotado,
      req.body.especie,
      req.body.porte,
      req.body.sexo,
      req.body.idadeAno,
      req.body.idadeMes,
      req.body.enderecoRua,
      req.body.enderecoBairro,
      req.body.historia
    ]);
    
    const response = {
      message: 'Animal inserido com sucesso',
      createdAnimal: {
        idAnimais: result.idAnimais,
        nome: req.body.nome,
        adotado:req.body.adotado,
        especie: req.body.especie,
        porte: req.body.porte,
        sexo: req.body.sexo,
        idadeAno: req.body.idadeAno,
        idadeMes: req.body.idadeMes,
        enderecoRua: req.body.enderecoRua,
        enderecoBairro: req.body.enderecoBairro,
        historia: req.body.historia,
        request: {
          type: 'GET',
          description: 'Retorna todos os animais',
          url: process.env.URL_API
        }
      }
    }
    return res.status(201).send(response);
  }catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.deleteAnimal = async (req,res,next) => {
  try {           
    const query = `DELETE FROM animais WHERE idAnimais = (?)`;
    await mysql.execute(query, [req.params.idAnimais]);

    const response = {
      message: 'Animal removido com sucesso',
      request: {
        type: 'DELETE',
        description: 'Exclui um animal',
        url: process.env.URL_API + 'animais',
        body: {
          nome: 'String',
          adotado: 'Boolean', 
          especie: 'String',
          porte: 'String',
          sexo: 'String',
          idadeAno: 'Number',
          idadeMes: 'Number',
          enderecoRua: 'String',
          enderecoBairro: 'String'
        }
      }
    }
    return res.status(202).send(response);

  } catch (error) {
    return res.status(500).send({error: error });
  }
};

exports.updateAnimal = async (req,res,next) => {
  try {
    const query = `UPDATE animais
                    SET nome
                        adotado        = ?,
                        especie        = ?,
                        porte          = ?,
                        sexo           = ?,
                        idadeAno       = ?,
                        idadeMes       = ?,
                        enderecoRua    = ?,
                        enderecoBairro = ?,
                        historia       = ?
                  WHERE idAnimais      = ?`;
    await mysql.execute(query, [
      req.body.nome,
      req.body.adotado,
      req.body.especie,
      req.body.porte,
      req.body.sexo,
      req.body.idadeAno,
      req.body.idadeMes,
      req.body.enderecoRua,
      req.body.enderecoBairro,
      req.body.historia,
      req.params.idAnimais
    ]);
    const response = {
      message: 'Animal atualizado com sucesso',
      updatedAnimal: {
        idAnimais: req.params.idAnimais,
        nome: req.body.nome,
        adotado:req.body.adotado,
        especie: req.body.especie,
        porte: req.body.porte,
        sexo: req.body.sexo,
        idadeAno: req.body.idadeAno,
        idadeMes: req.body.idadeMes,
        enderecoRua: req.body.enderecoRua,
        enderecoBairro: req.body.enderecoBairro,
        historia: req.body.historia,
        request: {
          type: 'GET', 
          description: 'Detalhes do animal',
          url: process.env.URRL_API + 'animais/' + req.params.idAnimais
        }
      }
    }
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};



//TEMPERAMENTO
exports.postTemperamento = async (req,res,next) => {
  try {
    const query = 'INSERT INTO temperamento (docil, carente, divertido, calmo, brincalhao, timido) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await mysql.execute(query, [
      req.body.docil,
      req.body.carente,
      req.body.divertido,
      req.body.calmo,
      req.body.brincalhao,
      req.body.timido
    ]);
    
    const response = {
      message: 'Temperamento inserido com sucesso',
      createdTemperamento: {
        idTemperamento: result.idTemperamento,
        docil: req.body.docil,
        carente: req.body.carente,
        divertido: req.body.divertido,
        calmo: req.body.calmo,
        brincalhao: req.body.brincalhao,
        timido: req.body.timido,
        request: {
          type: 'GET',
          description: 'Retorna todos os temperamentos',
          url: process.env.URL_API + 'temperamento'
        }
      }
    }
    return res.status(201).send(response);
  }catch (error) {
    return res.status(500).send({ error: error });
  }
};

exports.getTemperamento = async (req, res, next) => {
  try {
    let nome = '';
    if (req.query.nome) {
      nome = req.query.nome;
    }

    const query = `SELECT * FROM animais WHERE idAnimais = ? AND (nome LIKE '%${nome}%');`;
    const result = await mysql.execute(query, [req.params.idAnimais])
    const response = { 
      length: result.length,
      animais: result.map(animal => {
        return {
          idAnimais: animal.idAnimais,
          nome: animal.nome,
          adotado: animal.adotado,
          especie: animal.especie,
          porte: animal.porte,
          sexo: animal.sexo,
          idadeAno: animal.idadeAno,
          idadeMes: animal.idadeMes,
          enderecoRua: animal.enderecoRua,
          enderecoBairro: animal.enderecoBairro,
          historia: animal.historia,
          request: {
            type: 'GET',
            description: 'Detalhes do animal',
            url: process.env.URL_API + 'animais/' + animal.idAnimais
            
          }
        }
      })
    }
    console.log(response.animais);
    return res.render('pages/perfil', {animais: response.animais});
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

//SOCIAVEL
exports.postSociavel = async (req,res,next) => {
  try {
    const query = 'INSERT INTO sociavel (caes, gatos, filhotes, bebes, criancas, adultos) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await mysql.execute(query, [
      req.body.caes,
      req.body.gatos,
      req.body.filhotes,
      req.body.bebes,
      req.body.criancas,
      req.body.adultos
    ]);
    
    const response = {
      message: 'Sociavel inserido com sucesso',
      createdSociavel: {
        idSociavel: result.idSociavel,
        caes: req.body.caes,
        gatos: req.body.gatos,
        filhotes: req.body.filhotes,
        bebes: req.body.bebes,
        criancas: req.body.criancas,
        adultos: req.body.adultos,
        request: {
          type: 'GET',
          description: 'Retorna todos os sociaveis',
          url: process.env.URL_API + 'sociavel'
        }
      }
    }
    return res.status(201).send(response);
  }catch (error) {
    return res.status(500).send({ error: error });
  }
};

//VIVE
exports.postVive = async (req,res,next) => {
  try {
    const query = 'INSERT INTO vive (casa, apartamento, quintal, sitio, frio, calor) VALUES (?, ?, ?, ?, ?, ?)';
    const result = await mysql.execute(query, [
      req.body.casa,
      req.body.apartamento,
      req.body.quintal,
      req.body.sitio,
      req.body.frio,
      req.body.calor
    ]);
    
    const response = {
      message: 'Vive inserido com sucesso',
      createdSociavel: {
        idVive: result.idVive,
        casa: req.body.casa,
        apartamento: req.body.apartamento,
        quintal: req.body.quintal,
        sitio: req.body.sitio,
        frio: req.body.frio,
        calor: req.body.calor,
        request: {
          type: 'GET',
          description: 'Retorna todos os vive',
          url: process.env.URL_API + 'vive'
        }
      }
    }
    return res.status(201).send(response);
  }catch (error) {
    return res.status(500).send({ error: error });
  }
};

//SAUDE
exports.postSaude = async (req,res,next) => {
  try {
    const query = 'INSERT INTO saude (castrado, vacinado, vermifugado) VALUES (?, ?, ?)';
    const result = await mysql.execute(query, [
      req.body.castrado,
      req.body.vacinado,
      req.body.vermifugado
    ]);
    
    const response = {
      message: 'Saude inserido com sucesso',
      createdSociavel: {
        idSaude: result.idSaude,
        castrado: req.body.castrado,
        vacinado: req.body.vacinado,
        vermifugado: req.body.vermifugado,
        request: {
          type: 'GET',
          description: 'Retorna todos os Saude',
          url: process.env.URL_API + 'saude'
        }
      }
    }
    return res.status(201).send(response);
  }catch (error) {
    return res.status(500).send({ error: error });
  }
};


//IMAGENS
exports.postImage = async(req,res,next) => {
  try {
    const query = 'INSERT INTO images (idAnimais, path) VALUES (?,?)';
    const result = await mysql.execute(query, [
      req.params.idAnimais,
      req.file.path
    ]);

    const response = {
      message: 'Imagem inserida com sucesso',
      createdImage: {
        idAnimais: parseInt(req.params.idAnimais),
        imageId: result.insertId,
        path: req.file.path,
        request: {
          type: 'GET',
          description:  'Retorna todas as imagens',
          url: process.env.URL_API + 'animais/' + req.params.idAnimais + '/imagens'
        }
      }
    }
    return res.status(201).send(response)
    
  } catch(error) {
    return res.status(500).send({ error: error });
  }
};

exports.getImages = async (req, res, next) => {
  try {
    const query = "SELECT * FROM images WHERE idAnimais =?;"
    const result = await mysql.execute(query, [req.params.idAnimais])
    const response = {
      length: result.length,
      images: result.map(imgg => {
        return  {
          idAnimais: parseInt(req.params.idAnimais),
          imageId: img.imageId,
          path: process.env.URL_API + img.path
        }
      })
    }
    return res.status(200).send(response);
  } catch(error) {
    return res.status(500).send({ error: error });
  }
};