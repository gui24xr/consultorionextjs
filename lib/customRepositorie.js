
export class CustomRepository{
    
    
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
          const searched = await this.model.findByPk(this.id,{
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
    
    