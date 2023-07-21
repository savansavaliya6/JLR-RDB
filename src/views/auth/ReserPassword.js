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
import InputPassword from "@components/input-password-toggle";

// ** Utils
import { isUserLoggedIn } from "@utils";
// ** React Imports
import { useContext, useState, useEffect } from "react";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import axios from "axios";
// ** Icons Imports
import { ChevronLeft } from "react-feather";
import themeConfig from "@configs/themeConfig";
// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";

import "@styles/react/pages/page-authentication.scss";

import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
    // const onSubmit = () => {
    //   console.log("hi");
    //   var data = {
    //     newPassword: newPassword,
    //   };

    //   var config = {
    //     method: "post",
    //     url: "http://localhost:3000/reset/34/a74888ec2254c2d11954000547b687e594e9552055d9d3903c1d831c4758db73/${resetCode}",

    //     data: data,
    //   };
    //   axios(config)
    //     .then(function (response) {
    //       console.log("response---", response);
    //       if (response.data.status === 200) {
    //         toast.success(response.data.error);
    //       } else {
    //         toast.error(response.data.error);
    //       }
    //     })
    //     .catch((err) => console.log("er--", err));
    //   // toast.error("Error");
    // };

    const { skin } = useSkin();
    const source = skin === "dark" ? illustrationsDark : illustrationsLight;

    //

    const [newPassword, setNewPassword] = useState(" ");
    const [confirmPassword, setConfirmPassword] = useState(" ");
    const { userid, token } = useParams();
    // const {
    //   reset,
    //   handleSubmit,
    //   formState: { isSubmitSuccessful },
    // } = methods;

    // useEffect(() => {
    //   if (isSubmitSuccessful) {
    //     reset();
    //   }
    // }, [isSubmitSuccessful]);

    const resetPassword = (props) => {
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
        try {
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    if (response.data.status === 200) {
                        toast.success(response.data.error, {
                            position: "top-right",
                        });
                        <Navigate to="/login" />;
                    } else {
                        toast.error(response.data.message, {
                            position: "top-right",
                        });
                        <Navigate to="/login" />;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log("catch", error);
            // store.setRequestLoading(false);
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
        if (token !== "") {
            resetPassword({ token: token, userid: userid });
        } else {
            toast.error("Please provide the password reset code", {
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
                            {/* <CardText className="mb-2">
                Enter your email and we'll send you instructions to reset your
                password
              </CardText> */}
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
                                        // className="input-group-merge"
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
                                        // className="input-group-merge"
                                        id="confirm-password"
                                        autoFocus
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button color="primary" block onClick={onSubmitHandler}>
                                    Set New Password
                                </Button>
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
