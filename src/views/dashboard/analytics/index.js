// ** React Imports
import { useContext, useState } from "react";
import { ReactSortable } from "react-sortablejs";
// ** Icons Imports
import { List } from "react-feather";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
} from "reactstrap";

const dragItems = [
  {
    id: "1",
    title: "Draggable Admin 1",
  },
  {
    id: "2",
    title: "Draggable Admin 2",
  },
  {
    id: "3",
    title: "Draggable Admin 3",
  },
  {
    id: "4",
    title: "Draggable Admin 4",
  },
];
const people = [
  { name: "Alice", surname: "Alman", job: 3 },
  { name: "Bob", surname: "Briscoe", job: 3 },
  { name: "Carol", surname: "Conway", job: 1 },
  { name: "Dan", surname: "Dunne", job: 2 },
];
const jobs = [
  { id: 1, job: "Programmer" },
  { id: 2, job: "Actor" },
  { id: 3, job: "Comic" },
  { id: 4, job: "Manager" },
];
// ** Images
import jsonImg from "@src/assets/images/icons/json.png";
import img1 from "@src/assets/images/banner/banner-7.jpg";
import img2 from "@src/assets/images/banner/banner-4.jpg";
import img3 from "@src/assets/images/banner/banner-14.jpg";
import img4 from "@src/assets/images/banner/banner-3.jpg";
import img5 from "@src/assets/images/banner/banner-2.jpg";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import { Button } from "bootstrap";

const AnalyticsDashboard = () => {
  const [cardsArr, setCardsArr] = useState(dragItems);

  const dataBase = people.map((person) => {
    const job = jobs.find((job) => job.id == person.job);
    return {
      ...person,
      title: job.job,
    };
  });

  const [dataBases, setDataBases] = useState(dataBase);

  return (
    <div id="dashboard-analytics">
      <div>
        <Link to="/sql-editor">
          <button type="button" className="btn btn-primary">
            ANALYTICS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
