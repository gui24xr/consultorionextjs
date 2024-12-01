
import { syncAndConnectDatabase, Reservation,Medic,  Appointment,Patient,PersonalData, ConsultationService } from "../../lib/db/database.index";

  


async function deleteReservationById(reservationId){
  try{
    await Reservation.destroy({where:{reservationId:reservationId}})
    /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/
    
  }catch(err){
    console.err(err)
    throw err
  }
}


async function getAllReservations(){
  try{
      const Reservations = await Reservation.findAll({
        include:[ 
            {model: Patient, include:[{model:PersonalData, as:'personalData'}] },
           {model: Appointment, include:[{model: ConsultationService, as: 'consultationServiceData'}]}
                   
                  ]})
        return Reservations
  }catch(err){
    throw err
  }
}

async function getReservationById(reservationId){
  try{
    const searchedReservation = Reservation.findByPk(reservationId,{
        include:[ 
            {model: Patient },
           {model: Appointment}
                  
                  ]})
    return searchedReservation
    }catch(err){
      throw(err)
  }
}

async function createReservation(data){
  try{
    const newReservation = await Reservation.create(data)
    const createdReservation = await getReservationById(newReservation.reservationId)
    return createdReservation
  }catch(err){
      throw err
    }
}

  export default async function handler(req, res) {
    syncAndConnectDatabase()
    switch (req.method) {
      case 'GET':
        // Lógica para manejar GET
        const reservations = await getAllReservations()
        res.status(200).json(reservations);
        break;
      case 'POST':
        // Lógica para manejar POST
        const newReservation = await createReservation(req.body)
        res.status(201).json(newReservation);
        break;
     
      case 'DELETE':
        const { id } = req.query // Obtener el ID del post a eliminar
        await deleteReservationById(id)
        const updatedList = await getAllReservations()
        res.status(200).json(updatedList);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  