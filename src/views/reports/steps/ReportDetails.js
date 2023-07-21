import { Fragment, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, Row, Col, Input, Form, Button, Alert } from "reactstrap";
import { useDispatch } from "react-redux";
import {
  handleReportName,
  handleBrandName,
  handlePassword,
} from "../../../redux/chart";
import Loader from "react-js-loader";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
const ReportDetails = ({ stepper }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("jaguar");
  const [reportName, setReportName] = useState("");
  const [password, setPassword] = useState("");
  const [list, setReportUserName] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("list", list);

  const handleChange = (event) => {
    setSelected(event.target.value);
    dispatch(handleBrandName(event.target.value));
  };
  const handleNameChange = (e) => {
    setReportName(e.target.value);
    dispatch(handleReportName(e.target.value));
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    dispatch(handlePassword(e.target.value));
  };

  const handleSubmit = () => {
    if (reportName == "" && selected == "" && password == "") {
      toast.error("Something is missing!");
      return;
    }
    var data = {
      report_name: reportName,
      brand_name: selected,
      password: password,
    };
    console.log("body--", data);
    var config = {
      method: "post",
      url: "https://rdbapi.vnvserver.com/api/report/reports",
      data: { data: data },
    };
    setLoading(true);
    axios(config).then(function (response) {
      if (response.data.status === 200) {
        toast.success(response.data.message);
        stepper.next();
        console.log("list---", response.data);
        setReportUserName(response.data);
        setData(response.data);
        setLoading(false);
        // navigate("/login", { replace: true });
      } else {
        console.log("123------", response.data.message);
        toast.success(response.data.message);
        setLoading(false);
      }
    });
  };

  return (
    <Fragment>
      <div className="content-header" style={{ marginTop: "10px" }}>
        <h5
          style={{ color: "black", fontWeight: "500", fontSize: "1.3rem" }}
          className="mb-0"
        >
          Report Details
        </h5>
        <small>Enter Report Details.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row
          style={{
            display: "flex",
            color: "black",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <div style={{ color: "black" }}>
            <input
              style={{ margin: "1rem" }}
              type="radio"
              id="JAG"
              name="JAG"
              value="JAG"
              checked={selected === "JAG"}
              onChange={handleChange}
            />
            <label htmlFor="jaguar">Jaguar</label>

            <input
              style={{ margin: "1rem" }}
              type="radio"
              id="LR"
              name="LR"
              value="LR"
              onChange={handleChange}
              checked={selected === "LR"}
            />
            <label htmlFor="LandRover">Land Rover</label>
          </div>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label">Report Name</Label>
            <Input
              style={{ color: "black" }}
              type="reportName"
              name="reportName"
              value={reportName}
              placeholder="Please Enter Report Name"
              onChange={(e) => {
                handleNameChange(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-12 mb-1">
            <Label className="form-label" htmlFor={password}>
              Password
            </Label>
            <Input
              style={{ color: "black" }}
              type="password"
              id={password}
              value={password}
              placeholder="Please Enter password"
              onChange={(e) => {
                handlePasswordChange(e);
              }}
            />
          </div>
        </Row>

        <div className="d-flex justify-content-between">
          {loading ? (
            <Loader type="spinner-default" bgColor={"#42b983"} size={10} />
          ) : (
            <div>
              <Button
                color="primary"
                className="btn"
                onClick={() => {
                  console.log("wewdewaf", data);
                  handleSubmit(data);
                }}
              >
                <span className="aligndefaultValues.name-middle d-sm-inline-block d-none">
                  Submit
                </span>
              </Button>
            </div>
          )}
          {/* <div>
      <Link to={`/second-page/${data.id}`}>Go to second page</Link>
    </div> */}
          {list != reportName ? (
            <Button
              color="primary"
              className="btn-next"
              onClick={() => {
                stepper.next();
              }}
            >
              <span className="align-middle d-sm-inline-block d-none">
                Create new report
              </span>
              <ArrowRight
                size={14}
                className="align-middle ms-sm-25 ms-0"
              ></ArrowRight>
            </Button>
          ) : (
            <Button
              color="primary"
              className="btn-next"
              outline
              disabled
              onClick={() => {
                stepper.next();
              }}
            >
              <span className="align-middle d-sm-inline-block d-none">
                Create new report
              </span>
              <ArrowRight
                size={14}
                className="align-middle ms-sm-25 ms-0"
              ></ArrowRight>
            </Button>
          )}
        </div>
      </Form>
    </Fragment>
  );
};

export default ReportDetails;
