// ** React Imports
import { useContext, useState } from "react";
import { ReactSortable } from "react-sortablejs";
// ** Icons Imports
import { List } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";
import Timeline from "@components/timeline";
import AvatarGroup from "@components/avatar-group";

// ** Utils
import { kFormatter } from "@utils";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Col,
  Row,
} from "reactstrap";
const dragItems = [
  {
    id: "1",

    title: "Draggable User 1",
  },
  {
    id: "2",
    title: "Draggable User 2",
  },
  {
    id: "3",
    title: "Draggable User 3",
  },
  {
    id: "4",
    title: "Draggable User 4",
  },
]; // ** Images

import Earnings from "@src/views/ui-elements/cards/analytics/Earnings";
import CardMeetup from "@src/views/ui-elements/cards/advance/CardMeetup";
import SubscribersGained from "@src/views/ui-elements/cards/statistics/SubscribersGained";
import CompanyTable from "./CompanyTable";
const AccessControl = () => {
  // ** Context
  const [cardsArr, setCardsArr] = useState(dragItems);
  // ** Context
  const { colors } = useContext(ThemeColors);

  // ** vars
  const trackBgColor = "#e9ecef";
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <Earnings success={colors.success.main} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <SubscribersGained cols={{ xl: "3", sm: "6" }} />
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
        <Col lg="8" xs="12">
          <CompanyTable />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardMeetup />
        </Col>
      </Row>
    </div>
  );
};

export default AccessControl;
