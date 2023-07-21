// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Third Party Components
import { Row, Col } from "reactstrap";

// ** Demo Components
import TableServerSide from "./CustomerList";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs
        // style={{ backgroundColor: "red" }}
        title="Customer Management"
        data={[{ title: "Customer Management" }]}
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
