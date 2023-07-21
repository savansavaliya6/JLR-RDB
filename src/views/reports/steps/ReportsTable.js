import React from "react";
import { Fragment, useState } from "react";
import { ReactSortable } from "react-sortablejs";
// import Dropdown from "react-bootstrap/Dropdown";

import { ArrowLeft, ArrowRight } from "react-feather";

import { handleReportTable, handleBrandName } from "../../../redux/chart";
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
const tableJItems = [
  {
    id: "data1",
    name: "Year 2001",
  },
  {
    id: "data2",
    name: "Year 2002",
  },
  {
    id: "data3",
    name: "Year 2003",
  },
  {
    id: "data4",
    name: "Year 2004",
  },
];
const tableRItems = [
  {
    id: "data5",
    name: "Year 2005",
  },
  {
    id: "data6",
    name: "Year 2006",
  },
  {
    id: "data7",
    name: "Year 2007",
  },
  {
    id: "data8",
    name: "Year 2008",
  },
];

const ReportsTable = ({ stepper }) => {
  const [value, setValue] = useState("LandRover");
  const [tableValue, setTableValue] = useState("");
  const [tableJName, setTableJName] = useState(tableJItems);
  const [tableRName, setTableRName] = useState(tableRItems);

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setTableValue(e.target.value);
    dispatch(handleReportTable(e.target.value));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    dispatch(handleBrandName(e.target.value));
  };
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Table</h5>
        <small>Select Reports Table</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <div style={{ padding: 5 }}>
          <select
            style={{
              padding: 7,
              borderRadius: 4,
              fontSize: "14px",
              backgroundColor: "#42b983",
              borderColor: "#42b983",
              color: "#fff",
            }}
            value={value}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option
              style={{
                fontSize: "16px",
                backgroundColor: "#fff",
                color: "#000",
                padding: 7,
              }}
              value="Jaguar"
            >
              Jaguar
            </option>
            <option
              style={{
                fontSize: "16px",
                backgroundColor: "#fff",
                color: "#000",
                padding: 7,
              }}
              value="LandRover"
            >
              Land Rover
            </option>
          </select>
        </div>

        {value === "Jaguar" && (
          <ReactSortable
            className="row sortable-row"
            list={tableJName}
            setList={setTableJName}
          >
            {tableJName.map((item) => (
              <Row>
                <Col md="12" className="mb-1">
                  <div className="form-check">
                    <Input
                      key={item.id}
                      type="radio"
                      name={item.name}
                      id={item.id}
                      value={item.name}
                      checked={tableValue === item.name}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <Label className="form-check-label" htmlFor={item.id}>
                      {item.name}
                    </Label>
                  </div>
                </Col>
              </Row>
            ))}
          </ReactSortable>
        )}
        {value === "LandRover" && (
          <ReactSortable
            className="row sortable-row"
            list={tableRName}
            setList={setTableRName}
          >
            {tableRName.map((item) => (
              <Row>
                <Col md="12" className="mb-1">
                  <div className="form-check">
                    <Input
                      key={item.id}
                      name={item.name}
                      type="radio"
                      id={item.id}
                      value={item.name}
                      checked={tableValue === item.name}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                    <Label className="form-check-label" htmlFor={item.id}>
                      {item.name}
                    </Label>
                  </div>
                </Col>
              </Row>
            ))}
          </ReactSortable>
        )}
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
            onClick={() => stepper.next()}
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

export default ReportsTable;
