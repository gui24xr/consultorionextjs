
import { syncAndConnectDatabase, HealthProvider, PatientHealthProvider } from "../../lib/db/database.index";


async function deleteHealthProviderById(healthProviderId) {
  try {
    await HealthProvider.destroy({ where: { healthProviderId: healthProviderId } })
    /*Probableente habria que borrar a mano la data personal y el addresData, queda en suspenso...*/

  } catch (err) {
    console.err(err)
    throw err
  }
}


async function getAllHealthProviders() {
  try {

    const healthProviders = await HealthProvider.findAll({
      include: [
        {model: PatientHealthProvider ,  as: 'patientsList'}

      ]
    })
    return healthProviders
  } catch (err) {
    throw err
  }
}

async function getHealthProviderById(healthProviderId) {
  try {
    const searchedHealthProvider = HealthProvider.findByPk(healthProviderId, {
      include: [
        {model: PatientHealthProvider ,  as: 'patientsList'}

      ]
    })
    return searchedHealthProvider
  } catch (err) {
    throw (err)
  }
}

async function createHealthProvider(data) {
  try {
    const newHealthProvider = await HealthProvider.create(data)
    const createdHealthProvider = await getHealthProviderById(newHealthProvider.healthProviderId)
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
      const healthProviders = await getAllHealthProviders()
      res.status(200).json(healthProviders);
      break;
    case 'POST':
      // Lógica para manejar POST
      const newHealthProvider = await createHealthProvider(req.body)
      res.status(201).json(newHealthProvider);
      break;

    case 'DELETE':
      const { id } = req.query // Obtener el ID del post a eliminar
      await deleteHealthProviderById(id)
      const updatedList = await getAllHealthProviders()
      res.status(200).json(updatedList);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}


