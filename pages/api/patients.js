// pages/api/posts.js
//EJEMPLO USANDO UN ARRAY


import { syncAndConnectDatabase, Medic, Specialty, database, PersonalData, AddressData, Patient, Reservation, PatientHealthProvider } from "../../lib/db/database.index";
  
  

async function getAllPatients(){
  try{
      const patients = await Patient.findAll({
        include:[ 
                  {model: Reservation, as: 'reservationsList'},
                  {model: PersonalData, as:'personalData', include:{model:AddressData, as:'addressData'}},
                  {model: PatientHealthProvider, as: 'healthProvidersList'}
                 
                ]})
        return patients
  }catch(err){
    throw err
  }
}
async function getPatientById(patientId){
  try{
    const searchedPatient = await Patient.findByPk(patientId,{
      include:[ 
        {model: Reservation, as: 'reservationsList'},
        {model: PersonalData, as:'personalData', include:{model:AddressData, as:'addressData'}},
        {model: PatientHealthProvider, as: 'healthProvidersList'}
       
      ]})
          return searchedPatient
  }catch(err){
    throw err
  }
}
  async function createPatient(data){
    try{
      const {dni, firstName,lastName,patientRecord,dateOfBirth,dateOfRegistration} = data

      const patientsTable = {patientRecord,dateOfBirth,dateOfRegistration}
      const personalDataTable = {dni,firstName,lastName}
      const addressDataTable = {}
      
      //Abro el transaction
      const dbTransaction =  await database.transaction()

      const newPatient = await Patient.create(patientsTable,{raw:true})
      if (!newPatient) throw new Error("Error creando patient data...")

      const newPersonalData = await PersonalData.create({...personalDataTable,patientId:newPatient.patientId},{raw:true})
      if (!newPersonalData) throw new Error("Error creando personal data de patient...")

  
      await AddressData.create({...addressDataTable,personalDataId: newPersonalData.personalDataId})
      //cierro el transactioon
     await dbTransaction.commit()
     
  
      //Reutilizo codigo asi se devolveran todos los medicos. 
      const createdPatient = await getPatientById(newPatient.patientId)
      return createdPatient

    }catch(err){
      await dbTransaction.rollback()
     console.error(err)
      throw err
    }
  }


  async function deletePatientById(patientId){
    try{
      await Patient.destroy({where:{patientId:patientId}})
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
        const patients = await getAllPatients()
      res.status(200).json(patients);
        break;
      case 'POST':
        // Lógica para manejar POST
        try{
          const newPatient = await createPatient(req.body)
          res.status(201).json(newPatient);

      }catch(err){
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
        const { id } = req.query; // Obtener el ID del post a eliminar
        await deletePatientById(id)
        res.status(200).json({ posts: `Post con ID ${id} eliminado` });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  }


  
const postsArray = [
    {
      id: 1,
      title: "Primer Post",
      content: "Este es el contenido del primer post.",
      author: "Autor Uno",
    },
    {
      id: 2,
      title: "Segundo Post",
      content: "Aquí se encuentra el contenido del segundo post.",
      author: "Autor Dos",
    },
    {
      id: 3,
      title: "Tercer Post",
      content: "Contenido del tercer post, muy interesante.",
      author: "Autor Tres",
    },
    {
      id: 4,
      title: "Cuarto Post",
      content: "El cuarto post es sobre Next.js y sus características.",
      author: "Autor Cuatro",
    },
    {
      id: 5,
      title: "Quinto Post",
      content: "Este es el último post de nuestra lista de ejemplo.",
      author: "Autor Cinco",
    },
  ];
  