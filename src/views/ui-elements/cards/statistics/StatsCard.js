// ** Third Party Components
import classnames from "classnames"
import {
  TrendingUp,
  User,
  Box,
  Shuffle,
  PieChart,
  DollarSign,
} from "react-feather"
import { Link, useNavigate } from "react-router-dom"
// ** Custom Components
import Avatar from "@components/avatar"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap"
import { useEffect, useState } from "react"
import axios from "axios"

const StatsCard = ({ cols }) => {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({})
  //      navigate("/"),
  const data = [
    {
      title: `Users (${counts?.users ? counts.users : ""})`,
      subtitle: "User Management",
      color: "light-primary",
      icon: <Box size={24} />,
    },
    {
      title: `Customers (${counts?.customers ? counts.customers : ""})`,
      subtitle: "Customer Management",
      color: "light-info",
      icon: <User size={24} />,
    },
    {
      title: `Sales (${counts?.sale ? counts.sale : ""})`,
      subtitle: "Sales Management",
      color: "light-danger",
      icon: <DollarSign size={24} />,
    },
    {
      title: `Vehicles (${counts?.vehicles ? counts.vehicles : ""})`,
      subtitle: "Vehicles Management",
      color: "light-success",
      icon: <Box size={24} />,
    },
  ]

  const user = JSON.parse(sessionStorage.getItem("userData"))
  const getCounts = async () => {
    const counts = await axios.get(
      "https://rdbapi.vnvserver.com/dashboard",
      {
        headers: {
          token: user.token,
        },
      }
    )
    setCounts(counts.data)
  }

  useEffect(() => {
    getCounts()
  }, [])

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? "sm" : colMargin[0]
      const margintop = 0
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div
            className="d-flex align-items-center"
            onClick={() => {
              item.subtitle === "User Management"
                ? navigate("/user/management")
                : item.subtitle === "Customer Management"
                  ? navigate("/customers/management")
                  : item.subtitle === "Sales Management"
                    ? navigate("/sales/management")
                    : item.subtitle === "Vehicles Management"
                      ? navigate("/vehicle/management")
                      : navigate("/")
            }}
          >
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Overview</CardTitle>
        {/* <CardText className="card-text font-small-2 me-25 mb-0">
          Data Management
        </CardText> */}
      </CardHeader>
      <CardBody className="statistics-body">
        <Row style={{ marginTop: "-1.5rem" }}>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
