
import { syncAndConnectDatabase, PatientHealthProvider, HealthProvider,Patient, PersonalData } from "../../lib/db/database.index";


async function deletePatientHealthProviderById(id) {
  try {
    await PatientHealthProvider.destroy({ where: { patientHealthProviderId: id } })
    /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/
  } catch (err) {
    console.err(err)
    throw err
  }
}


async function getAllPatientHealthProviders() {
  try {
    const result = await PatientHealthProvider.findAll({
      include: [
        {model: HealthProvider },
        {model: Patient, include:[{model: PersonalData, as:"personalData"}]}
      ]
    })
    return result
  } catch (err) {
    throw err
  }
}


async function getHealthProviderById(id) {
  try {
    const result = PatientHealthProvider.findByPk(id, {
        include: [
            {model: HealthProvider },
            {model: Patient, include:[{model: PersonalData, as:"personalData"}]}
          ]
    })
    return result
  } catch (err) {
    throw (err)
  }
}

async function createPatientHealthProvider(data) {
  try {
    const newHealthProvider = await PatientHealthProvider.create(data)
    const createdHealthProvider = await getHealthProviderById(newHealthProvider.patientHealthProviderId)
    return createdHealthProvider
  } catch (err) {
    throw err
  }
}

export default async function handler(req, res) {
  syncAndConnectDatabase()
  switch (req.method) {
    case 'GET':
      // Lógica para manejar GET
      const healthProviders = await getAllPatientHealthProviders()
      res.status(200).json(healthProviders);
      break;
    case 'POST':
      // Lógica para manejar POST
      const created = await createPatientHealthProvider(req.body)
      res.status(201).json(created);
      break;

    case 'DELETE':
      const { id } = req.query // Obtener el ID del post a eliminar
      await deletePatientHealthProviderById(id)
      const updatedList = await getAllPatientHealthProviders()
      res.status(200).json(updatedList);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}


