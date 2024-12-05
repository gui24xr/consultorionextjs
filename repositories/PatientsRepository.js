
import { Patient,PersonalData, AddressData, Appointment, ConsultationService, Medic, PatientHealthProvider, HealthProvider, Reservation } from "../lib/db/database.index"

export class PatientsRepository{
  
model = Patient
joinList = [ 
   {model:PersonalData, include:{model:AddressData}},
   {model: Reservation, include:{model:Appointment,include:{model:ConsultationService,include:{model:Medic,include:{model:PersonalData}}}}},
   {model:PatientHealthProvider,  include:{model:HealthProvider}}
  
 ]

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
    const deletedCount = await this.model.destroy({where:{id:id}})    
    return deletedCount
   }catch(err){
     console.error(err)
     throw err
   }
 }
}


