// ** React Imports
import { useContext, useEffect, useState } from "react"

// ** Reactstrap Imports
import { Row, Col } from "reactstrap"

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors"

// ** Demo Components
import CompanyTable from "./CompanyTable"
import Earnings from "@src/views/ui-elements/cards/analytics/Earnings"
import CardMeetup from "@src/views/ui-elements/cards/advance/CardMeetup"
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard"

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss"
import "@styles/base/pages/dashboard-ecommerce.scss"
import axios from "axios"

const EcommerceDashboard = () => {
  const [JAGretailerList, setJAGRetailerList] = useState([])
  const [LRretailerList, setLRRetailerList] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  // ** Context
  const { colors } = useContext(ThemeColors)
  const user = JSON.parse(sessionStorage.getItem("userData"))

  // ** vars
  const trackBgColor = "#e9ecef"
  const getRetailersList = async () => {
    try {
      const counts = await axios.get(
        "https://rdbapi.vnvserver.com/dash/group",
        {
          headers: {
            token: user.token,
          },
        }
      )
      const total = counts.data.total
      const jagList = counts.data.vehicles.filter((item) =>
        item.jlr_model_name.includes("Jaguar")
      )
      const LRList = counts.data.vehicles.filter((item) =>
        item.jlr_model_name.includes("Land Rover")
      )
      setTotal(total)
      setJAGRetailerList(jagList)
      setLRRetailerList(LRList)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getRetailersList()
  }, [])

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        {/* <Col xl="4" md="6" xs="12">
          <Earnings success={colors.success.main} />
        </Col> */}
        <Col xl="12" md="12" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>

      <Row className="match-height">
        <Col lg="4" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6"></Col>
            <Col lg="6" md="3" xs="6"></Col>
          </Row>
        </Col>
        <Col lg="8" md="12"></Col>
      </Row>
      <Row className="match-height">
        <Col lg="12" xs="12">
          <CompanyTable
            loading={loading}
            total={total}
            JAGretailerList={JAGretailerList}
            LRretailerList={LRretailerList}
          />
        </Col>
        <Col lg="12" md="12" xs="12" className="h-25">
          {/* <CardMeetup /> */}
          <Earnings
            loading={loading}
            JAGretailerList={JAGretailerList}
            LRretailerList={LRretailerList}
            success={colors.success.main}
          />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
