// ** React Imports
import { useRef, useState, Fragment } from "react";

import Breadcrumbs from "@components/breadcrumbs";
import { Row, Col } from "reactstrap";
import "@styles/react/libs/charts/apex-charts.scss";
import ReportList from "./reportList";
import ReportDetails from "./reportDetails";

const index = () => {
  const ref = useRef(null);

  const [sqltable, setSqlTable] = useState(false);

  const functionTwo = () => {
    setSqlTable(true);
  };
  return (
    <div>
      <div>
        {sqltable === false && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={functionTwo}
              >
                Create New Report
              </button>
            </div>
            <Fragment>
              <Breadcrumbs
                title="Report Management"
                data={[{ title: "Report Management" }]}
              />
              <Row>
                <Col sm="12">
                  <ReportList />
                </Col>
              </Row>
            </Fragment>
          </div>
        )}
      </div>

      {sqltable === true && <ReportDetails />}
      {/* <footer
        style={{
          position: "fixed",
          backgroundColor: "whitesmoke",
          width: "78%",
          bottom: "0",
          padding: "3px",
          textAlign: "centerGridLayout",
        }}
        className="auth-footer-btn d-flex justify-content-center"
      >
        <small
          className="text-center ml-1"
          style={{
            letterSpacing: "4px",
            fontWeight: "400",
            color: "black",
            wordSpacing: "4px",
            fontSize: "1rem",
          }}
        >
          &copy;2023 Jagaur Land Rover South Africa
        </small>
      </footer> */}
    </div>
  );
};

export default index;
