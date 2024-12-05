
import { syncAndConnectDatabase, Medic, PersonalData, , ConsultationService,ConsultingRoom } from "../../lib/db/database.index";



const joinList = [ 
    {model:ConsultingRoom},
    {model:Medic, include:{model:PersonalData}}     
]

async function getAllConsultationService(){
    try{
        const consultationServices = await ConsultationService.findAll({
          include:joinList},
                )
          return consultationServices
    }catch(err){
      throw err
    }
}



async function getConsultationServiceById(consultationServiceId){
    try{
      const searchedConsultationService = await ConsultationService.findByPk(consultationServiceId,{
        include:joinList})
            return searchedConsultationService
    }catch(err){
      throw err
    }
  }
    async function createConsultationService(data){
      try{
         const {serviceName,specialtyId,medicId,consultingRoomId} = data

         console.log(data)

        const newConsultationService = await ConsultationService.create(data,{raw:true})
        if (!newConsultationService) throw new Error("Error creando servicio de consultorio...")
        //Reutilizo codigo asi se devolveran todos los medicos. 
        const createdConsultationService = await getConsultationServiceById(newConsultationService.id)
        return createdConsultationService
  
      }catch(err){
        throw err
      }
    }

    
  async function deleteConsultationServiceById(consultationServiceId){
    try{
      await ConsultationService.destroy({where:{id:consultationServiceId}})
      /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/
      
    }catch(err){
      console.error(err)
      throw err
    }
  }



//---------------------------------------------

export default async function handler(req, res) {
    syncAndConnectDatabase()
    switch (req.method) {
      case 'GET':
        const consultationServices = await getAllConsultationService()
        res.status(200).json(consultationServices);
        break;
      case 'POST':
        // Lógica para manejar POST
        try{
            const newConsultationService = await createConsultationService(req.body)
            res.status(201).json(newConsultationService);

        }catch(err){
          console.error(err)
            res.status(404).json({message: err});
        }
          
        break;
      case 'PUT':
        // Lógica para manejar PUT
        /*
        const updatedPost = req.body; // Supón que tienes un post a actualizar
        res.status(200).json({ posts: 'Post actualizado', post: updatedPost });
        */
        break;
      case 'DELETE':
        // Lógica para manejar DELETE
        const { id } = req.query // Obtener el ID del post a eliminar
        await deleteConsultationServiceById(id)

        res.status(200).send("Borrado con existo")
        
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  