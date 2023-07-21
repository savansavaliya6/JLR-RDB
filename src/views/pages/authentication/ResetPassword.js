// ** React Imports
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

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
import Loader from "react-js-loader";
import { isUserLoggedIn } from "@utils";
import { useState } from "react";
import { useSkin } from "@hooks/useSkin";
import axios from "axios";
import { ChevronLeft } from "react-feather";
import themeConfig from "@configs/themeConfig";
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";
import "@styles/react/pages/page-authentication.scss";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  //
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(" ");
  const [confirmPassword, setConfirmPassword] = useState(" ");
  const [loading, setLoading] = useState(false);
  const { userid, token } = useParams();

  const resetPassword = (props) => {
    if (newPassword == "" && confirmPassword == "") {
      toast.error("Please fill the password.");
      return;
    }
    var data = {
      token: props.token,
      password: newPassword,
    };
    var config = {
      method: "post",
      url: "https://rdbapi.vnvserver.com/reset",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    setLoading(true);
    try {
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          if (response.data.status === 200) {
            toast.success(response.data.message, {
              position: "top-right",
            });
            setLoading(false);
            navigate("/login", { replace: true });
          } else {
            setLoading(false);
            toast.error(response.data.errormessage, {
              position: "top-right",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("catch", error);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const onSubmitHandler = (values) => {
    if (newPassword === confirmPassword) {
      if (token !== "") {
        resetPassword({ token: token, userid: userid });
      }
    } else {
      toast.error("New Password & Confirm Password should be same", {
        position: "top-right",
      });
    }
  };
  //
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
      >
        <Row className=" auth-bg p-5 ">
          <Col className="p-5" lg="12" md="12" sm="12" xs="12">
            <Col className="px-xl-2 mx-auto" xs="12" sm="12" md="12" lg="8">
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
                Reset Password?
              </CardTitle>
              <Form
                className="auth-forgot-password-form mt-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="mb-1">
                  <Label
                    style={{ color: "white" }}
                    className="form-label"
                    for="new-password"
                  >
                    New Password
                  </Label>

                  <Input
                    type="new-password"
                    id="new-password"
                    autoFocus
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-1">
                  <Label
                    style={{ color: "white" }}
                    className="form-label"
                    for="confirm-password"
                  >
                    Confirm Password
                  </Label>

                  <Input
                    type="confirm-password"
                    id="confirm-password"
                    autoFocus
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {loading ? (
                  <Loader
                    type="spinner-default"
                    bgColor={"#42b983"}
                    size={40}
                  />
                ) : (
                  <Button color="primary" block onClick={onSubmitHandler}>
                    Set New Password
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

export default ResetPassword;
