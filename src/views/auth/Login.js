// ** React Imports
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import themeConfig from "@configs/themeConfig";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import axios from "axios";
// import AxiosMockAdapter from "axios-mock-adapter";

// ** Third Party Components
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
  X,
} from "react-feather";

// ** Actions
import { handleLogin, handleUser } from "@store/authentication";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";

// ** Utils
import { getHomeRouteForLoggedInUser } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  UncontrolledTooltip,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

const ToastContent = ({ t, name, role }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>You have successfully logged In.</span>
      </div>
    </div>
  );
};

const Login = () => {
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const [loginEmail, setLoginEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    var data = {
      email: loginEmail,
      password: password,
    };

    var config = {
      method: "post",
      url: " https://rdbapi.vnvserver.com/login",
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          const token = response.data.token;

          //set JWT token to local
          sessionStorage.setItem("token", token);

          //set token to axios common header
          const data = {
            ...response.data.userData,
            accessToken: response.data.token,
            refreshToken: response.data.token,
          };
          let permission = [];
          if (
            response.data.role !== "user" ||
            response.data.role !== "Dealer"
          ) {
            permission = [
              {
                action: "manage",
                subject: "all",
              },
            ];
          } else {
            permission = [
              {
                action: "read",
                subject: "ACL",
              },
              {
                action: "read",
                subject: "Auth",
              },
            ];
          }
          ability.update(permission);
          //dispatch(handleLogin(data));
          //dispatch(handleUser(response.data.data));

          // navigate(getHomeRouteForLoggedInUser(response.data.data.role));
          toast((t) => <ToastContent t={t} role={data.role || "admin"} />);
        } else if (response.data.status === 401) {
          toast.error(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })

      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#2d3a4b",
      }}
    >
      <Row className=" auth-bg p-5 ">
        <Col className="pl-5">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                height: "40%",
                width: "40%",
                marginBottom: "5%",
              }}
              src={themeConfig.app.appLogoImage}
              alt="Login Cover"
            />
          </div>
          <Col className="align-items-center " sm="12" md="12" lg="12">
            <Form
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
              style={{ marginInlineStart: "15%", marginInlineEnd: "15%" }}
            >
              <div
              //   className="mb-1"
              >
                <Label className="" for="login-email">
                  Email
                </Label>

                <Input
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Input
                  style={{ marginBottom: "5px" }}
                  className="input-group-merge"
                  id="login-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Button type="submit" color="primary" onClick={onSubmit}>
                  LogIn
                </Button>
              </div>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
