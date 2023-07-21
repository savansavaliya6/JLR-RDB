import React, { useEffect, useState } from "react";
import { ArrowLeft, BarChart2 } from "react-feather";
import Loader from "react-js-loader";
import { Row, Button, Col } from "reactstrap";
import Chart from "react-apexcharts";
import { Card, CardHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
// import { addReport, getReportLeads } from "../store/index";
import { useDispatch } from "react-redux";
const data = [
  { series: 20 },
  { series: 15 },
  { series: 49 },
  { series: 43 },
  { series: 32 },
];

const ReportResult = ({ stepper }) => {
  const dispatch = useDispatch();
  const [list, setUserName] = useState([]);

  const [sqltable, setSqlTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const reportChart = useSelector((state) => state.chart.reportChart);
  const charttype = Array.from(new Set(reportChart));
  const brandName = useSelector((state) => state.chart.brandName);
  const reportName = useSelector((state) => state.chart.reportName);
  const userName = useSelector((state) => state.chart.userName);
  const chart_value = Array.from(new Set(userName));
  const userLeads = useSelector((state) => state.chart.userLeads);
  const chart_count = Array.from(new Set(userLeads));
  const password = useSelector((state) => state.chart.password);

  const functionTwo = () => {
    setSqlTable(true);
  };

  const series = chart_count.map((i) => parseInt(i));

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
        color: "#111",
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
    labels: chart_value.map((row) => row),
    dataLabels: {
      dropShadow: {
        blur: 3,
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
  const options1 = {
    legend: {
      show: true,
      position: "bottom",
    },
    labels: list.map((row) => row.name),
    chart: {
      type: "donut",
    },
    stroke: {
      colors: ["#fff"],
    },
    fill: {
      opacity: 0.8,
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series3 = [
    {
      data: chart_count.map((i) => i),
    },
  ];
  const options3 = {
    chart: {
      id: "basic-bar",
    },
    dataLabels: {
      enabled: true,
    },
    markers: {
      colors: ["#F44336", "#E91E63"],
    },
    fill: {
      colors: ["#F44336", "#E91E63"],

      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      title: { text: "User Name" },
      categories: chart_value.map((row) => row),
    },
    yaxis: {
      min: 0,
      max: 1200,
      title: {
        text: "User Leads",
      },
    },
  };

  // const reportValues = {
  //   name: reportName,
  //   brand_name: brandName,
  //   password: password,
  //   type: charttype,
  // };

  // const handleSubmit = () => {
  //   dispatch(addReport(reportValues));
  // };
  useEffect(() => {
    getReportLeads();
  }, [3000]);
  const getReportLeads = () => {
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/api/report/leads",
    };

    axios(config).then(function (response) {
      setUserName(response.data.result);
    });
  };

  const handleSubmit = () => {
    if (
      reportName == "" &&
      brandName == "" &&
      password == "" &&
      charttype.length <= 0
    ) {
      toast.error("Something is missing!");
      return;
    }
    var data = {
      report_name: reportName,
      brand_name: brandName,
      password: password,
      chart_type: charttype,
      chart_value: chart_value,
      chart_count: chart_count,
    };
    console.log("data-----", data);
    var config = {
      method: "post",
      url: "https://rdbapi.vnvserver.com/api/report/data",
      data: { data: data },
    };
    setLoading(true);
    axios(config).then(function (response) {
      if (response.data.status === 200) {
        toast.success(response.data.msg);

        setLoading(false);
        // navigate("/login", { replace: true });
      } else {
        toast.error(response.data.msg);

        setLoading(false);
      }
    });
  };

  return (
    <div>
      <div onClick={functionTwo}>
        {sqltable ? (
          <Button color="success" style={{ backgroundColor: "green" }}>
            Report Chart
          </Button>
        ) : (
          <Button style={{ backgroundColor: "green" }}>
            Click to view chart
          </Button>
        )}
      </div>

      <Row>
        <Card>
          <CardHeader
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "10px",
            }}
          >
            {charttype.map((i) => (
              <div
                style={{
                  backgroundColor: "pink",
                  padding: 10,
                  borderRadius: 10,
                  color: "white",
                  fontWeight: "300",
                }}
              >
                <BarChart2 />
                {i}
              </div>
            ))}
          </CardHeader>

          {/* <Row> */}
          {charttype.map((i) => (
            <Col>
              {sqltable === true && (
                <Chart
                  key={i}
                  options={
                    i === "donut"
                      ? options1
                      : i === "pie"
                        ? options2
                        : i === "line"
                          ? options3
                          : options3
                  }
                  series={
                    i === "donut"
                      ? series
                      : i === "pie"
                        ? series
                        : i === "line"
                          ? series3
                          : series3
                  }
                  type={i}
                  height={i === "donut" || i === "pie" ? 320 : 320}
                />
              )}
            </Col>
          ))}
          {/* </Row> */}
        </Card>
      </Row>
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        {loading ? (
          <Loader type="spinner-default" bgColor={"#42b983"} size={10} />
        ) : (
          <Button
            color="success"
            className="btn-submit"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportResult;
