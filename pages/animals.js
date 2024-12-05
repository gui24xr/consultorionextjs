import React,{useEffect}from 'react';
import { useStoreAnimals } from '../store/useStoreAnimals';

const Animals = () => {

    const {listaAnimales, fetchAnimals} = useStoreAnimals()
    
    useEffect(()=>{
        fetchAnimals()
    },[])



    return (
        <div>
            <p>Esta es la page animals</p>
            {
                listaAnimales.map(item => (<p>{item.id}   {item.nombre}</p>))
            }
        </div>
    );
}

export default Animals;

/*
  {
                listaAnimales.map(item => (<p>{item}</p>))
            }
*/