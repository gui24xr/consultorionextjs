
import SpecialtiesList from '../components/SpecialtiesList';
import CreateSpecialtyForm from '../components/CreateSpecialtyForm';

export default function Especialidades() {
 

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Especialidades</h1>
       <CreateSpecialtyForm/>
        <SpecialtiesList />
      

      
    </div>
  );
}
