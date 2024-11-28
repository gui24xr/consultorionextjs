import Link from 'next/link'; 
import "./styles/NavBar.css"


const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul >
        <li><Link href="/">Home</Link></li>
        <li><Link href="/appointments">Turnos</Link></li>
        <li><Link href="/consultationservices">Servicios</Link></li>
                
        <li><Link href="/medics">Medicos</Link></li>
        <li><Link href="/patients">Pacientes</Link></li>
        <li><Link href="/rooms">Consultorios</Link></li>
        <li><Link href="/specialties">Especialidades</Link></li>

      </ul>
    </nav>
  );
};

export default Navbar;
