
import { syncAndConnectDatabase } from "../../lib/db/database.index";
import { AppointmentsRepository } from "../../repositories/AppointmentsRepository";

  
const appointmentsRepository = new AppointmentsRepository()

  export default async function handler(req, res) {
    syncAndConnectDatabase()
    
    switch (req.method) {
      case 'GET':
        // Lógica para manejar GET
        const appointments =  await appointmentsRepository.getAll()
        res.status(200).json(appointments);
        break;
      case 'POST':
        const created = await appointmentsRepository.create(req.body)
        res.status(201).json(created);
        break;
      case 'PUT':
        break;
      case 'DELETE':
        const { id } = req.query // Obtener el ID del post a eliminar
        const result = await appointmentsRepository.deleteById(id)
        if (result > 0) res.status(200).json({message:'Eliminado con exito...'});
        else res.status(500).json({message:'Registro no eliminado...'});
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  