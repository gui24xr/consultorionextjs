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
import { MedicHealthProvider } from "./models/MedicHealthProvider.js";
// Al importar los models ya estamos haciendo el database.define de cada modelo


/* RELACIONES ----------------------------------------------------------------------------------*/

ClinicBranch.hasMany(ConsultingRoom,{
  foreignKey: 'clinicBranchId', 
  sourceKey: 'id',  
})

ConsultingRoom.belongsTo(ClinicBranch,{
  foreignKey: 'clinicBranchId', 
  targetKey: 'id',   
})


ClinicBranch.hasOne(AddressData,{
  foreignKey: 'clinicBranchId', 
  sourceKey: 'id',  
})

AddressData.belongsTo(ClinicBranch,{
  foreignKey: 'clinicBranchId',
  targetKey: 'id',   
})


Specialty.hasMany(Medic, {
    foreignKey: 'specialtyId', 
    sourceKey: 'id',   
  });
  
  Medic.belongsTo(Specialty, {
    foreignKey: 'specialtyId', 
    targetKey: 'id',   
  });



Medic.hasOne(PersonalData,{
    foreignKey: 'medicId', 
    sourceKey: 'id',   
})

PersonalData.belongsTo(Medic,{
    foreignKey: 'medicId',
    targetKey: 'id',
  
  })

 
PersonalData.hasOne(AddressData,{
    foreignKey: 'personalDataId',
    sourceKey: 'id',
  
  })

AddressData.belongsTo(PersonalData,{
    foreignKey:  'personalDataId',
    targetKey: 'id',
  })


Patient.hasOne(PersonalData,{
    foreignKey: 'patientId', 
    sourceKey: 'id',   
})

PersonalData.belongsTo(Patient,{
    foreignKey: 'patientId', 
    targetKey: 'id',   
  })


Medic.hasMany(ConsultationService,{
  foreignKey: 'medicId',
  sourceKey: 'id'
})

ConsultationService.belongsTo(Medic,{
  foreignKey: 'medicId',
  targetKey: 'id'
})


ConsultationService.hasMany(Appointment,{
  foreignKey: 'consultationServiceId',
  sourceKey: 'id'
})

Appointment.belongsTo(ConsultationService,{
  sourceKey: 'consultationServiceId',
  targetKey: 'id'
})

ConsultingRoom.hasMany(ConsultationService,{
 foreignKey: 'consultingRoomId', 
  sourceKey: 'id',  
  
})

ConsultationService.belongsTo(ConsultingRoom,{
 foreignKey: 'consultingRoomId', 
  targetKey: 'id',  
})
  
//--- aca empieza errores

Patient.hasMany(Reservation,{
  foreignKey: 'patientId',
  sourceKey: 'id',
})

Reservation.belongsTo(Patient,{
  foreignKey: 'patientId',
  targetKey: 'id'
})

Appointment.hasOne(Reservation,{
  foreignKey: 'appointmentId',
  sourceKey: 'id',
})

Reservation.belongsTo(Appointment,{
  foreignKey: 'appointmentId',
  targetKey: 'id',
})



Patient.hasMany(ClinicHistoryItem,{
  foreignKey: 'patientId',
  sourceKey: 'id'
})

ClinicHistoryItem.belongsTo(Patient,{
  sourceKey: 'patientId',
  targetKey:'id'
})


Medic.hasMany(ClinicHistoryItem,{
  foreignKey: 'medicId',
  sourceKey: 'id'
})

ClinicHistoryItem.belongsTo(Medic,{
  sourceKey: 'medicId',
  targetKey:'id'
})


Patient.hasMany(PatientHealthProvider,{
  foreignKey: 'patientId',
  sourceKey: 'id',
})

PatientHealthProvider.belongsTo(Patient,{
  foreignKey: 'patientId',
  targetKey: 'id',
})


HealthProvider.hasMany(PatientHealthProvider,{
  foreignKey: 'healthProviderId',
  sourceKey: 'id'
})

PatientHealthProvider.belongsTo(HealthProvider,{
  foreignKey: 'healthProviderId',
  targetKey: 'id'
})

//-------

Medic.hasMany(MedicHealthProvider,{
  foreignKey: 'medicId',
  sourceKey: 'id',
})

MedicHealthProvider.belongsTo(Medic,{
  foreignKey: 'medicId',
  targetKey: 'id',
})


HealthProvider.hasMany(MedicHealthProvider,{
  foreignKey: 'healthProviderId',
  sourceKey: 'id'
})

MedicHealthProvider.belongsTo(HealthProvider,{
  foreignKey: 'healthProviderId',
  targetKey: 'id'
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
  ClinicHistoryItem,
  MedicHealthProvider
}
