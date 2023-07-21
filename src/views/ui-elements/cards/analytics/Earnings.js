// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

const Earnings = ({ success, LRretailerList, JAGretailerList }) => {
  const users = JSON.parse(sessionStorage.getItem("userRole"));

  let optionsForJaguar;
  let optionsForLandRover;
  if (users.role == "admin" || users.role == "Admin") {
    optionsForLandRover = {
      chart: {
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#8b4f3b",
        },
      },
      // series: LRretailerList.map((i) => i.model_count),
      labels: LRretailerList.map((i) => i.jlr_model_name),
      dataLabels: {
        enabled: true,
      },

      legend: { show: false },

      plotOptions: {
        pie: {
          // customScale: 0.8,
          expandOnClick: true,
          donut: {
            // size: "65%",
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
              },
              total: {
                show: true,
                // offsetY: 15,
                label: "Land Rover",
                formatter() {
                  return LRretailerList.reduce(
                    (accumulator, current) => accumulator + current.model_count,
                    0
                  );
                },
              },
            },
          },
        },
      },
    };

    optionsForJaguar = {
      chart: {
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#42b983",
          // shadeTo: "light",
          // shadeIntensity: 0.65,
        },
      },
      // series: LRretailerList.map((i) => i.model_count),
      labels: JAGretailerList.map((i) => i.jlr_model_name),
      dataLabels: {
        enabled: true,
      },

      legend: { show: false },

      plotOptions: {
        pie: {
          // customScale: 0.8,
          expandOnClick: true,
          donut: {
            // size: "65%",
            labels: {
              show: true,
              name: {
                show: true,
              },
              value: {
                show: true,
              },
              total: {
                show: true,
                // offsetY: 15,
                label: "Jaguar",
                formatter() {
                  return JAGretailerList.reduce(
                    (accumulator, current) => accumulator + current.model_count,
                    0
                  );
                },
              },
            },
          },
        },
      },
    };

    // optionsForLandRover = {
    //   chart: {
    //     toolbar: {
    //       show: false,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   legend: { show: false },
    //   comparedResult: [2, -3, 8],
    //   labels: LRretailerList.map((i) => i.jlr_model_name),
    //   stroke: { width: 0 },
    //   colors: ["#28c76f66", "#28c76f33", success],
    //   grid: {
    //     padding: {
    //       right: -20,
    //       bottom: -8,
    //       left: -20,
    //     },
    //   },
    //   plotOptions: {
    //     pie: {
    //       startAngle: -10,
    //       donut: {
    //         labels: {
    //           show: true,
    //           name: {
    //             offsetY: 15,
    //           },
    //           value: {
    //             offsetY: -15,
    //             formatter(val) {
    //               return `${parseInt(val)} %`;
    //             },
    //           },
    //           total: {
    //             show: true,
    //             offsetY: 15,
    //             label: "Sales Daily",
    //             formatter() {
    //               return "60%";
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 1325,
    //       options: {
    //         chart: {
    //           height: 100,
    //         },
    //       },
    //     },
    //     {
    //       breakpoint: 1200,
    //       options: {
    //         chart: {
    //           height: 120,
    //         },
    //       },
    //     },
    //     {
    //       breakpoint: 1065,
    //       options: {
    //         chart: {
    //           height: 100,
    //         },
    //       },
    //     },
    //     {
    //       breakpoint: 992,
    //       options: {
    //         chart: {
    //           height: 120,
    //         },
    //       },
    //     },
    //   ],
    // };
    // optionsForJaguar = {
    //   chart: {
    //     toolbar: {
    //       show: false,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   legend: { show: false },
    //   comparedResult: [2, -3, 8],
    //   labels: JAGretailerList.map((i) => i.jlr_model_name),
    //   stroke: { width: 0 },
    //   colors: ["#b99976", "#d2b48c", "#b99975"],
    //   grid: {
    //     padding: {
    //       right: -20,
    //       bottom: -8,
    //       left: -20,
    //     },
    //   },
    //   plotOptions: {
    //     pie: {
    //       startAngle: -10,
    //       donut: {
    //         labels: {
    //           show: true,
    //           name: {
    //             offsetY: 15,
    //           },
    //           value: {
    //             offsetY: -15,
    //             formatter(val) {
    //               return `${parseInt(val)} %`;
    //             },
    //           },
    //           total: {
    //             show: true,
    //             offsetY: 15,
    //             label: "Sales Daily",
    //             formatter() {
    //               return "60%";
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   responsive: [
    //     {
    //       breakpoint: 1325,
    //       options: {
    //         chart: {
    //           height: 100,
    //         },
    //       },
    //     },
    //     {
    //       breakpoint: 1200,
    //       options: {
    //         chart: {
    //           height: 120,
    //         },
    //       },
    //     },
    //     {
    //       breakpoint: 1065,
    //       options: {
    //         chart: {
    //           height: 100,
    //         },
    //       },
    //     },
    //     {
    //       breakpoint: 992,
    //       options: {
    //         chart: {
    //           height: 120,
    //         },
    //       },
    //     },
    //   ],
    // };
  }
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ["Monthly", "Daily", "Weekly"],
    stroke: { width: 0 },
    colors: ["#28c76f66", "#28c76f33", success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: "Sales Daily",
              formatter() {
                return "60%";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };

  return (
    <>
      {users.role === "admin" || users.role === "Admin" ? (
        <>
          <div className="d-flex flex-sm-row flex-column justify-content-around ">
            <Card className="earnings-card">
              <CardBody style={{ padding: "0px 0px 15px 0px" }}>
                <Row>
                  <Col
                    xs="12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#f3f2f7",
                      marginBottom: "15px",
                    }}
                  >
                    <CardTitle
                      className="mb-1"
                      style={{ fontSize: "18px", color: "#000" }}
                    >
                      Jaguar
                    </CardTitle>
                  </Col>
                  <Col
                    xs="12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Chart
                      options={optionsForJaguar}
                      series={JAGretailerList.map((i) => i.model_count)}
                      type="donut"
                      height={300}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card className="earnings-card">
              <CardBody style={{ padding: "0px 0px 15px 0px" }}>
                <Row>
                  <Col
                    xs="12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#f3f2f7",
                      marginBottom: "15px",
                    }}
                  >
                    <CardTitle
                      className="mb-1"
                      style={{ fontSize: "18px", color: "#000" }}
                    >
                      Land Rover
                    </CardTitle>
                  </Col>
                  <Col
                    xs="12"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Chart
                      options={optionsForLandRover}
                      series={LRretailerList.map((i) => i.model_count)}
                      type="donut"
                      height={300}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </>
      ) : (
        <Card className="earnings-card">
          <CardBody>
            <Row>
              <Col xs="12">
                <CardTitle
                  className="mb-1"
                  style={{ fontSize: "18px", color: "#000" }}
                >
                  Welcome{" "}
                  {users.role === "admin" || users.role === "Admin"
                    ? "Admin"
                    : "Dealer"}{" "}
                  {" " + "!"}
                </CardTitle>
                {/* <div className="font-small-2">This Month </div>
            <h5 className="mb-1">$455 K </h5> */}
                {/* <CardText className="text-muted font-small-2">
              <span className="fw-bolder">92.91%</span>
              <span> more Report Count than last month.</span>
            </CardText> */}
              </Col>
              <Col xs="12">
                <Chart
                  options={options}
                  series={[53, 16, 31]}
                  type="donut"
                  height={120}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Earnings;
