// ** Reactstrap Imports
import { Table, Card, CardHeader, CardTitle, CardText } from "reactstrap";
import "./loader.css";

// ** Icons Imports
import {
  Monitor,
  Coffee,
  Watch,
  TrendingUp,
  TrendingDown,
} from "react-feather";

// ** Icons Imports
import starIcon from "@src/assets/images/icons/star.svg";
import bookIcon from "@src/assets/images/icons/book.svg";
import brushIcon from "@src/assets/images/icons/brush.svg";
import rocketIcon from "@src/assets/images/icons/rocket.svg";
import toolboxIcon from "@src/assets/images/icons/toolbox.svg";
import speakerIcon from "@src/assets/images/icons/speaker.svg";
import parachuteIcon from "@src/assets/images/icons/parachute.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "react-js-loader";

const CompanyTable = ({ loading, LRretailerList, JAGretailerList, total }) => {
  // ** vars

  const renderData = () => {
    // return data.map((col) => {
    //   const IconTag = col.salesUp ? (
    //     <TrendingUp size={15} className="text-success" />
    //   ) : (
    //     <TrendingDown size={15} className="text-danger" />
    //   );
    return loading ? (
      <div className="centered-div">
        <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
      </div>
    ) : (
      <>
        {/* <td>
            <div className="d-flex align-items-center">
              <div className="avatar rounded">
                <div className="avatar-content">
                  <img src={col.img} alt={col.name} />
                </div>
              </div>
              <div>
                <div className="fw-bolder">{col.name}</div>
                <div className="font-small-2 text-muted">{col.email}</div>
              </div>
            </div>
          </td> */}
        {/* {JAGretailerList.map((item, index) => (
          <tr key={item.jlr_model_name}>
           

            <td className="text-nowrap">
              <div className="d-flex flex-column">
                <span className="fw-bolder mb-25">{`${item.jlr_model_name} (${item.model_count})`}</span>
                <span className="font-small-2 text-muted">in {"Jaguar"}</span>
              </div>
            </td>
            <td className="text-nowrap">
              <div className="d-flex flex-column">
                <span className="fw-bolder mb-25">
                  {`${LRretailerList[index].jlr_model_name} (${LRretailerList[index].model_count})`}
                </span>
                <span className="font-small-2 text-muted">
                  in {"Land Rover"}
                </span>
              </div>
            </td>
          </tr>
        ))} */}
        {[
          ...Array(Math.max(JAGretailerList.length, LRretailerList.length)),
        ].map((_, index) => (
          <tr key={index}>
            <td className="text-nowrap">
              <div className="d-flex flex-column">
                {index < JAGretailerList.length ? (
                  <>
                    <span className="fw-bolder mb-25">{`${JAGretailerList[index].jlr_model_name}`}</span>
                    {/* <span className="font-small-2 text-muted">in Jaguar</span> */}
                  </>
                ) : (
                  <>
                    <span className="fw-bolder mb-25"></span>
                  </>
                )}
              </div>
            </td>
            <td className="text-nowrap">
              <div className="d-flex flex-column">
                {index < JAGretailerList.length ? (
                  <>
                    <span className="fw-bolder mb-25">
                      {JAGretailerList[index].model_count}
                    </span>
                    {/* <span className="font-small-2 text-muted">in Jaguar</span> */}
                  </>
                ) : (
                  <>
                    <span className="fw-bolder mb-25"></span>
                  </>
                )}
              </div>
            </td>
            <td className="text-nowrap">
              <div className="d-flex flex-column">
                {index < LRretailerList.length ? (
                  <>
                    <span className="fw-bolder mb-25">{`${LRretailerList[index].jlr_model_name}`}</span>
                    {/* <span className="font-small-2 text-muted">
                      in Land Rover
                    </span> */}
                  </>
                ) : (
                  <>
                    <span className="fw-bolder mb-25"></span>
                  </>
                )}
              </div>
            </td>
            <td className="text-nowrap">
              <div className="d-flex flex-column">
                {index < LRretailerList.length ? (
                  <>
                    <span className="fw-bolder mb-25">
                      {LRretailerList[index].model_count}
                    </span>
                    {/* <span className="font-small-2 text-muted">
                      in Land Rover
                    </span> */}
                  </>
                ) : (
                  <>
                    <span className="fw-bolder mb-25"></span>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}

        {/* <td>
            <div className="d-flex align-items-center">
             <span className="fw-bolder me-1">{col.sales}%</span> 
              {IconTag}
            </div>
          </td> */}
      </>
    );
  };

  return (
    <Card className="card-company-table">
      <CardHeader>
        <CardTitle tag="h4">Jaguar LandRover</CardTitle>
        <CardText className="card-text  me-25 mb-0">
          <div>
            <p style={{ display: "flex" }}>
              <span style={{ marginRight: "10px" }}>{`Jaguar: ${
                total.length && total[0].jag_count
              }`}</span>
              <span>{`LandRover: ${total.length && total[0].lr_count}`}</span>
            </p>
          </div>
          {/* <div> LandRover : {`${total.length && total[0].lr_count}`}</div> */}
        </CardText>
      </CardHeader>
      <Table responsive>
        <thead>
          <tr>
            {/* <th>Username</th> */}
            <th>Jaguar </th>
            <th>count </th>
            <th>LandRover </th>
            <th>count </th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  );
};

export default CompanyTable;
