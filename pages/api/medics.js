// pages/api/posts.js
//EJEMPLO USANDO UN ARRAY
import { syncAndConnectDatabase, Medic, Specialty, database, PersonalData, AddressData } from "../../lib/db/database.index";




async function getAllMedics(){
  try{
      const medics = await Medic.findAll({
        include:[ 
                  {model: Specialty,attributes: ['name', 'code'] },
                  //{model: AddressData},
                  {model: PersonalData, as: 'personalData',include:{model:AddressData, as: 'addressData'}},
                 
                ]})
        return medics
  }catch(err){
    throw err
  }
}

async function getMedicById(medicId){
  try{
    const searchedMedic = await Medic.findByPk(medicId,{
      include:[ 
                {model: Specialty,attributes: ['name', 'code'] },
                //{model: AddressData},
                {model: PersonalData,as: 'personalData', include:{model:AddressData,  as: 'addressData'}},
               
              ]})
          return searchedMedic
  }catch(err){
    throw err
  }
}
  async function createMedic(data){
    try{

      const dbTransaction =  await database.transaction()

      const {dni, firstName,lastName,medicRecord,medicLicenceNumber,specialtyId,dateOfRegistration} = data

      const medicsTable = {medicRecord,medicLicenceNumber,specialtyId,dateOfRegistration}
      const personalDataTable = {dni,firstName,lastName}
      const addressDataTable = {streetNumber:'25A'}
      
      //Abro el transaction
      const newMedic = await Medic.create(medicsTable,{raw:true})
      if (!newMedic) throw new Error("Error creando personal data...")

      const newPersonalData = await PersonalData.create({...personalDataTable,medicId:newMedic.medicId},{raw:true})
      if (!newPersonalData) throw new Error("Error creando personal data...")

  
      await AddressData.create({...addressDataTable,personalDataId: newPersonalData.personalDataId})
      
      //cierro el transactioon
      await dbTransaction.commit()
    
      //Reutilizo codigo asi se devolveran todos los medicos. 
      const createdMedic = await getMedicById(newMedic.medicId)
      return createdMedic

    }catch(err){
      await dbTransaction.rollback()
      throw err
    }
  }

  async function deleteMedicById(medicId){
    try{
      await Medic.destroy({where:{medicId:medicId}})
      /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/
      
    }catch(err){
      console.error(err)
      throw err
    }
  }
  
  
  export default async function handler(req, res) {
    syncAndConnectDatabase()
    switch (req.method) {
      case 'GET':
        const medics = await getAllMedics()
        res.status(200).json(medics);
        break;
      case 'POST':
        // Lógica para manejar POST
        try{
            const newMedic = await createMedic(req.body)
            res.status(201).json(newMedic);

        }catch(err){
          console.error(err)
            res.status(404).json({message: err});
        }
          

        break;
      case 'PUT':
        // Lógica para manejar PUT
        const updatedPost = req.body; // Supón que tienes un post a actualizar
        res.status(200).json({ posts: 'Post actualizado', post: updatedPost });
        break;
      case 'DELETE':
        // Lógica para manejar DELETE
        const { id } = req.query // Obtener el ID del post a eliminar
        await deleteMedicById(id)
        const medicsUpdatedList = await getAllMedics()
        res.status(200).json(medicsUpdatedList);
        
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  