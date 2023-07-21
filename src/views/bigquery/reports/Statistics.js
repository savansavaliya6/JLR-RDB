// ** Third Party Components
import classnames from "classnames";
import { User, List, Mail, Phone, Menu, BookOpen, AlignCenter } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
// ** Custom Components

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import goldBadge from "/src/assets/Badge/gold.png";
import silverBadge from "/src/assets/Badge/silver.png";
import bronzeBadge from "/src/assets/Badge/bronze.png";

const Statistics = ({ cols }) => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});
  //      navigate("/"),


  const data = [
    {
      title: `ID Number `,
      subtitle: "ID Number",
      color: "light-primary",
      icon: <List size={24} />,
      loader: counts?.KPI_id_number?.percentage
        ? counts?.KPI_id_number?.percentage
        : `loa..`,
    },
    {
      title: `First Name `,
      subtitle: "First Name",
      color: "light-info",
      icon: <User size={24} />,
      loader: counts?.KPI_first_name?.percentage
        ? counts?.KPI_first_name?.percentage
        : `loa..`,
    },
    {
      title: `Last Name `,
      subtitle: "Last Name",
      color: "light-danger",
      icon: <User size={24} />,
      loader: counts?.KPI_last_name?.percentage
        ? counts?.KPI_last_name?.percentage
        : `loa..`,
    },
    {
      title: `Email `,
      subtitle: "Email",
      color: "light-success",
      icon: <Mail size={24} />,
      loader: counts?.KPI_email?.percentage
        ? counts?.KPI_email?.percentage
        : `loa..`,
    },
    {
      title: `Phone Number `,
      subtitle: "Phone Number",
      color: "light-success",
      icon: <Phone size={24} />,
      loader: counts?.KPI_phone_number?.percentage
        ? counts?.KPI_phone_number?.percentage
        : `loa..`,
    },

    {
      title: `Passport Number `,
      subtitle: "Passport Number",
      color: "light-success",
      icon: <BookOpen size={24} />,
      loader: counts?.KPI_passport_number?.percentage
        ? counts?.KPI_passport_number?.percentage
        : `loa..`,
    },
    {
      title: `Overall`,
      subtitle: "Overall",
      color: "light-success",
      icon: <Menu size={24} />,
      loader: counts?.Overall ? counts?.Overall : `loa..`,

    },
  ];

  const user = JSON.parse(sessionStorage.getItem("userData"));
  const getCounts = async () => {
    const counts = await axios.get("https://rdbapi.vnvserver.com/kpi", {
      headers: {
        token: user.token,
      },
    });
    setCounts(counts.data);
  };

  useEffect(() => {
    getCounts();
  }, []);

  const Image = () => {
    let badge = "";
    let imgSrc = "";
    if (counts?.Overall >= 70 && counts?.Overall < 80) {
      badge = "Bronze"
      imgSrc = bronzeBadge
    } else if (counts?.Overall >= 80 && counts?.Overall < 99) {
      badge = "Silver"
      imgSrc = silverBadge
    } else if (counts?.Overall > 99) {
      badge = "Gold"
      imgSrc = goldBadge
    }
    else {
      return null
    }


    return (
      <>
        {/* <h3>{badge}</h3> */}
        <img className="mb-2" src={imgSrc} width="65px" height="65px" />
        <h4 style={{ marginTop: '-4.7rem', color: 'white', marginBottom: '2rem', textAlign: 'center' }}>{counts?.Overall}%</h4>
      </>
    )
  }

  // const renderData = () => {
  //   return data.map((item, index) => {
  //     const colMargin = Object.keys(cols);
  //     const margin = index === 2 ? "sm" : colMargin[0];
  //     const margintop = 0;
  //     console.log(data)
  //     return (
  //       <Col
  //         key={index}
  //         {...cols}
  //         className={classnames({
  //           [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
  //         })}
  //       >
  //         <div>
  //           <Avatar color={item.color} icon={item.icon} className="me-2" />
  //           <div className="my-auto">
  //             <h4 className=" mb-0">{item.title}</h4>

  //             {/*<CardText className="font-small-3 mb-0">{item.subtitle}</CardText>*/}
  //           </div>
  //         </div>
  //       </Col>
  //     );
  //   });
  // };

  // return (
  //   <div className="container">
  //     <div className="row">
  //       {data.map((item, index) => (
  //         <div className="col-md-4" key={index}>
  //           <Card>
  //             <CardBody>
  //               <Avatar color={item.color} icon={item.icon} className="me-2" />
  //               <div className="my-auto">
  //                 <h4 className="mb-0">{item.title}</h4>
  //               </div>
  //             </CardBody>
  //           </Card>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  const progressBarStyles = {
    width: 60,
    height: 60,
  };

  const circularProgressbarStyles = buildStyles({
    pathColor: "#42B983", // Change the color to your desired value
    textColor: "#42B983", // Change the color to match the progress bar color
  });
  return (
    <div>
      <div className="row">
        {data.map((item, index) => (
          <div className="col-12 col-sm-6 col-md-3" key={index}>
            <Card style={{ textAlign: "-webkit-center" }}>
              <CardBody>
                {/* <Avatar color={item.color} icon={item.icon} className="me-2" /> */}

                {item.title == "Overall" && item.loader > 70 ? <Image /> :
                  <div style={progressBarStyles} mt-2 >
                    <CircularProgressbar
                      value={item.loader}
                      text={`${item.loader}%`}
                      styles={circularProgressbarStyles}
                    />
                  </div>
                }
                <div className="my-auto mt-1.5">
                  <h5 className="mb-0">{item.title}</h5>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;

// ** Third Party Components
// import classnames from "classnames";
// import { User, List, Mail, Phone, Menu, BookOpen } from "react-feather";
// import { Link, useNavigate } from "react-router-dom";
// // ** Custom Components
// import Avatar from "@components/avatar";

// // ** Reactstrap Imports
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardBody,
//   CardText,
//   Row,
//   Col,
// } from "reactstrap";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const Statistics = ({ cols }) => {
//   const navigate = useNavigate();
//   const [counts, setCounts] = useState({});

//   const data = [
//     {
//       title: `ID Number (${counts?.KPI_id_number?.percentage
//         ? counts?.KPI_id_number?.percentage + " %"
//         : "0 %"
//         })`,
//       subtitle: "ID Number",
//       color: "light-primary",
//       icon: <List size={24} />,
//     },
//     {
//       title: `First Name (${counts?.KPI_first_name?.percentage
//         ? counts?.KPI_first_name.percentage + " %"
//         : "0 %"
//         })`,
//       subtitle: "First Name",
//       color: "light-info",
//       icon: <User size={24} />,
//     },
//     {
//       title: `Last Name (${counts?.KPI_last_name?.percentage
//         ? counts?.KPI_last_name?.percentage + " %"
//         : "0 %"
//         })`,
//       subtitle: "Last Name",
//       color: "light-danger",
//       icon: <User size={24} />,
//     },
//     {
//       title: `Email (${counts?.KPI_email?.percentage
//         ? counts?.KPI_email?.percentage + " %"
//         : "0 %"
//         })`,
//       subtitle: "Email",
//       color: "light-success",
//       icon: <Mail size={24} />,
//     },
//     {
//       title: `Phone Number (${counts?.KPI_phone_number?.percentage
//         ? counts?.KPI_phone_number?.percentage + " %"
//         : "0 %"
//         })`,
//       subtitle: "Phone Number",
//       color: "light-success",
//       icon: <Phone size={24} />,
//     },

//     {
//       title: `Passport Number (${counts?.KPI_passport_number?.percentage
//         ? counts?.KPI_passport_number?.percentage + " %"
//         : "0 %"
//         })`,
//       subtitle: "Passport Number",
//       color: "light-success",
//       icon: <BookOpen size={24} />,
//     },
//     {
//       title: `Overall (${counts?.Overall ? counts?.Overall + " %" : "0 %"})`,
//       subtitle: "Overall",
//       color: "light-success",
//       icon: <Menu size={24} />,
//     },
//   ];

//   const user = JSON.parse(sessionStorage.getItem("userData"));
//   const getCounts = async () => {
//     const counts = await axios.get("https://rdbapi.vnvserver.com/kpi", {
//       headers: {
//         token: user.token,
//       },
//     });
//     setCounts(counts.data);
//   };

//   useEffect(() => {
//     getCounts();
//   }, []);

//   const renderData = () => {
//     return data.map((item, index) => {
//       const colMargin = Object.keys(cols);
//       const margin = index === 2 ? "sm" : colMargin[0];
//       const margintop = 0;
//       return (
//         <Col
//           key={index}
//           {...cols}
//           className={classnames({
//             [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
//           })}
//         >
//           <div className="d-flex align-items-center mb-1">
//             <Avatar color={item.color} icon={item.icon} className="me-2" />
//             <div className="my-auto">
//               <h4 className=" mb-0">{item.title}</h4>

//             </div>
//           </div>
//         </Col>
//       );
//     });
//   };

//   return (
//     <Card className="card-statistics">
//       {console.log(counts)}
//       <CardHeader>
//         <CardTitle tag="h4">Completeness Scores</CardTitle>
//         {/* <CardText className="card-text font-small-2 me-25 mb-0">
//           Data Management
//         </CardText> */}
//       </CardHeader>
//       <CardBody className="statistics-body">
//         <Row style={{ marginTop: "-1.5rem" }}>{renderData()}</Row>
//       </CardBody>
//     </Card>
//   );
// };

// export default Statistics;
