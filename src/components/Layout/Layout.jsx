import Sidebar from "../Sidebar/Sidebar";

function Layout({ children, ativo }) {
  return (
    <div className="d-flex vh-100">
      <Sidebar ativo={ativo} />

      <div className="flex-grow-1 p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
