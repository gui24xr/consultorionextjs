import { database } from "./db";
import { Specialty } from "./models/Specialty.model"
import { Medic } from "./models/Medic.model";
import { PersonalData } from "./models/PersonalData.model";
import { AddressData } from "./models/AddressData.model";
import { Patient } from "./models/Patient.model";
import { ConsultationService } from "./models/ConsultationService.model";
import { Appointment } from "./models/Appointments";
import { ClinicBranch } from "./models/ClinicBranch.model";
import { ConsultingRoom } from "./models/ConsultingRoom.model";
import { Reservation } from "./models/Reservation.model";

// Al importar los models ya estamos haciendo el database.define de cada modelo


// Establecer las relaciones
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

  //---------------------------------
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
    
  //---------------------------------

  //--------------------------------------

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

  //---------------------------------------------------

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

  //---------------------------------------------------

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

//Ahora aca sincronizo la base de datos
database.sync({alter:true}) //Aca sincronizamos con los modelos y relaciones.

//------------------------------------------------------------------------------
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

//------------------------------------------
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


/*
Appointment.hasOne(Patient,{
  foreignKey: 'appointmentId',
  sourceKey: 'appointmentId',
  as: 'patientData',
  onDelete: 'SET NULL'
})
*/
//-----------------------------------------------------------
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
//

/*
Appointment.belongsTo(Reservation,{
  foreignKey: 'appointmentId',
  targetKey: 'reservationId'
})
*/

//

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
 
 // as: 'appointmentData'
})




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
  Reservation
}
