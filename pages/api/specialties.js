
import { syncAndConnectDatabase, Specialty,Medic } from "../../lib/db/database.index";

  


async function deleteSpecialtyById(specialtyId){
  try{
    await Specialty.destroy({where:{specialtyId:specialtyId}})
    /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/
    
  }catch(err){
    console.err(err)
    throw err
  }
}


async function getAllSpecialties(){
  try{
      const specialties = await Specialty.findAll({
        include:[ 
          {model: Medic , as:'medics'}
                 
                ]})
        return specialties
  }catch(err){
    throw err
  }
}

async function getSpecialtyById(specialtyId){
  try{
    const searchedSpecialty = Specialty.findByPk(specialtyId,{
      include:[
        {model: Medic , as:'medics'}
      ]
    })
    return searchedSpecialty
    }catch(err){
      throw(err)
  }
}

async function createSpecialty(data){
  try{
    const newSpecialty = await Specialty.create(data)
    const createdSpecialty = await getSpecialtyById(newSpecialty.specialtyId)
    return createdSpecialty
  }catch(err){
      throw err
    }
}

  export default async function handler(req, res) {
    syncAndConnectDatabase()
    switch (req.method) {
      case 'GET':
        // Lógica para manejar GET
        const specialties = await getAllSpecialties()
        res.status(200).json(specialties);
        break;
      case 'POST':
        // Lógica para manejar POST
        const newSpecialty = await createSpecialty(req.body)
        res.status(201).json(newSpecialty);
        break;
      case 'PUT':
        // Lógica para manejar PUT
        const updatedPost = req.body; // Supón que tienes un post a actualizar
        res.status(200).json({ posts: 'Post actualizado', post: updatedPost });
        break;
      case 'DELETE':
        const { id } = req.query // Obtener el ID del post a eliminar
        await deleteSpecialtyById(id)
        const updatedList = await getAllSpecialties()
        res.status(200).json(updatedList);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  