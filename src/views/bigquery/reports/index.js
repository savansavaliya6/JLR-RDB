// ** React Imports
import { Fragment } from "react"

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs"

// ** Third Party Components
import { Row, Col } from "reactstrap"

// ** Demo Components
import TableServerSide from "./ExceptionReport"

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss"

const Tables = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="Data Quality Check Report"
        data={[{ title: "Data Quality Check Report" }]}
      />
      <Row>
        <Col sm="12">
          <TableServerSide />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Tables
