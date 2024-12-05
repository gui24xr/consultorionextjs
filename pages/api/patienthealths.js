
import { syncAndConnectDatabase } from "../../lib/db/database.index";
import { PatientsHealthsProvidersRepository } from "../../repositories/PatientsHealthsProvidersRepository";

  
const patientsHealthsProvidersRepository = new PatientsHealthsProvidersRepository()

  export default async function handler(req, res) {
    syncAndConnectDatabase()
    
    switch (req.method) {
      case 'GET':
        // Lógica para manejar GET
        const getResults =  await patientsHealthsProvidersRepository.getAll()
        res.status(200).json(getResults);
        break;
      case 'POST':
        // Lógica para manejar POST
        const created = await patientsHealthsProvidersRepository.create(req.body)
        res.status(201).json(created);
        break;
      case 'PUT':
        break;
      case 'DELETE':
        const { id } = req.query // Obtener el ID del post a eliminar
        const result = await patientsHealthsProvidersRepository.deleteById(id)
        if (result > 0) res.status(200).json({message:'Eliminado con exito...'});
        else res.status(500).json({message:'Registro no eliminado...'});
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  