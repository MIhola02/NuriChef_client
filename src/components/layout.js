import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ openModal }) => {
  return (
    <>
      <Navbar openModal={openModal} />
      <div style={bodyStyle()}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle()}>
        © Michal Horazny
      </div>
    </>
  );
};

function bodyStyle() {
  return {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "white 4px solid",
    borderBottom: "white 4px solid",
  };
}

function footerStyle() {
  return { padding: "8px", textAlign: "center", backgroundColor: "black " };
}

export default Layout;
