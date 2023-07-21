// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { handleLogout } from "@store/authentication";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import Loader from "react-js-loader";

// ** Default Avatar Image
// import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import pro_picture from "../../../../assets/imgs/download.png";
import axios from "axios";
import { toast } from "react-hot-toast";
// <img src={logo} />
const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("userRole"));

  // ** State
  const [userData, setUserData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(sessionStorage.getItem("userRole")));
    }
  }, []);

  const onSubmit = () => {
    setLoading(true);
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/logout",
    };

    axios(config).then(function (response) {
      if (response.status === 200) {
        dispatch(handleLogout());
        toast.success(response.data.message);
        setLoading(false);
        navigate("/login");
      } else if (response.status === 400) {
        toast.error(response.data.message);
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    });
  };

  //** Vars
  const userAvatar = (userData && userData.avatar) || pro_picture;
  // const str = user.role;
  // const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return loading ? (
    <Loader type="spinner-default" bgColor={"#42b983"} size={40} />
  ) : (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        tag="a"
        className="nav-link dropdown-user-link"
        style={{
          padding: "5px",
          borderRadius: "14px",
          marginLeft: "10px",
          backgroundColor: isHovered ? "#f2f2f2" : "#fdfdfd",
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Avatar img={userAvatar} imgHeight="33" imgWidth="33" status="online" />
        <div
          className="user-nav d-sm-flex d-none"
          style={{ marginLeft: "10px" }}
        >
          {/* <span className="user-name fw-bold"></span> */}
          <span
            className="user-status"
            style={{
              color: "#000",
              fontSize: "16px",
              fontWeight: "600",
              // marginTop: "13px",
            }}
          >
            {user.role === "admin" || user.role === "Admin"
              ? "Admin"
              : "Dealer"}
          </span>
        </div>
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/pages/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        <DropdownItem onClick={() => onSubmit()}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
