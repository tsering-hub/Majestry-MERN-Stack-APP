import "./App.scss";
import Body from "./components/layout/Body";
import Header from "./components/layout/Header";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "./components/layout/AdminHeader";
import AdminBody from "./components/layout/AdminBody";
import ChefHeader from "./components/layout/ChefHeader";
import ChefBody from "./components/layout/ChefBody";
function App() {
  var mainbody;
  if (localStorage.getItem("userType") === "Chef") {
    mainbody = (
      <>
        <ChefHeader />
        <ChefBody />
      </>
    );
  } else if (localStorage.getItem("userType") === "Admin") {
    mainbody = (
      <>
        <AdminHeader>
          <AdminBody />
        </AdminHeader>
      </>
    );
  } else {
    mainbody = (
      <>
        <Header />
        <Body />
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <>{mainbody}</>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
