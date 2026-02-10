import Sidebar from "../Sidebar/Sidebar";
import ZoomButtons from "../ZoomButtons/ZoomButtons";

function Layout({ children, ativo }) {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar ativo={ativo} />

      <div className="flex-grow-1 p-4">
        {children}
        <ZoomButtons />
      </div>
    </div>
  );
}

export default Layout;
