import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Eye, Info, Trash } from "react-feather";
import DataTable from "react-data-table-component";
import {
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  UncontrolledTooltip,
  Label,
  Input,
  FormFeedback,
  Table,
} from "reactstrap";
const ReportList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [isHovered, setIsHovered] = useState(false);
  const [list, setUserName] = useState([
    {
      id: 1,
      report_name: "Udaan Sales Report",
      chart_type: " Bar, Line, Pie",
      C_date: "05-03-23",
      U_date: "08-03-23",
    },
    {
      id: 2,
      report_name: "Udaan Leads Report ",
      chart_type: " Bar, Line, Pie",
      C_date: "06-03-23",
      U_date: "07-03-23",
    },
  ]);
  const navigate = useNavigate();
  // useEffect(() => {
  //     getReportLeads();
  // }, [3000]);

  // const getReportLeads = () => {
  //     var config = {
  //         method: "get",
  //         url: "https://rdbapi.vnvserver.com/api/report/all",
  //     };

  //     axios(config).then(function (response) {
  //         setUserName(response.data.datareport);
  //     });
  // };
  const handlePerPage = (e) => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };
  const handleFilter = (e) => {
    setSearchValue(e.target.value);

    dispatch(
      getData({
        page: store.total > 1 ? 1 : store.total,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    );
  };
  return (
    <div>
      <Card>
        <CardHeader className="border-bottom" style={{ padding: "15px" }}>
          <CardTitle tag="h2" style={{ fontSize: "22px" }}>
            Report List
          </CardTitle>
        </CardHeader>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            // padding: "5px",
            // marginLeft: "5px",
            // marginRight: "15px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <h4
              style={{
                color: "black",
                fontSize: "15px",
                marginLeft: "17px",
                marginRight: "5px",
                marginTop: "1.1rem",
              }}
            >
              Show
            </h4>
            <Input
              className="dataTable-select"
              type="select"
              id="sort-select"
              value={rowsPerPage}
              onChange={(e) => handlePerPage(e)}
              style={{ padding: "4px", marginTop: "10px" }}
            >
              <option value={7}>7</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </Input>
            <h4
              style={{
                color: "black",
                fontSize: "15px",
                marginLeft: "6px",
                marginTop: "1.1rem",
              }}
            >
              Entries
            </h4>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: "2px",
            }}
          >
            <h4
              style={{
                color: "black",
                fontSize: "15px",
                margin: "10px",
              }}
            >
              Search
            </h4>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
              style={{
                marginRight: "10px",
                caretColor: "black",
                borderColor: isHovered ? "black " : "black",
                border: isHovered ? "2px solid black " : "1px solid #ccc",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        </div>

        <div className="react-dataTable">
          <Table responsive>
            <thead className="table-light">
              <tr>
                <th>Report Name</th>
                <th>Selected Charts</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
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

                    <td>{val.chart_type}</td>
                    <td>{val.C_date}</td>
                    <td>{val.U_date}</td>
                    <td>
                      <Edit
                        size={17}
                        className="cursor-pointer me-1"
                        id={`edit-tooltip-1`}
                        onClick={() => { }}
                      />
                      <Eye
                        size={17}
                        className="cursor-pointer me-1"
                        id={`edit-tooltip-1`}
                        onClick={() => {
                          navigate("/charts/preview");
                        }}
                      />
                      <Trash
                        size={17}
                        className="cursor-pointer me-1"
                        id={`edit-tooltip-1`}
                        onClick={() => { }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ReportList;
