// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Third Party Components
import { Row, Col } from "reactstrap";

// ** Demo Components
import TableServerSide from "./Vehicles";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="Vehicle Management"
        data={[{ title: "Vehicle Management" }]}
      />
      <Row>
        <Col sm="12">
          <TableServerSide />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Tables;
