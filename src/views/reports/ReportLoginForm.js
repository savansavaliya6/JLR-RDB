import { Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
const ReportLoginForm = () => {
  const [list, setUserName] = useState([]);

  useEffect(() => {
    getReportLeads();
  }, [3000]);

  const getReportLeads = () => {
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/api/report/all",
    };

    axios(config).then(function (response) {
      setUserName(response.data.datareport);
    });
  };
  return (
    <div>
      <div
        style={{
          color: "#42b983",
          fontSize: "20px",
          fontWeight: "400",
          marginBottom: "2rem",
        }}
      >
        Report List
      </div>
      <Table responsive>
        <thead className="table-light">
          <tr>
            <th>Report Name</th>
            <th>Chart Type</th>
            <th>Chart Value</th>
            <th>Chart Count</th>
          </tr>
        </thead>
        <tbody>
          {list.map((val, key) => {
            return (
              <tr key={key}>
                <td>
                  <span className="align-middle fw-bold">
                    {val.report_name}
                  </span>
                </td>
                <td>{val.chart_value}</td> <td>{val.chart_type}</td>
                <td>{val.chart_count}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ReportLoginForm;
