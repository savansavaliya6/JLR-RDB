// ** Reactstrap Imports
import { Table, Card } from "reactstrap";

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

const CompanyTable = () => {
  // ** vars

  const data = [
    {
      name: "Moses Amiri Musisi Mr",
      type: "Individual",
      number: "80290000476",
    },
    {
      name: "Shun-Wei Chang Mr",
      type: "Juristic",
      number: "80290000733",
    },
    {
      name: "Prenolin Kistnasami Mr",
      type: "Individual",
      number: "80290000684",
    },
    {
      name: "Christopher Harold Day Mr",
      type: "Juristic",
      number: "80290000814",
    },
    {
      name: "RICKY HARTHOG Mr",
      type: "Individual",
      number: "80290000701",
    },
    {
      name: "David Richard Damen Mr",
      type: "Juristic",
      number: "80290000828",
    },
    {
      name: "Sandra Zaira Fox",
      type: "Individual",
      number: "80290000697",
    },
    {
      name: "Mark Wallace Philp",
      type: "Juristic",
      number: "80290001137",
    },
    {
      name: "Michael William Nixon Mr",
      type: "Individual",
      number: "80290000700",
    },
    {
      name: "RICKY HARTHOG Mr",
      type: "Individual",
      number: "80290000701",
    },
    {
      name: "David Richard Damen Mr",
      type: "Juristic",
      number: "80290000828",
    },
  ];
  const colorsArr = {
    Technology: "light-primary",
    Grocery: "light-success",
    Fashion: "light-warning",
  };

  const renderData = () => {
    return data.map((col) => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className="text-success" />
      ) : (
        <TrendingDown size={15} className="text-danger" />
      );

      return (
        <tr key={col.name}>
          <td>
            <div className="d-flex align-items-center">
              <div>
                <div>{col.name}</div>
              </div>
            </div>
          </td>

          <td className="text-nowrap">
            <div className="d-flex flex-column">
              <span className=" mb-25">{col.number}</span>
            </div>
          </td>
          <td className="text-nowrap">
            <div className="d-flex flex-column">
              <span className=" mb-25">{col.type}</span>
            </div>
          </td>

          {/* <td>
            <div className="d-flex align-items-center">
             <span className="fw-bolder me-1">{col.sales}%</span> 
              {IconTag}
            </div>
          </td> */}
        </tr>
      );
    });
  };

  return (
    <Card className="card-company-table">
      <Table responsive>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Number</th>
            <th>Customer Type</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  );
};

export default CompanyTable;
