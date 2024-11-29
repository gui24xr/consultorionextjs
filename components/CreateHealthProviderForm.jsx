import React, {  useRef } from 'react';
import useStoreHealthProviders from '../store/useHealthProvidersStore';
import { faker } from '@faker-js/faker';

const CreateHealthProviderForm = () => {

    const {createHealthProvider}= useStoreHealthProviders()
    const formRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const formValues = Object.fromEntries(formData.entries())
        //Paso formValues xq los name del form coincidencon lo qu hay que enviar al api
        createHealthProvider(formValues)
    }

    
    const mockIt = () =>{
       const obraSocial = faker.helpers.arrayElement(obrasSociales)
       formRef.current.providerName.value = obraSocial.obraSocial
       formRef.current.planName.value = obraSocial.plan
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Crear Obra social</h1>
        <form onSubmit={handleSubmit}
          ref ={formRef}
        >
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="providerName">Proveedor</label>
            <input
              type="text"
              id="providerName"
              name="providerName"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="planName">Plan</label>
            <input
              type="text"
              id="planName"
              name="planName"
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
          <p>Habilitado:</p>
          <input type="radio" id="enabledtrue" name="status" value="Habilitado"/>
          <label for="enabled">Habilitada</label><br/>
          <input type="radio" id="enabledfalse" name="status" value="Inhabilitado"/>
          <label for="css">Inhabilitada</label><br/>
        </div>
  
  
       
  
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              width: '100%'
            }}
          >
            Crear Obra Social
          </button>
        </form>
        <button
            type="button"
            onClick={mockIt}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px',
              width: '100%'
            }}
          >
            Mockear Datos
          </button>
      </div>
    );
}

export default CreateHealthProviderForm;


const obrasSociales = [
    { obraSocial: "Galeno", plan: "Plan Verde" },
    { obraSocial: "OSDE", plan: "Plan 310" },
    { obraSocial: "Previsión", plan: "Plan Familiar" },
    { obraSocial: "Federada Salud", plan: "Plan Oro" },
    { obraSocial: "Medicus", plan: "Plan Avanzado" },
    { obraSocial: "IOMA", plan: "Plan Básico" },
    { obraSocial: "Swiss Medical", plan: "Plan Premium" },
    { obraSocial: "OSDE", plan: "Plan 210" },
    { obraSocial: "Unión Personal", plan: "Plan Super" },
    { obraSocial: "Omint", plan: "Plan Platinum" },
    { obraSocial: "Galeno", plan: "Plan Azul" },
    { obraSocial: "Sancor Salud", plan: "Plan Plus" },
    { obraSocial: "Medicard", plan: "Plan Ahorro" },
    { obraSocial: "La Caja de Ahorro", plan: "Plan Integral" },
    { obraSocial: "Medifé", plan: "Plan Premium Plus" }
  ];
  