
import { syncAndConnectDatabase, ClinicBranch, ConsultingRoom, ConsultationService,Medic,PersonalData  } from "../../lib/db/database.index";

  
const joinList =[ 
  {model: ConsultingRoom, include: [{model:ConsultationService,include:{model:Medic,include:{model:PersonalData}}}] }
         ]


async function deleteClinicBranchById(clinicBranchId){
  try{
    await ClinicBranch.destroy({where:{id:clinicBranchId}})
    /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/   
  }catch(err){
    console.err(err)
    throw err
  }
}


async function getAllClinicBranchs(){
  try{
      const clinicBranchs = await ClinicBranch.findAll({
        include:joinList})
        return clinicBranchs
  }catch(err){
    throw err
  }
}

async function getClinicBranchById(ClinicBranchId){
  try{
    const searchedClinicBranch = ClinicBranch.findByPk(ClinicBranchId,{
        include:joinList
    })
    return searchedClinicBranch
    }catch(err){
      throw(err)
  }
}

async function createClinicBranch(data){
  try{
    const newClinicBranch = await ClinicBranch.create(data)
    const createdClinicBranch = await getClinicBranchById(newClinicBranch.clinicBranchId)
    return createdClinicBranch
  }catch(err){
      throw err
    }
}

  export default async function handler(req, res) {
    syncAndConnectDatabase()
    switch (req.method) {
      case 'GET':
        // Lógica para manejar GET
        const clinicBranchs = await getAllClinicBranchs()
        res.status(200).json(clinicBranchs);
        break;
      case 'POST':
        // Lógica para manejar POST
        const newClinicBranch = await createClinicBranch(req.body)
        res.status(201).json(newClinicBranch);
        break;
      
      case 'DELETE':
        const { id } = req.query // Obtener el ID del post a eliminar
        await deleteClinicBranchById(id)
        const updatedList = await getAllClinicBranchs()
        res.status(200).json(updatedList);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  