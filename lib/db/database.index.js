import { database } from "./db.js";
import { Specialty } from "./models/Specialty.model.js"
import { Medic } from "./models/Medic.model.js";
import { PersonalData } from "./models/PersonalData.model.js";
import { AddressData } from "./models/AddressData.model.js";
import { Patient } from "./models/Patient.model.js";
import { ConsultationService } from "./models/ConsultationService.model.js";
import { Appointment } from "./models/Appointments.js";
import { ClinicBranch } from "./models/ClinicBranch.model.js";
import { ConsultingRoom } from "./models/ConsultingRoom.model.js";
import { Reservation } from "./models/Reservation.model.js";
import { HealthProvider } from "./models/HealthProvider.js";
import { PatientHealthProvider } from "./models/PatientHealthProvider.js";
import { ClinicHistoryItem } from "./models/ClinicHistoryItem.model.js";
// Al importar los models ya estamos haciendo el database.define de cada modelo


/* RELACIONES ----------------------------------------------------------------------------------*/

Specialty.hasMany(Medic, {
    foreignKey: 'specialtyId', // La clave foránea en Medic
    sourceKey: 'specialtyId',   // La clave primaria en Specialty
    as: 'medics'
  });
  
  Medic.belongsTo(Specialty, {
    foreignKey: 'specialtyId', // La clave foránea en Medic
    targetKey: 'specialtyId',   // La clave primaria en Specialty
    //as: 'specialty',
    onDelete:'SET NULL',
    onUpdate: 'CASCADE'
  });


  ClinicBranch.hasMany(ConsultingRoom,{
    foreignKey: 'clinicBranchId', 
    sourceKey: 'clinicBranchId',  
    as: 'consultingRoomsList'
  })

  ConsultingRoom.belongsTo(ClinicBranch,{
    foreignKey: 'clinicBranchId', // La clave foránea en Medic
    targetKey: 'clinicBranchId',   // La clave primaria en Specialty
    //as: 'specialty',
    onDelete:'SET NULL',
    onUpdate: 'CASCADE'
  })
    

Medic.hasOne(PersonalData,{
    foreignKey: 'medicId', // La clave foránea en personalData
    sourceKey: 'medicId',   // La clave primaria en Medic
    as: 'personalData'
})

PersonalData.belongsTo(Medic,{
    foreignKey: 'personalDataId', // La clave foránea en PersonalData
    targetKey: 'medicId',   // La clave primaria en Medic
    //as: 'specialty',
    onDelete:'CASCADE', //A futuro restric ,
    onUpdate: 'CASCADE'
  })

 

  PersonalData.hasOne(AddressData,{
    foreignKey: 'personalDataId',
    sourceKey: 'personalDataId',
    as: 'addressData'
  })

  AddressData.belongsTo(PersonalData,{
    foreignKey:  'personalDataId',
    targetKey: 'addressDataId',
    onDelete:'CASCADE'
  })



  Patient.hasOne(PersonalData,{
    foreignKey: 'patientId', // La clave foránea en personalData
    sourceKey: 'patientId',   // La clave primaria en patient
    as: 'personalData'
})

PersonalData.belongsTo(Patient,{
    foreignKey: 'personalDataId', // La clave foránea en PersonalData
    targetKey: 'patientId',   // La clave primaria en Medic
    //as: 'specialty',
    onDelete:'CASCADE', //A futuro restric ,
    onUpdate: 'CASCADE'
  })


ConsultationService.hasOne(Medic,{
  foreignKey: 'medicId',
  sourceKey: 'medicId',
  as:'medicData'
})

Medic.belongsTo(ConsultationService,{
  foreignKey: 'medicId',
  targetKey: 'consultationServiceId'
})

ConsultationService.hasOne(Specialty,{
  foreignKey: 'specialtyId',
  sourceKey: 'specialtyId',
  as: 'specialtyData'
})


Appointment.hasOne(ConsultationService,{
  foreignKey: 'consultationServiceId',
  sourceKey: 'consultationServiceId',
  as: 'consultationServiceData',
  onDelete: 'CASCADE'
})

ConsultationService.belongsTo(Appointment,{
  foreignKey: 'consultationServiceId',
  sourceKey: 'appointmentId'
})



ConsultingRoom.hasMany(ConsultationService,{
  foreignKey: 'consultingRoomId', // La clave foránea en Medic
  sourceKey: 'consultingRoomId',   // La clave primaria en Specialty
  as: 'consultationServiceList'
})

ConsultationService.belongsTo(ConsultingRoom,{
  foreignKey: 'consultingRoomId', // La clave foránea en Medic
  targetKey: 'consultingRoomId',   // La clave primaria en Specialty
  //as: 'specialty',
  onDelete:'SET NULL',
  onUpdate: 'CASCADE'
})


Patient.hasMany(Reservation,{
  foreignKey: 'patientId',
  targetKey: 'patientId',
  as: 'reservationsList'
})

Reservation.belongsTo(Patient,{
  foreignKey: 'patientId',
  sourceKey: 'patientId'
  
})

Appointment.hasOne(Reservation,{
  foreignKey: 'appointmentId',
  targetKey: 'appointmentId',
  as: 'reservation',
  onDelete: 'CASCADE'
})


Reservation.belongsTo(Appointment,{
  foreignKey: 'appointmentId',
  sourceKey: 'appointmentId',
})


HealthProvider.hasMany(PatientHealthProvider,{
  foreignKey: 'healthProviderId',
  targetKey: 'healthProviderId',
  as: 'patientsList'
})

PatientHealthProvider.belongsTo(HealthProvider,{
  foreignKey: 'healthProviderId',
  sourceKey: 'healthProviderId'
  
})



Patient.hasMany(PatientHealthProvider,{
  foreignKey: 'patientId',
  targetKey: 'patientId',
  as: 'healthProvidersList'
})

PatientHealthProvider.belongsTo(Patient,{
  foreignKey: 'patientId',
  sourceKey: 'patientId'
  
})




/* SINCRONIZACION INSTANCIA database ---------------------------------------------------*/

  database.sync({alter:true}) 
//-----------------------------------------------------------------------------

let isConnected
async function syncAndConnectDatabase(){
    if (isConnected){
        console.log('La conexion a la base de datos se encuentra conectada...')
        return
    }  

    try{
        
        await database.authenticate()
        isConnected = true
        console.log('La conexion a la base de datos ah sido abierta...')
    }catch(error){
        console.log(error)
        throw(error)
    }
}


export {
  database, 
  ClinicBranch,
  ConsultingRoom,
  Medic,
  Specialty,
  PersonalData, 
  AddressData,
  Patient, 
  ConsultationService, 
  Appointment,
  syncAndConnectDatabase,
  Reservation,
  HealthProvider,
  PatientHealthProvider,
  ClinicHistoryItem
}
