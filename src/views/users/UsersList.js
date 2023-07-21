import { Fragment, useState, useEffect, memo, Suspense } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getDropdownValue,
  getData,
  deleteUser,
  updateUser,
  addUser,
} from "./store";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { ChevronDown, Eye, Edit, Trash } from "react-feather";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "react-js-loader";

import {
  Card,
  CardHeader,
  Row,
  Col,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  UncontrolledTooltip,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
import * as yup from "yup";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import "./UserList.css";
import axios from "axios";
import Select from "react-select";

import x_coordinate from "../../assets/imgs/x-coordinate.png";
import { toast } from "react-hot-toast";

const MySwal = withReactContent(Swal);

const DataTableServerSide = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.datatables);
  useEffect(() => {
    retailerData();
    retailerDatas();
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [role, setRole] = useState("");
  const [jaguar_retailer, setJagaurRetailer] = useState("");
  const [land_rover_retailer, setLandRoverRetailer] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [selectedValueJAR, setSelectedValueJAR] = useState([]);
  const [selectedValueLR, setSelectedValueLR] = useState([]);
  const [pending, setPending] = useState(true);
  const [roleSearchValue, setRoleSearchValue] = useState("");
  const [jgSearchValue, setJgSearchValue] = useState("");
  const [lrSearchValue, setLrSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [jag_code, setjag_code] = useState("");
  const [lr_code, setlr_code] = useState("");
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  //   useEffect(() => {
  //     setLoading(true);
  //     console.log("first");
  //     dispatch(
  //       getDropdownValue({
  //         page: currentPage,
  //         perPage: rowsPerPage,
  //         role: roleSearchValue,
  //         land_rover_retailer: lrSearchValue,
  //         jaguar_retailer: jgSearchValue,
  //       })
  //     )
  //       .then(() => {
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         setLoading(false);
  //         console.error(error);
  //       });
  //   }, [roleSearchValue, jgSearchValue, lrSearchValue]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setUser(user);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const SignupSchema = yup.object().shape({
    role: yup.object({
      value: yup.string().required("Please select a role"),
    }),
    jaguar_retailer: yup.object({
      value: yup.string().required("Please select a Jaguar Retailer"),
    }),
    land_rover_retailer: yup.object({
      value: yup.string().required("Please select a Land Rover Retailer"),
    }),

    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Email is required "),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(6, "Confirm Password is required")
      .oneOf(
        [yup.ref("password"), null],
        "Passwords must match with above password"
      ),
  });
  const editSchema = yup.object().shape({
    // role: yup
    //     .string()
    //     .min(3, "Role Name is required")
    //     .required("Role is required"),

    // jaguar_retailer: yup
    //     .string()
    //     .min(3, "Jaguar Retailer is required")
    //     .required("Jaguar Retailer is required"),

    // land_rover_retailer: yup
    //     .string()
    //     .min(3, "Land Rover Retailer is required")
    //     .required("Land Rover Retailer is required"),

    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    editEmail: yup
      .string()
      .email("Please enter valid email address")
      .required("Email is required "),
    editPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    // role: "",
    // lr_code: "",
    // jag_code: "",
    land_rover_retailer: "",
    jaguar_retailer: "",
    email: "",
    password: "",
  });

  const defaultValuesForCreate = {
    id: user.id,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name,
    lr_code: user.lr_code,
    jag_code: user.jag_code,
    jaguar_retailer: user.jaguar_retailer,
    land_rover_retailer: user.land_rover_retailer,
    email: user.email,
    password: user.password,
  };
  const defaultValuesForEdit = {
    id: user.id,
    role: user.role,
    firstName: user.first_name,
    lastName: user.last_name,
    lrCode: user.lr_code,
    jagCode: user.jag_code,
    jaguarRetailer: user.jaguar_retailer,
    landRoverRetailer: user.land_rover_retailer,
    editEmail: user.email,
    editPassword: user.password,
  };
  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
    </div>
  );
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValuesForCreate,
    resolver: yupResolver(SignupSchema),
  });
  const {
    handleSubmit: handleEditSubmit,
    register: editRegister,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValuesForEdit,
    resolver: yupResolver(editSchema),
  });

  useEffect(() => {
    setLoading(true);
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [currentPage, rowsPerPage, searchValue]);

  const handleFilter = (e) => {
    setSearchValue(e.target.value);

    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    );
  };

  const handlePagination = (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchValue,
      })
    );
    setCurrentPage(page.selected + 1);
  };
  const handlePerPage = (e) => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
      })
    );
    setRowsPerPage(parseInt(e.target.value));
  };

  const CustomPagination = () => {
    const count = store.total || 1;
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  const columns = [
    {
      name: "Action",
      minWidth: "90px",
      cell: (row) => (
        <div className="column-action d-flex align-items-center justify-content-center">
          <Edit
            size={17}
            className="cursor-pointer me-1"
            id={`edit-tooltip-${row.id}`}
            onClick={() => {
              setUser(row);
              setShow(true);
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`edit-tooltip-${row.id}`}
          >
            Edit User
          </UncontrolledTooltip>
          <Link
            className="d-none"
            to={`/apps/invoice/preview/${row.id}`}
            id={`pw-tooltip-${row.id}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
          <UncontrolledTooltip
            className="d-none"
            placement="top"
            target={`pw-tooltip-${row.id}`}
          >
            Preview User
          </UncontrolledTooltip>
          <Trash
            size={17}
            className="cursor-pointer"
            id={`trash-tooltip-${row.id}`}
            onClick={async (e) => {
              e.preventDefault();
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                customClass: {
                  confirmButton: "swal-space-right",
                  cancelButton: "swal-space-left",
                },
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    await dispatch(deleteUser(row.id));
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                  } catch (error) {
                    Swal.fire(
                      "Error",
                      "An error occurred while deleting the user.",
                      "error"
                    );
                  }
                }
              });
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`trash-tooltip-${row.id}`}
          >
            Delete User
          </UncontrolledTooltip>
        </div>
      ),
    },
    {
      name: "ID",
      sortable: true,
      minWidth: "40px",
      right: true,
      // style: { color: "#000" },
      selector: (row) => row.id,
    },
    {
      name: "Role",
      sortable: true,
      minWidth: "100px",
      // style: { color: "#000" },
      selector: (row) =>
        row.role === "user" || row.role === "Dealer"
          ? "Dealer"
          : "Admin" || "--",
    },
    {
      name: "First Name",
      sortable: true,
      minWidth: "140px",
      // style: { color: "#000" },
      selector: (row) => row.first_name || "--",
    },
    {
      name: "Last Name",
      sortable: true,
      minWidth: "140px",
      // style: { color: "#000" },
      selector: (row) => row.last_name || "--",
    },
    {
      name: "Email",
      // style: { color: "#000" },
      sortable: true,
      minWidth: "230px",
      cell: (row) => (
        <div style={{ textTransform: "lowercase" }}>{row.email}</div>
      ),
      selector: email || "--",
    },
    {
      name: "Jaguar code",
      sortable: true,
      minWidth: "170px",
      // style: { color: "#000" },
      right: true,
      selector: (row) => row.jag_code || "--",
    },
    {
      name: "LandRover code",
      sortable: true,
      minWidth: "180px",
      // style: { color: "#000" },
      right: true,
      selector: (row) => row.lr_code || "--",
    },
    {
      name: "Jaguar Retailer",
      sortable: true,
      // style: { color: "#000" },
      minWidth: "200px",
      selector: (row) => row.jaguar_retailer.replace(/"/g, "") || "--",
    },

    {
      name: "LandRover Retailer",
      sortable: true,
      minWidth: "200px",
      // style: { color: "#000" },
      selector: (row) => row.land_rover_retailer.replace(/"/g, "") || "--",
    },
  ];

  const dataToRender = () => {
    const filters = {
      q: searchValue,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const userValues = {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    jaguar_retailer: jaguar_retailer.label,
    land_rover_retailer: land_rover_retailer.label,
    role: role,
    jag_code: jaguar_retailer.value,
    lr_code: land_rover_retailer.value,
  };

  useEffect(() => {
    if (show1) {
      setPassword("");
      setFirst_name("");
      setLast_name("");
      setEmail("");
      // setRole("");
      // setJagaurRetailer("");
      // setLandRoverRetailer("")
    }
  }, [show1]);
  const onCreateHandler = () => {
    if (
      email.length > 3 &&
      first_name.length > 3 &&
      last_name.length > 3 &&
      password.length > 5
    ) {
      dispatch(addUser(userValues));
      reset();
      editReset();
      setShow1(false);
    } else toast.error("Please fill the form");
  };

  const onSubmitHandler = async () => {
    const payload = {
      id: user.id,
      role: role ? role : user.role,
      first_name: user.firstName,
      last_name: user.lastName,
      lr_code: land_rover_retailer
        ? land_rover_retailer.value
        : user.land_rover_retailer,
      jag_code: jaguar_retailer ? jaguar_retailer.value : user.jaguar_retailer,
      jaguar_retailer: jaguar_retailer
        ? jaguar_retailer.label
        : user.jaguar_retailer,
      land_rover_retailer: land_rover_retailer
        ? land_rover_retailer.label
        : user.land_rover_retailer,
      email: user.editEmail,
      password: password ? password : user.password,
    };

    try {
      setLoading(true);
      await dispatch(updateUser(payload));
      setLoading(false);
      MySwal.fire({
        icon: "success",
        title: "Updated!",
        text: "User Updated Successfully.",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });

      setShow(false);
    } catch (error) {
      Swal.fire(
        "Error",
        "There was an error while updating the user.",
        "error"
      );
      setLoading(false);
    }
  };

  const retailerData = () => {
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/udaan/jag",
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          const mydata = response.data.data;
          setSelectedValueJAR(mydata);
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
          setSelectedValueLR(mydata);
        }
      })
      .catch((err) => console.log("er--", err));
  };

  const customStyles = {
    rows: {
      style: {
        maxHeight: "1px",
      },
    },
  };

  const handleInputChange = (e) => {
    const boxName = e.target.name;
    const newValue = e.target.value;
    console.log("first");
    setUser((prevState) => ({
      ...prevState,
      [boxName]: newValue,
    }));
  };

  const handleSearchRoleValue = async (value) => {
    setRoleSearchValue(`${value ? value.label : ""}`);
    setLoading(true);
    {
      value && value.label
        ? await dispatch(
          getDropdownValue({
            page: 1,
            perPage: rowsPerPage,
            role: value.value,
            land_rover_retailer: lrSearchValue,
            jaguar_retailer: jgSearchValue,
          })
        )
        : await dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue,
          })
        );
      setLoading(false);
    }
  };
  const handleSearchJrValue = (e) => {
    setJgSearchValue(e.target.value);

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        role: roleSearchValue,
        land_rover_retailer: lrSearchValue,
        jaguar_retailer: e.target.value,
      })
    );
  };
  const handleSearchLrValue = (e) => {
    setLrSearchValue(e.target.value);

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        role: roleSearchValue,
        land_rover_retailer: e.target.value,
        jaguar_retailer: jgSearchValue,
      })
    );
  };
  const clearLrValue = () => {
    setLrSearchValue("");

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        role: roleSearchValue,
        land_rover_retailer: "",
        jaguar_retailer: jgSearchValue,
      })
    );
  };
  const clearJgValue = () => {
    setJgSearchValue("");

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        role: roleSearchValue,
        land_rover_retailer: lrSearchValue,
        jaguar_retailer: "",
      })
    );
  };
  const handleClear = async () => {
    setRoleSearchValue("");
    setJgSearchValue("");
    setLrSearchValue("");
    setLoading(true);
    await dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    );
    setLoading(false);
  };
  const options = [
    { value: "Dealer", label: "Dealer" },
    { value: "Admin", label: "Admin" },
  ];
  return (
    <Fragment>
      <Card
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          padding: "5px",
        }}
      >
        <div
          style={{
            padding: "7px",
            width: "13rem",
            fontSize: "15px",
          }}
        >
          <Select
            isClearable={true}
            isSearchable={true}
            placeholder="Select Role"
            className="basic-single"
            classNamePrefix="select"
            onChange={handleSearchRoleValue}
            value={
              roleSearchValue
                ? { value: roleSearchValue, label: roleSearchValue }
                : null
            }
            options={options}
          ></Select>
        </div>
        {/* <div style={{ padding: "2px", width: "14rem", marginLeft: "15px" }}>
          <input
            style={{
              padding: "7.3px",
              display: "inline-block",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "15px",
              width: "90%",
              borderRadius: "4px",
            }}
            className="dataTable-filter"
            type="text"
            bsSize="sm"
            id="search-input"
            value={jgSearchValue}
            onChange={handleSearchJrValue}
            placeholder="Enter Jaguar Retailer"
          />
          {jgSearchValue && (
            <img
              src={x_coordinate}
              alt="Image description"
              height={"25"}
              width={"25"}
              onClick={clearJgValue}
              style={{
                marginLeft: "-35px",
                padding: isHovered ? "3px" : "2px",
                backgroundColor: isHovered ? "#f2f2f2" : "transparent",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          )}
        </div> */}
        {/* <div style={{ padding: "4px", width: "14rem" }}>
          <input
            style={{
              padding: "6px",
              display: "inline-block",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "15px",
              width: "90%",
              borderRadius: "4px",
            }}
            className="dataTable-filter"
            type="text"
            bsSize="sm"
            id="search-input"
            value={lrSearchValue}
            onChange={handleSearchLrValue}
            placeholder="Enter LR Retailer"
          />
          {lrSearchValue && (
            <img
              src={x_coordinate}
              alt="Image description"
              height={"25"}
              width={"25"}
              onClick={clearLrValue}
              style={{
                marginLeft: "-35px",
                padding: isHovered1 ? "3px" : "2px",
                backgroundColor: isHovered1 ? "#f2f2f2" : "transparent",
                cursor: "pointer",
              }}
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            />
          )}
        </div> */}
        <div
          style={{
            padding: "3px",
            marginTop: "5px",
            marginLeft: "6px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClear}
          >
            Reset
          </button>
        </div>
      </Card>
      <Modal
        isOpen={show1}
        toggle={() => setShow1(!show1)}
        className="modal-dialog-centered modal-lg p-2"
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              marginTop: "13px",
              marginLeft: "2rem",
            }}
          >
            <h1 className="mb-1">Create New User</h1>
          </div>

          <div
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: "2rem",
              marginTop: "13px",
            }}
          >
            <img
              src={x_coordinate}
              alt="Image description"
              height={"30"}
              width={"30"}
              onClick={() => {
                reset();
                editReset();
                setShow1(false);
              }}
              style={{
                padding: isHovered ? "3px" : "2px",
                backgroundColor: isHovered ? "#f2f2f2" : "transparent",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        </div>
        <ModalBody className="mx-50 pb-2">
          <form className="gy-1 pt-75" onSubmit={handleSubmit(onCreateHandler)}>
            <Row>
              <Col md={3}>
                <Label className="label form-control" for="role">
                  Role
                </Label>
              </Col>
              <Col md={9}>
                <Controller
                  name={"role"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        options={[
                          { value: "Admin", label: "Admin" },
                          { value: "Dealer", label: "Dealer" },
                        ]}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setRole(selectedOption.value);
                        }}
                        isSearchable={true}
                        placeholder="Select Role"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                          }),
                        }}
                        className="select "
                      />
                    );
                  }}
                />

                <p style={{ color: "red" }}>{errors.role?.value?.message}</p>
              </Col>

              <Col md={3}>
                <Label className="label form-control" for="jaguar_retailer">
                  Jaguar Retailer
                </Label>
              </Col>
              <Col md={9}>
                <Controller
                  name={"jaguar_retailer"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        options={selectedValueJAR.map((item) => ({
                          value: item.dealer_code,
                          label: item.dealer_name,
                        }))}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          setJagaurRetailer(selectedOption);
                        }}
                        isSearchable={true}
                        placeholder="Select Jaguar Retailer"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                          }),
                        }}
                        className="select "
                      />
                    );
                  }}
                />

                <p style={{ color: "red" }}>
                  {errors.jaguar_retailer?.value?.message}
                </p>
              </Col>

              <Col md={3}>
                <Label className="label form-control" for="land_rover_retailer">
                  Land Rover Retailer
                </Label>
              </Col>
              <Col md={9}>
                <Controller
                  name={"land_rover_retailer"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        options={selectedValueJAR.map((item) => ({
                          value: item.dealer_code,
                          label: item.dealer_name,
                        }))}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption);
                          selectedValueLR(selectedOption);
                        }}
                        isSearchable={true}
                        placeholder="Select Jaguar Retailer"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                          }),
                        }}
                        className="select "
                      />
                    );
                  }}
                />

                <p style={{ color: "red" }}>
                  {errors.land_rover_retailer?.value?.message}
                </p>
              </Col>

              <Col md={3}>
                <Label className="label form-control" for="first_name">
                  First Name
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  {...register("first_name")}
                  onChange={(e) => setFirst_name(e.target.value)}
                  placeholder="Enter First Name"
                  type="text"
                />
                <p style={{ color: "red" }}>{errors.first_name?.message}</p>
              </Col>

              <Col md={3}>
                <Label className="label form-control" for="last_name">
                  Last Name
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  {...register("last_name")}
                  onChange={(e) => setLast_name(e.target.value)}
                  placeholder="Enter Last Name"
                  type="text"
                />

                <p style={{ color: "red" }}>{errors.last_name?.message}</p>
              </Col>

              <Col md={3}>
                <Label className="label form-control" for="Email">
                  Email
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  autoComplete="off"
                  {...register("email")}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  type={email}
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </Col>

              <Col md={3}>
                <Label className="label form-control" for="password">
                  Password
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>{errors.password?.message}</p>
              </Col>

              <Col md={3}>
                <Label className="label form-control" for="confirmPassword">
                  Confirm Password{" "}
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  {...register("confirmPassword")}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>
                  {errors.confirmPassword?.message}
                </p>
              </Col>

              <Col xs={12} className=" mt-2 pt-50">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    marginRight: "5px",
                  }}
                >
                  Submit
                </button>

                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() => {
                    reset();
                    editReset();
                    setShow1(false);
                  }}
                  style={{ color: "black" }}
                >
                  Discard
                </button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg p-2"
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              marginTop: "13px",
              marginLeft: "2rem",
            }}
          >
            <h1 className="mb-1">Edit User Information</h1>
          </div>
          <div
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: "2rem",
              marginTop: "13px",
            }}
          >
            <img
              src={x_coordinate}
              alt="Image description"
              height={"30"}
              width={"30"}
              onClick={() => {
                reset();
                editReset();
                setShow(false);
              }}
              style={{
                padding: isHovered ? "3px" : "2px",
                backgroundColor: isHovered ? "#f2f2f2" : "transparent",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        </div>

        <ModalBody className="mx-50 pb-2">
          <Row>
            <Col md={3}>
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                for="role"
              >
                Role
              </Label>
            </Col>
            <Col md={9}>
              <Select
                // style={{
                //     padding: "8px 7px",
                //     display: "inline-block",
                //     border: "1px solid #ccc",
                //     borderRadius: "4px",
                //     boxSizing: "border-box",
                //     width: "75%",
                // }}
                className="select"
                // {...register("role")}
                defaultValue={
                  user.role == "admin" || user.role == "Admin"
                    ? { value: "Admin", label: "Admin" }
                    : { value: "Dealer", label: "Dealer" }
                }
                name="role"
                placeholder="Select Role"
                // onChange={handleInputChange}
                onChange={(selectedOption) => setRole(selectedOption.value)}
                type="text"
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "Dealer", label: "Dealer" },
                ]}
                isSearchable={true}
              >
                {/* <option selected value="Admin">Admin</option>
                                <option value="dealer">Dealer</option> */}
              </Select>
              {/* <p style={{color: "red"}}>{errors.role?.message}</p> */}
            </Col>

            <Col md={3} className="alignment-label">
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                for="jagaurRetailer"
              >
                Jaguar Retailer
              </Label>
            </Col>
            <Col md={9} className="alignment-input">
              <Select
                // style={{
                //     padding: "8px 7px",
                //     display: "inline-block",
                //     border: "1px solid #ccc",
                //     borderRadius: "4px",
                //     boxSizing: "border-box",
                //     width: "75%",
                // }}
                disabled={false}
                className="select"
                defaultValue={(() => {
                  const data = selectedValueJAR.filter(
                    (item) => item.dealer_name == user.jaguar_retailer
                  );
                  return {
                    value: data[0]?.dealer_code,
                    label: data[0]?.dealer_name,
                  };
                })()}
                name="jaguar_retailer"
                // onChange={(handleInputChange) => setJagaurRetailer(handleInputChange.value)}
                type="text"
                onChange={(selectedOption) => setJagaurRetailer(selectedOption)}
                // {...register("jaguar_retailer")}
                options={selectedValueJAR.map((item) => ({
                  value: item.dealer_code,
                  label: item.dealer_name,
                }))}
                isSearchable={true}
              >
                {/* {selectedValueJAR.map((item) => (
                                    <option key={item.dealer_name}>{item.dealer_name}</option>
                                ))} */}
              </Select>
              {/* <p style={{color: "red"}}>{errors.jaguar_retailer?.message}</p> */}
            </Col>
            <Col md={3} className="alignment-label">
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                for="land_rover_retailer"
              >
                Land Rover Retailer
              </Label>
            </Col>
            <Col md={9} className="alignment-input">
              <Select
                // style={{
                //     padding: "8px 7px",
                //     display: "inline-block",
                //     border: "1px solid #ccc",
                //     borderRadius: "4px",
                //     boxSizing: "border-box",
                //     width: "75%",
                // }}
                className="select"
                // {...register("land_rover_retailer")}
                // onChange={handleInputChange}
                value={user.land_rover_retailer.value}
                defaultValue={(() => {
                  const data = selectedValueLR.filter(
                    (item) => item.dealer_name == user.land_rover_retailer
                  );
                  return {
                    value: data[0]?.dealer_code,
                    label: data[0]?.dealer_name,
                  };
                })()}
                name="land_rover_retailer"
                onChange={(selectedOption) =>
                  setLandRoverRetailer(selectedOption)
                }
                // {...register("land_rover_retailer")}
                options={selectedValueLR.map((item) => ({
                  value: item.dealer_code,
                  label: item.dealer_name,
                }))}
              >
                {/* {selectedValueLR.map((item) => (
                                    <option key={item.dealer_name}>{item.dealer_name}</option>
                                ))} */}
              </Select>
              {/* <p style={{color: "red"}}>{errors.land_rover_retailer?.message}</p> */}
            </Col>

            <Col md={3} className="alignment-label">
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                for="firstName"
              >
                First Name
              </Label>
            </Col>
            <Col md={9} className="alignment-input">
              <input
                className="input form form-control"
                // style={{
                //     padding: "8px 7px",
                //     display: "inline-block",
                //     border: "1px solid #ccc",
                //     borderRadius: "4px",
                //     boxSizing: "border-box",
                //     width: "75%",
                // }}
                {...editRegister("firstName")}
                onChange={(e) => handleInputChange(e)}
                defaultValue={user.first_name}
                type="text"
              />
              <p style={{ color: "red" }}>{editErrors.firstName?.message}</p>
            </Col>
            <Col md={3}>
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                for="lastName"
              >
                Last Name
              </Label>
            </Col>
            <Col md={9}>
              <input
                className="input form form-control"
                // style={{
                //     padding: "8px 7px",
                //     display: "inline-block",
                //     border: "1px solid #ccc",
                //     borderRadius: "4px",
                //     boxSizing: "border-box",
                //     width: "75%",
                // }}
                {...editRegister("lastName")}
                defaultValue={user.last_name}
                onChange={handleInputChange}
                type="text"
              />
              <p style={{ color: "red" }}>{editErrors.lastName?.message}</p>
            </Col>
            <Col md={3}>
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                for="editEmail"
              >
                Email
              </Label>
            </Col>
            <Col md={9}>
              <input
                className="input form form-control"
                // style={{
                //     padding: "8px 7px",
                //     display: "inline-block",
                //     border: "1px solid #ccc",
                //     borderRadius: "4px",
                //     boxSizing: "border-box",
                //     width: "75%",
                // }}
                {...editRegister("editEmail")}
                defaultValue={user.email}
                onChange={handleInputChange}
                type="text"
              />
              <p style={{ color: "red" }}>{editErrors.editEmail?.message}</p>
            </Col>
            <Col md={3}>
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                for="editPassword"
              >
                Password
              </Label>
            </Col>
            <Col md={9}>
              <input
                // style={{
                //     padding: "8px 7px",
                //     display: "inline-block",
                //     border: "1px solid #ccc",
                //     borderRadius: "4px",
                //     boxSizing: "border-box",
                //     width: "75%",
                // }}
                className="input form form-control "
                {...editRegister("editPassword")}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
              />
              <p style={{ color: "red" }}>{editErrors.editPassword?.message}</p>
              {/* <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            style={{
                                marginLeft: "-30px",
                                backgroundColor: "transparent",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                            }}
                            onClick={toggleShowPassword}
                        ></i> */}
            </Col>

            <Col xs={12} className=" mt-2 pt-50">
              <button
                onClick={handleEditSubmit(onSubmitHandler)}
                type="submit"
                className="btn btn-primary"
                style={{
                  marginRight: "5px",
                }}
              >
                Update
              </button>
              <button
                type="reset"
                className="btn btn-secondary"
                onClick={() => {
                  reset();
                  editReset();
                  setShow(false);
                }}
                style={{ color: "black" }}
              >
                Discard
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Suspense
        fallback={
          <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
        }
      >
        <Card>
          <CardHeader className="border-bottom" style={{ padding: "15px" }}>
            <CardTitle tag="h2" style={{ fontSize: "22px" }}>
              Users List {store?.totalCount ? `(${store?.totalCount})` : ""}
            </CardTitle>

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  setShow1(true);
                }}
                style={{ padding: "10px" }}
              >
                Add New User
              </button>
            </div>
          </CardHeader>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              // padding: "5px",
              // marginLeft: "5px",
              // marginRight: "15px",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <h4
                style={{
                  color: "black",
                  fontSize: "15px",
                  marginLeft: "17px",
                  marginRight: "5px",
                  marginTop: "1.1rem",
                }}
              >
                Show
              </h4>
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
                style={{ padding: "4px", marginTop: "10px" }}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <h4
                style={{
                  color: "black",
                  fontSize: "15px",
                  marginLeft: "6px",
                  marginTop: "1.1rem",
                }}
              >
                Entries
              </h4>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                padding: "2px",
              }}
            >
              <h4
                style={{
                  color: "black",
                  fontSize: "15px",
                  margin: "10px",
                }}
              >
                Search
              </h4>
              <Input
                className="dataTable-filter"
                type="text"
                bsSize="sm"
                id="search-input"
                value={searchValue}
                onChange={handleFilter}
                style={{
                  marginRight: "10px",
                  caretColor: "black",
                  borderColor: isHovered ? "black " : "black",
                  border: isHovered ? "2px solid black " : "1px solid #ccc",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
          </div>
          {loading ? (
            <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
          ) : (
            <div className="react-dataTable">
              <DataTable
                noHeader
                pagination
                paginationServer
                className="react-dataTable"
                columns={columns}
                sortIcon={<ChevronDown size={10} />}
                paginationComponent={CustomPagination}
                data={dataToRender()}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                customStyles={customStyles}
                fixedHeader
                highlightOnHover
              />
            </div>
          )}
        </Card>
      </Suspense>
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
    </Fragment>
  );
};

export default memo(DataTableServerSide);
