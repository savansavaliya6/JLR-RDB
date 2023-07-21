import { useEffect, useState, Fragment } from "react";
// import { Button, Input, Toast } from "reactstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Breadcrumbs from "@components/breadcrumbs";
import "@styles/react/libs/charts/apex-charts.scss";
// import { Card } from "react-bootstrap";
import Loader from "react-js-loader";
import axios from "axios";
import Select from "react-select";
// import {
//   Card,
//   CardHeader,
//   Row,
//   Col,
//   CardTitle,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   Button,
//   UncontrolledTooltip,
//   Label,
//   Input,
//   FormFeedback,
// } from "reactstrap";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {
  getDropdownValue,
  getData,
  deleteUser,
  updateUser,
  addUser,
} from "../../../src/views/users/store/index";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dealerCode, setDealerCode] = useState("");
  const [jaguarCode, setJaguarCode] = useState("");
  const [landRoverCode, setLandRoverCode] = useState("");
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [jaguar_retailer, setJagaurRetailer] = useState("");
  const [land_rover_retailer, setLandRoverRetailer] = useState("");
  const [selectedValueJAR, setSelectedValueJAR] = useState([]);
  const [defaultJARValue, setDefaultJARValue] = useState({});
  const [selectedValueLR, setSelectedValueLR] = useState([]);
  const [defaultLRValue, setDefaultLRValue] = useState({});
  const [jgSearchValue, setJgSearchValue] = useState("");
  const [lrSearchValue, setLrSearchValue] = useState("");
  const users = JSON.parse(sessionStorage.getItem("userRole"));

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    retailerData();
    retailerDatas();
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   // dispatch(
  //   //   getDropdownValue({
  //   //     page: currentPage,
  //   //     perPage: rowsPerPage,
  //   //     role: roleSearchValue,
  //   //     // land_rover_retailer: lrSearchValue,
  //   //     // jaguar_retailer: jgSearchValue,
  //   //   })
  //   // )
  //   //   .then(() => {
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((error) => {
  //   //     setLoading(false);
  //   //     console.error(error);
  //   //   });
  // });
  const retailerData = () => {
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/udaan/jag",
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          const mydata = response.data.data;
          // console.log('mydata-jg' + JSON.stringify(mydata))
          setSelectedValueJAR(mydata);

          const data = mydata.filter(
            (item) => item.dealer_code == users.jag_code
          );

          setDefaultJARValue({
            value: data[0]?.dealer_code,
            label: data[0]?.dealer_name,
          });
          setLoading(false);
        }
      })
      .catch((err) => console.log("er--", err));
  };

  const retailerDatas = () => {
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/udaan/lr",
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          const mydata = response.data.data;
          // console.log('mydata-lr' + JSON.stringify(mydata))
          setSelectedValueLR(mydata);
          const data = mydata.filter(
            (item) => item.dealer_code == users.lr_code
          );

          setDefaultLRValue({
            value: data[0]?.dealer_code,
            label: data[0]?.dealer_name,
          });
          setLoading(false);
        }
      })
      .catch((err) => console.log("er--", err));
  };

  const findRetailerCode = () => {
    let value = selectedValueJAR.filter(
      (i) => i.dealer_name == jaguar_retailer.label
    );
    let value2 = selectedValueLR.filter(
      (i) => i.dealer_name == land_rover_retailer.label
    );

    setDefaultJARValue({
      value: value[0]?.dealer_code,
      label: jaguar_retailer.label.toString(),
    });
    setDefaultLRValue({
      value: value2[0]?.dealer_code,
      label: land_rover_retailer.label.toString(),
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    findRetailerCode();
    var data = {
      email: email ? email : users.email,
      role: users.role,
      first_name: name,
      contact_no: contactNumber,
      // jag_code: jaguarCode,
      // lr_code: landRoverCode,
      status: "active",
      land_rover_retailer: land_rover_retailer.label.toString(),
      jaguar_retailer: jaguar_retailer.label.toString(),
    };

    var config = {
      method: "put",
      url: `https://rdbapi.vnvserver.com/user/profile/${users.id}`,
      data: { data: data },
    };

    axios(config).then(function (response) {
      if (response.data.status === 200) {
        toast.success(response.data.message);
        setLoading(false);
      } else {
        toast.error(response.data.error);
        setLoading(false);
      }
    });
  };
  return loading ? (
    <div className="centered-div">
      <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
    </div>
  ) : (
    <div>
      <h2>Profile</h2>
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0px 0px 10px #ccc",
          padding: "20px",
        }}
      >
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Role</label>
              <input
                max={5}
                type="text"
                value={
                  users.role === "admin" || users.role === "Admin"
                    ? "Admin"
                    : "Dealer"
                }
                disabled
                style={{ borderColor: "#ccc" }}

              // onChange={(e) => setRole(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={users.name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  borderColor: isHovered1 ? "black " : "#ccc",
                  border: isHovered1 ? "2px solid black " : "1px solid #ccc",
                }}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              />
            </Form.Field>
            <Form.Field>
              <label>Email address</label>
              <input
                type="email"
                placeholder="Enter email"
                value={users.email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderColor: isHovered2 ? "black " : "#ccc",
                  border: isHovered2 ? "2px solid black " : "1px solid #ccc",
                }}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Contact Number</label>
              <input
                // max={5}
                type="number"
                placeholder="Enter Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                style={{
                  borderColor: isHovered3 ? "black " : "#ccc",
                  border: isHovered3 ? "2px solid black " : "1px solid #ccc",
                }}
                onMouseEnter={() => setIsHovered3(true)}
                onMouseLeave={() => setIsHovered3(false)}
              />
            </Form.Field>

            {/* {users.role && (
              <Form.Field controlId="formBasicStatus">
                <label>Dealer Code</label>
                <input
                  max={5}
                  type="text"
                  value={users.dealer_code}
                  disabled
                  style={{ borderColor: "#ccc" }}

                  // onChange={(e) => setDealerCode(e.target.value)}
                />
              </Form.Field>
            )} */}
            {/* <Col md={3}> */}
            <Form.Field controlId="formBasicStatus">
              <label>Jaguar Retailer</label>

              <Select
                styles={{
                  control: (provided) => ({
                    ...provided,
                  }),
                }}
                className="select "
                isDisabled={false}
                isSearchable={true}
                defaultValue={defaultJARValue}
                onChange={(selectedOption) => setJagaurRetailer(selectedOption)}
                // {...register("jaguar_retailer")}
                options={selectedValueJAR.map((item) => ({
                  value: item.dealer_code,
                  label: item.dealer_name,
                }))}
              ></Select>
            </Form.Field>

            <Form.Field>
              <label>Jaguar Code</label>
              <input
                max={5}
                type="text"
                placeholder="Enter Jaguar Code"
                value={defaultJARValue.value}
                disabled
                style={{ borderColor: "#ccc" }}

              // onChange={(e) => setJaguarCode(e.target.value)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field controlId="formBasicStatus">
              <label>Land Rover Code</label>

              <input
                max={5}
                type="text"
                placeholder="Enter LandRover Code"
                value={defaultLRValue.value}
                style={{ borderColor: "#ccc" }}
                disabled
              // onChange={(e) => setLandRoverCode(e.target.value)}
              />
            </Form.Field>

            <Form.Field controlId="formBasicStatus">
              <label>LandRover Retailer</label>

              <Select
                styles={{
                  control: (provided) => ({
                    ...provided,
                  }),
                }}
                onChange={(selectedOption) => {
                  setLandRoverRetailer(selectedOption);
                }}
                defaultValue={defaultLRValue}
                options={selectedValueLR.map((item) => ({
                  value: item.dealer_code,
                  label: item.dealer_name,
                }))}
                isSearchable={true}
                className="select"
              ></Select>
            </Form.Field>
            <Form.Field controlId="formBasicStatus">
              <label>Status</label>
              <input
                max={5}
                placeholder="Status"
                value={"active"}
                disabled
                style={{ borderColor: "#ccc" }}

              // onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field
            id="form-button-control-public"
            control={Button}
            content="Update Profile"
            onClick={handleSubmit}
            style={{ backgroundColor: "#42b983 ", color: "white" }}
          />
        </Form>
      </div>

      {/* <footer
        style={{
          position: "fixed",
          backgroundColor: "whitesmoke",
          width: "78%",
          bottom: "0",
          padding: "3px",
          textAlign: "centerGridLayout",
        }}
        className="auth-footer-btn d-flex justify-content-center"
      >
        <small
          className="text-center ml-1"
          style={{
            letterSpacing: "4px",
            fontWeight: "400",
            color: "black",
            wordSpacing: "4px",
            fontSize: "1rem",
          }}
        >
          &copy;2023 Jagaur Land Rover South Africa
        </small>
      </footer> */}
    </div>
  );
};

export default Profile;
