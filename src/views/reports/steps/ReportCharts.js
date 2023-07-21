import React, { useState } from "react";
import styled from "styled-components";
import { SimpleDropdown } from "react-js-dropdavn";
import "react-js-dropdavn/dist/index.css";
import { Card, CardBody, CardHeader } from "reactstrap";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
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
  color: #d5f0e4;
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
  margin-top: 100px;
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
    name: "Net Profit",
    data: [44, 55, 57, 56, 61, 58, 63, 54, 16],
  },
  {
    name: "Revenue",
    data: [76, 85, 101, 98, 87, 80, 91, 97, 94],
  },
  {
    name: "Free Cash Flow",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
  {
    name: "Net Profit",
    data: [49, 59, 59, 59, 69, 59, 69, 69, 66],
  },
  {
    name: "Revenue",
    data: [72, 82, 102, 92, 82, 102, 92, 112, 94],
  },
  {
    name: "Free Cash Flow",
    data: [30, 40, 30, 20, 40, 40, 50, 50, 41],
  },
];
const series1 = [44, 55, 41, 17, 15];

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
    text: "Product Trends by Month",
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

  labels: ["Jan", "Feb", "Mar", "Apr", "May"],

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
  const dataSet = useSelector((state) => state.chart.dataSet);

  const [activeStep, setActiveStep] = useState(1);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const totalSteps = steps.length;

  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
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
        <ButtonStyle onClick={prevStep} disabled={activeStep === 1}>
          Previous
        </ButtonStyle>
        <ButtonStyle onClick={nextStep} disabled={activeStep === totalSteps}>
          Next
        </ButtonStyle>
      </ButtonsContainer>
      {activeStep === 1 && (
        <div style={{ padding: "5%" }}>
          <Card>
            <CardHeader>
              <h2 style={{ color: "black" }}>{dataSet}</h2>
            </CardHeader>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "black",
                  marginRight: "1rem",
                }}
              >
                <div className="avatar-content" style={{ marginRight: "1rem" }}>
                  X axis
                  <SimpleDropdown
                    options={data}
                    clearable
                    searchable
                    configs={{ position: { y: "top", x: "center" } }}
                  />
                </div>
                <div className="avatar-content">
                  Y axis
                  <SimpleDropdown
                    options={data}
                    clearable
                    searchable
                    configs={{ position: { y: "top", x: "center" } }}
                  />
                </div>
                <div>Sales Year - 2022</div>
              </div>
            </CardBody>
            <Chart
              options={options}
              series={series}
              type={"bar"}
              height={"100%"}
            />
            {/* {!hideChart && (
 
)} */}
          </Card>
        </div>
      )}{" "}
      {activeStep === 2 && (
        <div style={{ padding: "5%" }}>
          <Card>
            <CardHeader>
              <h2 style={{ color: "black" }}>{dataSet}</h2>
            </CardHeader>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "black",
                  marginRight: "1rem",
                }}
              >
                <div className="avatar-content" style={{ marginRight: "1rem" }}>
                  X axis
                  <SimpleDropdown
                    options={data}
                    clearable
                    searchable
                    configs={{ position: { y: "top", x: "center" } }}
                  />
                </div>
                <div className="avatar-content">
                  Y axis
                  <SimpleDropdown
                    options={data}
                    clearable
                    searchable
                    configs={{ position: { y: "top", x: "center" } }}
                  />
                </div>{" "}
                <div>Sales Year - 2022</div>
              </div>
            </CardBody>
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
        <div style={{ padding: "5%" }}>
          <Card>
            <CardHeader>
              <h2 style={{ color: "black" }}>{dataSet}</h2>
            </CardHeader>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "black",
                }}
              >
                <div>Sales Year - 2022</div>
              </div>
            </CardBody>
            <Chart
              options={options2}
              series={series1}
              type={"pie"}
              height={320}
            />
          </Card>
        </div>
      )}
    </MainContainer>
  );
};

export default ReportCharts;
