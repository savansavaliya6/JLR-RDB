import { Fragment, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Card, CardHeader, CardBody } from "reactstrap";
import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  BarChart,
  PieChart,
} from "react-feather";
import Loader from "react-js-loader";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import {
  handleReportChart,
  handleUserName,
  handleLeadsName,
} from "../../../redux/chart";

import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";

const chartList = [
  // {
  //   id: "1",
  //   type: "donut",
  //   name: "donut",
  //   icon: <PieChart />,
  // },
  {
    id: "2",
    type: "pie",
    icon: <PieChart />,
    name: "pie",
  },
  {
    id: "3",
    type: "line",
    icon: <BarChart2 />,
    name: "line",
  },
  {
    id: "4",
    type: "bar",
    name: "bar",
    icon: <BarChart />,
  },
];
const ReportCharts = ({ stepper }) => {
  const [chartItem, setchartItem] = useState(chartList);
  const [list, setUserName] = useState([]);
  const [chartType, setChartType] = useState("");
  const [chartName, setChartName] = useState("");
  const [chartValue, setChartValue] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setChartValue(e.target.value);

    dispatch(handleReportChart(e.target.value));
  };
  const userNamehandle = (e) => {
    setChartName(e.target.value);

    dispatch(handleUserName(e.target.value));
  };
  const userLeadshandle = (e) => {
    setChartType(e.target.value);

    dispatch(handleLeadsName(e.target.value));
  };
  useEffect(() => {
    getReportLeads();
  }, [3000]);

  const getReportLeads = () => {
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/api/report/leads",
    };
    setLoading(true);
    axios(config).then(function (response) {
      setUserName(response.data.result);
      setLoading(false);
    });
  };

  return (
    <Fragment>
      <div className="content-header" style={{ marginTop: "10px" }}>
        <h5
          style={{ color: "black", fontWeight: "500", fontSize: "1.3rem" }}
          className="mb-0"
        >
          Chart Details
        </h5>
        <small>Select the Chart.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <ReactSortable
          className="row sortable-row"
          list={chartItem}
          setList={setchartItem}
        >
          {chartItem.map((item) => (
            <Row>
              <Col md="12" className="mb-1">
                <div className="form-check">
                  <Input
                    type="checkbox"
                    id={item.id}
                    value={item.name}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                  <Label
                    style={{ display: "flex", flexDirection: "row" }}
                    className="form-check-label"
                    for={item.name}
                  >
                    <div
                      style={{
                        // color: "black",

                        marginRight: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      {item.icon} {item.name}
                    </div>
                  </Label>
                </div>
              </Col>
            </Row>
          ))}
        </ReactSortable>
        <Card>
          <CardHeader style={{ color: "black" }}>
            Select Xaxis values:
          </CardHeader>
          {loading ? (
            <Loader type="spinner-default" bgColor={"#42b983"} size={30} />
          ) : (
            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "scroll",
                  width: "500px",
                  float: "left",
                  position: "relative",
                }}
              >
                {list.map((item) => (
                  <Row>
                    <Col md="12" className="mb-1">
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          id={item.id}
                          value={item.name}
                          onChange={(e) => {
                            userNamehandle(e);
                          }}
                        />
                        <Label
                          style={{ display: "flex", flexDirection: "row" }}
                          className="form-check-label"
                          for={item.name}
                        >
                          <div
                            style={{ marginRight: "20px", marginLeft: "10px" }}
                          >
                            {item.name}
                          </div>
                        </Label>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </CardBody>
          )}
        </Card>
        <Card>
          <CardHeader style={{ color: "black" }}>
            Select Yaxis values:
          </CardHeader>
          {loading ? (
            <Loader type="spinner-default" bgColor={"#42b983"} size={30} />
          ) : (
            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "scroll",
                  width: "500px",
                  float: "left",
                  position: "relative",
                }}
              >
                {list.map((item) => (
                  <Row>
                    <Col md="12" className="mb-1">
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          id={item.id}
                          value={item.lead_count}
                          onChange={(e) => {
                            userLeadshandle(e);
                          }}
                        />
                        <Label
                          style={{ display: "flex", flexDirection: "row" }}
                          className="form-check-label"
                          for={item.lead_count}
                        >
                          <div
                            style={{ marginRight: "20px", marginLeft: "10px" }}
                          >
                            {item.lead_count}
                          </div>
                        </Label>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </CardBody>
          )}
        </Card>

        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>

          <Button
            color="primary"
            className="btn-next"
            onClick={() => {
              chartType && chartName && chartValue
                ? stepper.next()
                : toast.error("Select atleast one value from each field");
            }}
          >
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default ReportCharts;
