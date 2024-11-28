import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar /> {/* Barra de navegación común */}
      <main>{children}</main> {/* Aquí se renderiza el contenido específico de cada página */}
    </>
  );
};

export default Layout;
