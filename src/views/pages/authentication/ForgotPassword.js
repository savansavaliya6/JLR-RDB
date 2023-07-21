// ** React Imports
import { Link, Navigate, useNavigate } from "react-router-dom";

import Loader from "react-js-loader";
// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import themeConfig from "@configs/themeConfig";
// ** Utils
import { isUserLoggedIn } from "@utils";
// ** React Imports
import { useContext, useState } from "react";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import axios from "axios";
// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";

import "@styles/react/pages/page-authentication.scss";

import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState(" ");
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    if (loginEmail == "") {
      toast.error("Please fill the email address.");
      return;
    }
    var data = {
      email: loginEmail,
    };

    var config = {
      method: "post",
      url: "https://rdbapi.vnvserver.com/forget",

      data: data,
    };
    setLoading(true);
    axios(config).then(function (response) {
      if (response.data.status === 200) {
        toast.success(response.data.error);
        setLoading(false);
        navigate("/login", { replace: true });
      } else {
        toast.error(response.data.error);
        setLoading(false);
      }
    });
  };

  // ** Hooks
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  if (!isUserLoggedIn()) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#2d3a4b",
        }}
      // className="auth-wrapper auth-cover"
      >
        <Row className=" auth-bg p-5 ">
          <Col className="p-5" lg="12" md="12" sm="12" xs="12">
            <Col className="px-xl-2 mx-auto" xs="12" sm="12" md="8" lg="8">
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
                    width: "60%",
                    marginBottom: "5%",
                  }}
                  src={themeConfig.app.appLogoImage}
                  alt="Login Cover"
                />
              </div>
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
                Forgot Password? 🔒
              </CardTitle>

              <CardText className="mb-2" style={{ color: "white" }}>
                Enter your email and we'll send you instructions to reset your
                password
              </CardText>
              <Form
                className="auth-forgot-password-form mt-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="mb-1">
                  <Label
                    style={{ color: "white" }}
                    className="form-label"
                    for="login-email"
                  >
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

                {loading ? (
                  <Loader
                    type="spinner-default"
                    bgColor={"#42b983"}
                    size={40}
                  />
                ) : (
                  <Button color="primary" block onClick={onSubmit}>
                    Send reset link
                  </Button>
                )}
              </Form>
              <p className="text-center mt-2">
                <Link to="/login">
                  <ChevronLeft className="rotate-rtl me-25" size={14} />
                  <span className="align-middle">Back to login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ForgotPassword;
