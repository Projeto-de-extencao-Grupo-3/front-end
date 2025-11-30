import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex">
      {/* Usado para deixar a sidebar fixa sempre a esquerda*/}
      <Sidebar />

      {/* Aqui é o conteudo que sempre vai ficar a direita */}
      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
