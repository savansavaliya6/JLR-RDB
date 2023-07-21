// ** React Imports
import { useRef, useState, Fragment } from "react";

import Breadcrumbs from "@components/breadcrumbs";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, Row, Col, Input, Form, Button, Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  handleReportName,
  handleBrandName,
  handleDataSet,
} from "../../redux/chart";
import Select from "react-select";

import Loader from "react-js-loader";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";
import { Card } from "react-bootstrap";

const ReportDetails = ({ stepper }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.datatables1);
  const [reportName, setReportName] = useState("");

  const [list, setReportUserName] = useState([]);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);

    dispatch(handleDataSet(event.target.value));
  };
  const handleNameChange = (e) => {
    setReportName(e.value);
    dispatch(handleReportName(e.value));
  };

  //   const handleSubmit = () => {
  //     if (reportName == "" && selected == "" && password == "") {
  //       toast.error("Something is missing!");
  //       return;
  //     }
  //     var data = {
  //       report_name: reportName,
  //       brand_name: selected,
  //       password: password,
  //     };
  //     console.log("body--", data);
  //     var config = {
  //       method: "post",
  //       url: "https://rdbapi.vnvserver.com/api/report/reports",
  //       data: { data: data },
  //     };
  //     setLoading(true);
  //     axios(config).then(function (response) {
  //       if (response.data.status === 200) {
  //         toast.success(response.data.message);
  //         stepper.next();
  //         console.log("list---", response.data);
  //         setReportUserName(response.data);
  //         setData(response.data);
  //         setLoading(false);
  //         // navigate("/login", { replace: true });
  //       } else {
  //         console.log("123------", response.data.message);
  //         toast.success(response.data.message);
  //         setLoading(false);
  //       }
  //     });
  //   };
  const handleSubmitName = () => {
    if (reportName != "" && value != "") {
      navigate("/charts/details");
    } else toast.error("Please Enter Report Name");
  };

  return (
    <div
      className="content-header"
      style={{
        marginTop: "10px",
        //  backgroundColor: "yellow",
      }}
    >
      {/* <Breadcrumbs
                title="Report Management"
                data={[
                  { title: "Report Managerment" },
                  { title: "Report Management" },
                ]}
              /> */}
      <div className="content-header-left col-md-9 col-12 mb-2">
        <h2 className="mb-0">Create New Report</h2>
      </div>
      <Card
        style={{
          // backgroundColor: "pink",
          // alignItems: "center",
          padding: "2.5rem",
        }}
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // color: "black",
                marginBottom: "1.5rem",
                marginTop: "1rem",
              }}
            >
              <Col md={3}>
                <Label style={{ fontSize: "18px", color: "black" }}>
                  Brand
                </Label>
              </Col>

              <Col md={9} style={{ fontSize: "20px" }}>
                {/* marginLeft: "6.9rem" */}
                Jaguar | Land Rover
              </Col>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "black",
                marginBottom: "1.5rem",
              }}
            >
              <Col md={3}>
                <Label style={{ fontSize: "18px", color: "black" }}>
                  Report Name
                </Label>
              </Col>
              <Col md={9}>
                <Input
                  style={{
                    fontSize: "17px",
                    color: "black",
                    // marnLeft: "2rem",

                    // width: "40%",gi
                  }}
                  type="reportName"
                  name="reportName"
                  value={reportName}
                  placeholder="Enter Report Name"
                  onChange={(e) => {
                    handleNameChange(e);
                  }}
                />
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                color: "black",
                marginBottom: "1.5rem",
              }}
            >
              <Col md={3}>
                <Label style={{ fontSize: "18px", color: "black" }}>
                  Data Set
                </Label>
              </Col>
              <Col md={9}>
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                    }),
                  }}
                  value={handleChange.value}
                  // onChange={handleChange}
                  onChange={(handleChange) => setValue(handleChange.value)}
                  style={{
                    fontSize: "17px",
                    // marginLeft: "5rem",
                    borderRadius: "4px",
                    // width: "40%",
                  }}
                  className="select"
                  options={[
                    { value: "Udaan Sales", label: "Udaan Sales" },
                    { value: "Udaan Leads", label: "Udaan Leads" },
                  ]}
                  isClearable={true}
                  isSearchable={true}
                />
              </Col>
            </div>

            <div
              style={{
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <Loader type="spinner-default" bgColor={"#42b983"} size={10} />
              ) : (
                <Col xs={12} className=" mt-2 pt-50">
                  <Button
                    color="primary"
                    className="btn"
                    onClick={() => {
                      handleSubmitName();
                    }}
                  >
                    {/* <span className="aligndefaultValues.name-middle d-sm-inline-block d-none"> */}
                    Save & Next
                    {/* </span> */}
                  </Button>
                  <Button
                    style={{ marginLeft: "1rem" }}
                    color="primary"
                    className="btn"
                    onClick={() => {
                      navigate("/reports/charts");
                    }}
                  >
                    {/* <span className="aligndefaultValues.name-middle d-sm-inline-block d-none" > */}
                    Back
                    {/* </span> */}
                  </Button>
                </Col>
              )}
            </div>
          </Row>
        </Form>
      </Card>{" "}
    </div>
  );
};

export default ReportDetails;
