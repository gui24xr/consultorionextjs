
import { syncAndConnectDatabase } from "../../lib/db/database.index";
import { SpecialtiesRepository } from "../../repositories/SpecialtiesRepository";

  
const specialtiesRepository = new SpecialtiesRepository()

  export default async function handler(req, res) {
    syncAndConnectDatabase()
    
    switch (req.method) {
      case 'GET':
        // Lógica para manejar GET
        const specialties =  await specialtiesRepository.getAll()
        res.status(200).json(specialties);
        break;
      case 'POST':
        // Lógica para manejar POST
        const created = await specialtiesRepository.create(req.body)
        res.status(201).json(created);
        break;
      case 'PUT':
        break;
      case 'DELETE':
        const { id } = req.query // Obtener el ID del post a eliminar
        const result = await specialtiesRepository.deleteById(id)
        if (result > 0) res.status(200).json({message:'Eliminado con exito...'});
        else res.status(500).json({message:'Registro no eliminado...'});
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  