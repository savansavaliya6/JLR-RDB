import React, { useState } from "react";
import styled from "styled-components";
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";
import { Card, CardBody, CardHeader } from "reactstrap";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  width: 80%;
  max-width: 100%;
  margin: 0 auto;
  height: 20%;
  // padding: 0 0px;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  // margin-top: 20px;
  position: relative;
  :before {
    content: "";
    position: absolute;
    background: #d5f0e4;
    height: 4px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  :after {
    content: "";
    position: absolute;
    background: #42b983;
    height: 4px;
    width: ${({ width }) => width};
    top: 50%;
    transition: 0.4s ease;
    transform: translateY(-50%);
    left: 0;
  }
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid
    ${({ step }) => (step === "completed" ? "#42b983" : "#d5f0e4")};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCount = styled.span`
  font-size: 19px;
  color: #42b983;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StepLabel = styled.span`
  font-size: 19px;
  color: #42b983;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 -15px;
  margin-top: 60px;
`;

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #42b983;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #d5f0e4;
    color: #000000;
    cursor: not-allowed;
  }
`;

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #42b983;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`;

const steps = [
  {
    label: "Bar",
    step: 1,
  },
  {
    label: "Line",
    step: 2,
  },
  {
    label: "Pie",
    step: 3,
  },
  // {
  //   label: "Summary",
  //   step: 4,
  // },
];
const data = [{ label: "Monthly", value: 1 }];
const options = {
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
  },
  yaxis: {
    title: {
      text: "(Sales)",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "" + val + " Sales";
      },
    },
  },
};

const series = [
  {
    name: "Land Rover Range Rover Evoque",
    data: [44, 55, 57, 56, 61, 58, 63, 54, 16],
  },
  {
    name: "Land Rover Discovery Sport",
    data: [76, 85, 101, 98, 87, 80, 91, 97, 94],
  },
  {
    name: "Land Rover Discovery",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
  {
    name: "Land Rover Range Rover Sport",
    data: [49, 59, 59, 59, 69, 59, 69, 69, 66],
  },
  {
    name: "Land Rover Range Rover Velar",
    data: [72, 82, 102, 92, 82, 102, 92, 112, 94],
  },
  {
    name: "Land Rover New Defender",
    data: [30, 40, 30, 20, 40, 40, 50, 50, 41],
  },
];
const series1 = [44, 55, 41, 17, 15, 41, 17, 15, 50];

const options1 = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    // text: "Product Trends by Month",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
};
const options2 = {
  legend: {
    show: true,
    position: "bottom",
  },
  chart: {
    width: 280,
    type: "pie",
    dropShadow: {
      enabled: true,
      color: "black",
      top: 5,
      left: 3,
      blur: 3,
      opacity: 0.2,
      backgroundColor: "red",
    },
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
          },
        },
      },
    },
  },

  labels: [
    "Jaguar XF",
    "Jaguar F-TYPE",
    "Jaguar F-TYPE",
    "Jaguar F-PACE",
    "Jaguar E-PACE",
    "Jaguar XF",
    "Jaguar F-TYPE",
    "Jaguar I-PACE",
    "Jaguar F-PACE",
  ],
  dataLabels: {
    dropShadow: {
      blur: 0,
      opacity: 0.8,
    },
  },
  fill: {
    type: "pattern",
    opacity: 1,
    pattern: {
      enabled: true,
      style: [
        "verticalLines",
        "squares",
        "horizontalLines",
        "circles",
        "slantedLines",
        "squares",
        "horizontalLines",
        "circles",
        "slantedLines",
        "squares",
        "horizontalLines",
        "circles",
        "slantedLines",
      ],
    },
  },
  states: {
    hover: {
      filter: "none",
    },
  },

  responsive: [
    {
      breakpoint: 992,
      options: {
        chart: {
          height: 380,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};
const ReportCharts = () => {
  const reportName = useSelector((state) => state.chart.reportName);

  const dataSet = useSelector((state) => state.chart.dataSet);
  console.log("dataSet", dataSet);
  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const totalSteps = steps.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;
  const navigate = useNavigate();

  return (
    <div>
      <MainContainer>
        <StepContainer width={width}>
          {steps.map(({ step, label }) => (
            <StepWrapper key={step}>
              <StepStyle step={activeStep >= step ? "completed" : "incomplete"}>
                {activeStep > step ? (
                  <CheckMark>L</CheckMark>
                ) : (
                  <StepCount>{step}</StepCount>
                )}
              </StepStyle>
              <StepsLabelContainer>
                <StepLabel key={step}>{label}</StepLabel>
              </StepsLabelContainer>
            </StepWrapper>
          ))}
        </StepContainer>
        <ButtonsContainer>
          {activeStep === 1 ? (
            <ButtonStyle
              onClick={() => {
                navigate("/reports/charts");
              }}
            >
              Previous
            </ButtonStyle>
          ) : (
            <ButtonStyle onClick={prevStep}>Previous</ButtonStyle>
          )}
          {activeStep === 3 ? (
            <ButtonStyle
              onClick={() => {
                navigate("/charts/preview");
              }}
            >
              Preview
            </ButtonStyle>
          ) : (
            <ButtonStyle
              onClick={nextStep}
              // disabled={activeStep === totalSteps}
            >
              Next
            </ButtonStyle>
          )}
        </ButtonsContainer>
      </MainContainer>
      {activeStep === 1 && (
        <div style={{ padding: "3%", marginTop: "20" }}>
          <Card style={{ padding: "3%" }}>
            <CardHeader>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3 style={{ color: "black" }}>Report Name: </h3>
                <h3 style={{ color: "" }}> {reportName}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3 style={{ color: "black" }}>Data Set: </h3>
                <h3 style={{ color: "" }}> {dataSet}</h3>
              </div>
            </CardHeader>

            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "black",
                }}
              >
                <div
                  className="avatar-content"
                  style={{
                    marginRight: "5rem",

                    padding: "5px",
                    width: "12rem",
                  }}
                >
                  <h4 style={{ color: "black" }}> X axis</h4>

                  <select
                    style={{
                      fontSize: "17px",
                      color: "black",
                      borderRadius: "4px",
                    }}
                    className={"form-control"}
                  >
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div
                  className="avatar-content"
                  style={{
                    marginRight: "2rem",
                    padding: "5px",
                    width: "12rem",
                  }}
                >
                  <h4 style={{ color: "black" }}> Y axis</h4>
                  <select
                    style={{
                      fontSize: "17px",
                      color: "black",
                      borderRadius: "4px",
                      // width: "140%",
                    }}
                    className={"form-control"}
                  >
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>
            </CardBody>
            <div
              className="avatar-content"
              style={{
                display: "flex",

                justifyContent: "flex-end",
                justifySelf: "end",
              }}
            >
              <h4> Sales Year - 2022</h4>
            </div>
            <Chart
              options={options}
              series={series}
              type={"bar"}
              height={"100%"}
            />
          </Card>
        </div>
      )}{" "}
      {activeStep === 2 && (
        <div style={{ padding: "3%", marginTop: "20" }}>
          <Card style={{ padding: "3%" }}>
            <CardHeader>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3 style={{ color: "black" }}>Report Name: </h3>
                <h3 style={{ color: "" }}> {reportName}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3 style={{ color: "black" }}>Data Set: </h3>
                <h3 style={{ color: "" }}> {dataSet}</h3>
              </div>
            </CardHeader>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "black",
                }}
              >
                <div
                  className="avatar-content"
                  style={{
                    marginRight: "5rem",

                    padding: "10px",
                    width: "12rem",
                  }}
                >
                  X axis
                  <select
                    style={{
                      fontSize: "17px",
                      color: "black",
                      borderRadius: "4px",
                    }}
                    className={"form-control"}
                  >
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div
                  className="avatar-content"
                  style={{
                    marginRight: "2rem",

                    padding: "10px",
                    width: "12rem",
                  }}
                >
                  Y axis
                  <select
                    style={{
                      fontSize: "17px",
                      color: "black",
                      borderRadius: "4px",
                      // width: "140%",
                    }}
                    className={"form-control"}
                  >
                    <option value="Sales">Sales</option>
                  </select>
                </div>
              </div>
            </CardBody>
            <div
              className="avatar-content"
              style={{
                display: "flex",

                justifyContent: "flex-end",
                justifySelf: "end",
              }}
            >
              <h4> Sales Year - 2022</h4>
            </div>
            <Chart
              options={options1}
              series={series}
              type={"line"}
              height={320}
            />
          </Card>
        </div>
      )}
      {activeStep === 3 && (
        <div style={{ padding: "3%", marginTop: "20" }}>
          <Card style={{ padding: "3%" }}>
            <CardHeader>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3 style={{ color: "black" }}>Report Name: </h3>
                <h3 style={{ color: "" }}> {reportName}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h3 style={{ color: "black" }}>Data Set: </h3>
                <h3 style={{ color: "" }}> {dataSet}</h3>
              </div>
            </CardHeader>

            <div
              className="avatar-content"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                justifySelf: "end",
              }}
            >
              <h4> Sales Year - 2022</h4>
            </div>

            <Chart
              options={options2}
              series={series1}
              type={"pie"}
              height={320}
            />
          </Card>
        </div>
      )}
      {activeStep === 4 && (
        <div
          style={{
            // width: " 100vw",
            // height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Tabs />
        </div>
      )}
    </div>
  );
};

export default ReportCharts;
