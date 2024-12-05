import { syncAndConnectDatabase, Medic, Specialty, database, PersonalData, AddressData, ConsultationService, Patient, ConsultingRoom, Reservation, ClinicHistoryItem } from "../../lib/db/database.index";

 
class CustomRepository{
        constructor(model,joinList){
        this.model = model,
        this.joinList = joinList
    }
    async  getAll(){
        try{
            const result = await this.model.findAll({
              include: this.joinList
            })
              return result
        }catch(err){
          throw err
        }
    }
   
    async  getById(id){
        try{
          const searched = await this.model.findByPk(id,{
            include:this.joinList
        })
            return searched
        }catch(err){
          throw err
        }
      }
        async  create(data){
          try{
            // const {} = data
           
            const createdResult = await this.model.create({...data},{raw:true})
            if (!createdResult) return null
            
          }catch(err){
            throw err
          }
        }
    
        
      async  deleteById(id){
        try{
          await this.model.destroy({where:{id:id}})    
        }catch(err){
          console.error(err)
          throw err
        }
      }
    }





const joinList = [
  {model:Patient, include:{model:PersonalData}},
  {model:Medic, include:{model:PersonalData}}
]
//---------------------------------------------

export default async function handler(req, res) {
    syncAndConnectDatabase()
    const clinicsHistoriesRepository = new CustomRepository(ClinicHistoryItem,joinList)
    switch (req.method) {
      case 'GET':
        //Este endpoint devuelve todos los registros.
        try{
            const result = await clinicsHistoriesRepository.getAll()
            res.status(200).json(result);
        }catch(err){
            console.error(err)
            throw err
        }
        break;
      case 'POST':
        // Este metodo crea y devuelve con los joins
        try{
            const createdClinicHistoryItem = await clinicsHistoriesRepository.create(req.body)
            if (!createdClinicHistoryItem) return new Error("Error al crear item de historia clinica.")
            //Como fue creado y lo quiero devolver con joins, y mi metodoo getBy lo devuelve con los joins
            const newClinicHistoryItem = await clinicsHistoriesRepository.getById(newClinicHistoryItem.id)
            res.status(201).json(newClinicHistoryItem);

        }catch(err){
          console.error(err)
           res.status(404).json({message: err});
        }
          
        break;
      case 'PUT':
       //Aun no implementado
        break;
      case 'DELETE':
        // Este metodo solo borra, y si hay error devuevle excepcion
        const { id } = req.query // Obtener el ID del post a eliminar
        await clinicsHistoriesRepository.deleteById(id)
        res.status(200).send("Borrado con existo")
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  