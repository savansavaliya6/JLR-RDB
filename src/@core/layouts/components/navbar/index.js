// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";

const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
      <footer
        style={{
          position: "fixed",
          // backgroundColor: "whitesmoke",
          width: "76%",
          bottom: "0",
          padding: "3px",
          // textAlign: "centerGridLayout",
        }}
        className="auth-footer-btn d-flex justify-content-center"
      >
        <small
          className="text-center ml-1"
          style={{
            letterSpacing: "4px",
            fontWeight: "400",
            color: "black",
            wordSpacing: "4px",
            fontSize: "1rem",
          }}
        >
          &copy;2023 Jaguar Land Rover South Africa
        </small>
      </footer>
    </Fragment>
  );
};

export default ThemeNavbar;
