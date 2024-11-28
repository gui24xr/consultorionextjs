

import { syncAndConnectDatabase, ClinicBranch, ConsultingRoom, ConsultationService  } from "../../lib/db/database.index";

  


async function deleteConsultingRoomById(ConsultingRoomId){
  try{
    await ConsultingRoom.destroy({where:{consultingRoomId:ConsultingRoomId}})
    /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/   
  }catch(err){
    console.err(err)
    throw err
  }
}


async function getAllConsultingRooms(){
  try{
      const ConsultingRooms = await ConsultingRoom.findAll({
        include:[ 
          {model: ClinicBranch/* , as:'consultingRoomsList'*/},
          {model: ConsultationService, as:'consultationServiceList'}
                 
                ]})
        return ConsultingRooms
  }catch(err){
    throw err
  }
}

async function getConsultingRoomById(ConsultingRoomId){
  try{
    const searchedConsultingRoom = ConsultingRoom.findByPk(ConsultingRoomId,{
        include:[ 
            {model: ClinicBranch/* , as:'consultingRoomsList'*/}
                   
                  ]
    })
    return searchedConsultingRoom
    }catch(err){
      throw(err)
  }
}

async function createConsultingRoom(data){
  try{
    const newConsultingRoom = await ConsultingRoom.create(data)
    const createdConsultingRoom = await getConsultingRoomById(newConsultingRoom.consultingRoomId)
    return createdConsultingRoom
  }catch(err){
      throw err
    }
}

  export default async function handler(req, res) {
    syncAndConnectDatabase()
    switch (req.method) {
      case 'GET':
        // Lógica para manejar GET
        const ConsultingRooms = await getAllConsultingRooms()
        res.status(200).json(ConsultingRooms);
        break;
      case 'POST':
        // Lógica para manejar POST
        const newConsultingRoom = await createConsultingRoom(req.body)
        res.status(201).json(newConsultingRoom);
        break;
      
      case 'DELETE':
        const { id } = req.query // Obtener el ID del post a eliminar
        await deleteConsultingRoomById(id)
        const updatedList = await getAllConsultingRooms()
        res.status(200).json(updatedList);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  