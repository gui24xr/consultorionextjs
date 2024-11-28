import { syncAndConnectDatabase, Medic, Specialty, database, PersonalData, AddressData, ConsultationService, Appointment, Patient, ConsultingRoom, Reservation } from "../../lib/db/database.index";



async function getAllAppointments(){
    try{
        const appointments = await Appointment.findAll({
          include:[
            {model: Reservation, as: 'reservation',include:[{model:Patient,include:[{model:PersonalData, as: 'personalData'}]}]},
            { 
            model: ConsultationService, 
            as:'consultationServiceData', 
            include:[{
              model:ConsultingRoom
            },{model:Medic, as:'medicData',include:{model:PersonalData, as:'personalData'}},
      ] 
          },
               
          ]})
          return appointments
    }catch(err){
      throw err
    }
}



async function getAppointmentById(appointmentId){
    try{
      const searchedAppointment = await Appointment.findByPk(appointmentId,{
        include:[
          {model: Reservation},
          { 
          model: ConsultationService, 
          as:'consultationServiceData', 
          include:[{
            model:ConsultingRoom
          },{model:Medic, as:'medicData',include:{model:PersonalData, as:'personalData'}},
    ] 
        },
             
        ]})
            return searchedAppointment
    }catch(err){
      throw err
    }
  }
    async function createAppointment(data){
      try{
         const {consultationServiceId,date,hour,appointmentType} = data
         //Por default se crea en disponible el turno ya que se crea sin patient
         //Solo se crea un turno disponinle y para un medicService o consultarionService
  
        const newAppointment = await Appointment.create({consultationServiceId,date,hour, appointmentType},{raw:true})
        if (!newAppointment) throw new Error("Error creando turno...")
        //Reutilizo codigo asi se devolveran todos los medicos. 
        const createdAppointment = await getAppointmentById(createAppointment.appointmentId)
        return createdAppointment
  
      }catch(err){
        throw err
      }
    }

    
  async function deleteAppointmentById(appointmentId){
    try{
      await Appointment.destroy({where:{appointmentId:appointmentId}})
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
        const appointments = await getAllAppointments()
        res.status(200).json(appointments);
        break;
      case 'POST':
        // Lógica para manejar POST
        try{
            const newAppointment = await createAppointment(req.body)
            res.status(201).json(newAppointment);

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
        await deleteAppointmentById(id)

        res.status(200).send("Borrado con existo")
        
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  