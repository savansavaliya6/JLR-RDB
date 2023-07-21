import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import themeConfig from "@configs/themeConfig";
import { useSkin } from "@hooks/useSkin";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import "./Login.css";
import { Coffee, X } from "react-feather";
import { handleLogin, handleUser } from "@store/authentication";
import { AbilityContext } from "@src/utility/context/Can";
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";
import { getHomeRouteForLoggedInUser } from "@utils";
import Loader from "react-js-loader";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Toast,
  CardTitle,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const [loginEmail, setLoginEmail] = useState(" ");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const updateApi = (token) => {

  //   var update = {
  //     method: "put",
  //     url: "https://rdbapi.vnvserver.com/specific/update/data",
  //     headers: {
  //       token: token,
  //     },
  //   };


  //   axios(update)
  //     .then(function (response) {
  //       if (response.data.status === 200) {

  //         // const data = {
  //         //   ...response.data.data,
  //         //   accessToken: response.data.token,
  //         //   refreshToken: response.data.token,
  //         // };
  //         console.log(response)
  //       }
  //     })
  //     .catch((error) => console.log(error));

  // }

  const onSubmit = () => {
    setLoading(true);
    if (loginEmail == "" && password == "") {
      toast.error("Please fill the form.");
      return;
    }

    var data = {
      email: loginEmail,
      password: password,
    };

    var config = {
      method: "post",
      url: "https://rdbapi.vnvserver.com/login",
      data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          const str =
            response.data.data.role === "user" ||
              response.data.data.role === "Dealer"
              ? "Dealer"
              : "Admin";
        
          // if (str == "Dealer") {
          //   updateApi(response.data.token)
          // }
          const str2 = str.charAt(0).toUpperCase() + str.slice(1);
          setLoading(false);
          if (str2) {
            toast.success("Welcome" + " " + str2 + "!");
          }
          const data = {
            ...response.data.data.userData,
            accessToken: response.data.token,
            refreshToken: response.data.token,
          };
          let permission = [];
          if (str2 != "user") {
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

          // dispatch(handleLogin(data));
          dispatch(handleLogin(response.data));
          dispatch(handleUser(response.data.data));

          navigate(getHomeRouteForLoggedInUser(response.data.data.role));
        } else if (response.data.status === 400) {
          toast.error(response.data.message);
          setLoading(false);
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));

  };


  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
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
      <Row className=" auth-bg p-5" style={{ marginTop: "10%" }}>
        <Col className="pl-5">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{
                height: "40%",
                width: "45%",
                marginBottom: "5%",
              }}
              src={themeConfig.app.appLogoImage}
              alt="Login Cover"
            />
            <CardTitle
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
              tag="h2"
              className="fw-bold mb-1"
            >
              Login
            </CardTitle>
          </div>

          <Col className="align-items-center" sm="12" md="12" lg="12">
            <Form
              style={{
                marginInlineStart: "17%",
                marginInlineEnd: "17%",
              }}
              className="auth-login-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label
                  for="login-email"
                  style={{
                    color: "white",
                    fontSize: "19px",
                    fontFamily: "LandRoverMedium",
                    // marginLeft: "41px",
                  }}
                >
                  Email
                </Label>
                <Input
                  style={{
                    marginTop: "5px",
                    fontSize: "17px",
                    fontFamily: "LandRoverMedium",
                  }}
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  // autoFocus
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label
                    style={{
                      color: "white",
                      fontSize: "19px",
                      fontFamily: "LandRoverMedium",
                      // marginLeft: "41px",
                    }}
                    for="login-password"
                  >
                    Password
                  </Label>
                  <Link to="/forgot-password" style={{ marginTop: "10px" }}>
                    <small
                      style={{
                        fontFamily: "LandRoverMedium",
                        fontSize: "13px",
                      }}
                    >
                      Forgot Password?
                    </small>
                  </Link>
                </div>
                <div style={{ position: "relative" }}>
                  <Input
                    style={{
                      fontFamily: "LandRoverMedium",
                      fontSize: "17px",
                      marginTop: "5px",
                      paddingRight: "2.5rem",
                    }}
                    className="input-group-merge"
                    id="login-password"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`fas ${show ? "fa-eye-slash" : "fa-eye"}`}
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={handleClick}
                  ></i>
                </div>
              </div>

              <div
                style={{
                  marginTop: "10px",
                }}
              >
                {loading ? (
                  <Loader
                    type="spinner-default"
                    bgColor={"#42b983"}
                    size={40}
                  />
                ) : (
                  <Button
                    type="submit"
                    color="primary"
                    block
                    onClick={onSubmit}
                    style={{
                      fontFamily: "LandRoverMedium",
                      fontSize: "17px",

                      // width: "10px",
                    }}
                  >
                    Log In
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
