import { Fragment, useState, useEffect, memo, Suspense } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getData, getDropdownValue, updateUser, addUser } from "./store";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { ChevronDown, Eye, Edit, Trash } from "react-feather";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import x_coordinate from "../../assets/imgs/x-coordinate.png";
import styled, { keyframes } from "styled-components";

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
import * as Yup from "yup";
import "./Vehicles.css";
import moment from "moment";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { NumericFormat } from "react-number-format";

import Loader from "react-js-loader";
import Select from "react-select";

const MySwal = withReactContent(Swal);

const DataTableServerSide = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.datatables3);
  const userHandler = JSON.parse(sessionStorage.getItem("userRole"));

  const location = useLocation();

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [pending, setPending] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchAccValue, setSearchAccValue] = useState(location.state);
  const [brandsearchValue, setBrandSearchValue] = useState("");
  const [jlrmodelnamesearchValue, setJlrmodelnameSearchValue] = useState("");
  const [visitaSearchValue, setVisitaSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [getTabClear, setTabClear] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (userHandler.role === "user" || userHandler.role === "Dealer") &&
      setIsLoggedIn(true);
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(
  //     getDropdownValue({
  //       page: currentPage,
  //       perPage: rowsPerPage,
  //       brand: brandsearchValue,
  //       jlr_model_name: jlrmodelnamesearchValue,
  //       vista_order: visitaSearchValue,
  //     })
  //   )
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.error(error);
  //     });
  // }, [brandsearchValue, jlrmodelnamesearchValue, visitaSearchValue]);

  const [user, setUser] = useState({
    brand: "",
    vista_order: "",
    vin: "",
    jlr_model_name: "",
    model_code: "",
    colour_desc: "",
    model_year_desc: "",
    country: "",
    base_price: "",
    option_price: "",
    build_url: "",
    trim_desc: "",
    description_group_id: "",
  });

  const defaultValues = {
    id: user.id,
    brand: user.brand,
    vista_order: user.vista_order,
    vin: user.vin,
    jlr_model_name: user.jlr_model_name,
    model_code: user.model_code,
    model_year_desc: user.model_year_desc,
    base_price: user.base_price,
    option_price: user.option_price,
    country: user.country,
    colour_desc: user.colour_desc,
    build_url: user.build_url,
    description_group_id: user.description_group_id,
    trim_desc: user.trim_desc,
  };

  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Loader type="spinner-default" bgColor={"#42b983"} size={70} />
    </div>
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      setUser(user);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const SignupSchema = Yup.object().shape({
    vista_order: Yup.string().required("Vista Order is required"),
    brand: Yup.string().required("Brand is required"),
    vin: Yup.string().required("VIN Number is required"),
    jlr_model_name: Yup.string().required("Jlr model name is required"),
    model_code: Yup.string().required("Model code is required"),
    model_year: Yup.string().required("Model year is required"),
    colour_desc: Yup.string().required("Colour code is required"),
    country: Yup.string().required("Country is required"),
    // base_price: Yup.required("base Price is required"),
    // base_price: Yup.string().matches(
    //   /^R \d+\.\d{2}$/,
    //   "Invalid currency format"
    // ),

    // option_price: Yup.string().matches(
    //   /^R \d+\.\d{2}$/,
    //   "Invalid currency format"
    // ),
    model_year_desc: Yup.string().required(
      "Model Year Description is required"
    ),
    build_url: Yup.string().required("Build URL is required"),
    description_group_id: Yup.string().required(
      "Description Group ID is required"
    ),
    trim_desc: Yup.string().required("Trim Description is required"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    setLoading(true);

    if (location.state) {
      dispatch(
        getData({
          page: 1,
          perPage: rowsPerPage,
          q: location.state ? location.state : "",
        })
      )
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
      location.state = "";
    } else {
      dispatch(
        getData({
          page: currentPage,
          perPage: rowsPerPage,
          q: searchValue,
        })
      )
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [currentPage, rowsPerPage, searchValue, dispatch, location]);
  // useEffect(() => {
  //   setLoading1(true);

  //   dispatch(
  //     getData({
  //       page: 1,
  //       perPage: rowsPerPage,
  //       q: location.state ? location.state : "",
  //     })
  //   )
  //     .then(() => setLoading1(false))
  //     .catch(() => setLoading1(false));
  // }, [location]);

  const handleFilter = (e) => {
    setSearchValue(e.target.value);
    setLoading(true);
    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    )
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  const handleAccClear = () => {
    setSearchAccValue(" ");
    setTabClear(false);
    setLoading(true);
    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
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
  const handleSearchBrandValue = async (value) => {
    setBrandSearchValue(`${value ? value.label : ""}`);
    setLoading(true);
    {
      value && value.label
        ? await dispatch(
          getDropdownValue({
            page: 1,
            perPage: rowsPerPage,
            brand: value.label,
            jlr_model_name: jlrmodelnamesearchValue,
            vista_order: visitaSearchValue,
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
  const handleSearchjlrmodelValue = (e) => {
    setJlrmodelnameSearchValue(e.target.value);
    {
      brandsearchValue &&
        dispatch(
          getDropdownValue({
            page: 1,
            perPage: rowsPerPage,
            brand: brandsearchValue,
            jlr_model_name: e.target.value,
            vista_order: visitaSearchValue,
          })
        );
    }
  };
  const handleSearchvisitaValue = (e) => {
    setVisitaSearchValue(e.target.value);

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        brand: brandsearchValue,
        jlr_model_name: jlrmodelnamesearchValue,
        vista_order: e.target.value,
      })
    );
  };
  const clearVisitaValue = () => {
    setVisitaSearchValue("");

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        brand: brandsearchValue,
        jlr_model_name: jlrmodelnamesearchValue,
        vista_order: "",
      })
    );
  };
  const clearjlrmodelnameValue = () => {
    setJlrmodelnameSearchValue("");

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        brand: brandsearchValue,
        jlr_model_name: "",
        vista_order: visitaSearchValue,
      })
    );
  };
  const handleClear = async () => {
    setBrandSearchValue("");
    setJlrmodelnameSearchValue("");
    setVisitaSearchValue("");
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
      // style: {
      //   left: 0,
      //   position: "sticky",
      //   backgroundColor: "#ddd",
      //   zIndex: 2,
      // },
      minWidth: "80px",
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          {userHandler.role === "user" || userHandler.role === "Dealer" ? (
            <Eye
              size={17}
              className="cursor-pointer me-1"
              id={`eye-tooltip-${row.id}`}
              onClick={() => {
                setUser(row);
                setUser((prevState) => ({
                  ...prevState,
                  "base_price": row.base_price ? formatToSA(row.base_price) : "",
                  "option_price": row.option_price ? formatToSA(row.option_price) : "",
                }));
                setShow(true);
              }}
            />
          ) : (
            <Edit
              size={17}
              className="cursor-pointer me-1"
              id={`eye-tooltip-${row.id}`}
              onClick={() => {
                setUser(row);
                setUser((prevState) => ({
                  ...prevState,
                  base_price: formatToSA(row.base_price),
                  option_price: formatToSA(row.option_price),
                }));
                setShow(true);
              }}
            />
          )}
          <UncontrolledTooltip placement="top" target={`eye-tooltip-${row.id}`}>
            {userHandler.role === "user" || userHandler.role === "Dealer"
              ? "View Vehicles"
              : "Edit Vehicles"}
            {/* Edit Vehicles */}
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
            Preview Vehicles
          </UncontrolledTooltip>
        </div>
      ),
    },
    {
      name: "Vista Order ",
      sortable: true,
      minWidth: "150px",
      right: true,
      // style: { color: "#000" },
      selector: (row) => row.vista_order,
    },
    {
      name: "Brand",
      sortable: true,
      minWidth: "160px",
      // style: { color: "#000" },
      selector: (row) => row.brand || "--",
    },
    {
      name: "Account Number",
      sortable: true,
      minWidth: "190px",
      // style: { color: "#000" },
      right: true,
      selector: (row) => row.account_number || "--",
    },
    {
      name: "VIN Number",
      sortable: true,
      minWidth: "200px",
      // style: { color: "#000" },
      right: true,
      selector: (row) => row.vin || "--",
    },
    {
      name: "Jlr Model Name",
      sortable: true,
      // style: { color: "#000" },
      minWidth: "230px",
      selector: (row) => row.jlr_model_name || "--",
    },
    {
      name: "Model Code",
      sortable: true,
      minWidth: "150px",
      right: true,
      // style: { color: "#000" },
      selector: (row) => row.model_code || "--",
    },
    {
      name: "Model Year",
      sortable: true,
      right: true,
      // style: { color: "#000" },
      minWidth: "150px",
      selector: (row) => row.model_year_desc || "--",
    },
    {
      name: "Description Group ID",
      sortable: true,
      minWidth: "210px",
      // style: { color: "#000" },
      right: true,
      selector: (row) => row.description_group_id || "--",
    },
    {
      name: "Colour Description",
      // style: { color: "#000" },
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.colour_desc || "--",
    },
    {
      name: "Country",
      sortable: true,
      minWidth: "140px",
      // style: { color: "#000" },
      selector: (row) => row.country || "--",
    },
    {
      name: "Base Price",
      sortable: true,
      minWidth: "150px",
      // style: { color: "#000" },
      right: true,
      selector: (row) => `${formatToSA(row.base_price)}`,
      cell: (row) => (
        <Tooltip
          title={row.base_price ? `${formatToSA(row.base_price)}` : "--"}
        >
          <div>{row.base_price ? `${formatToSA(row.base_price)}` : "--"}</div>
        </Tooltip>
      ),
    },
    {
      name: "Option Price",
      sortable: true,
      minWidth: "150px",
      // style: { color: "#000" },
      right: true,
      selector: (row) => `${formatToSA(row.option_price)}`,
      cell: (row) => (
        <Tooltip
          title={row.option_price ? `${formatToSA(row.option_price)}` : "--"}
        >
          <div>
            {row.option_price ? `${formatToSA(row.option_price)}` : "--"}
          </div>
        </Tooltip>
      ),
    },
    {
      name: "Build Url",
      sortable: true,
      className: "centered-header",
      minWidth: "150px",
      center: true,
      selector: (row) => {
        const url = row.build_url || "";
        // const domain = new URL(url).hostname || "--";
        let domain = "--";
        if (url) {
          const urlObject = new URL(url);
          if (urlObject.hostname) {
            domain = urlObject.hostname;
          }
        }
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#42b983" }}
          >
            View Vehicle
          </a>
        );
      },
    },
    {
      name: "Trim Description",
      sortable: true,
      minWidth: "300px",
      // style: { color: "#000" },
      selector: (row) => row.trim_desc || "--",
      cell: (row) => (
        <Tooltip title={row.trim_desc}>
          <div>{row.trim_desc || "--"}</div>
        </Tooltip>
      ),
    },
    {
      name: "Created At",
      sortable: true,
      minWidth: "200px",
      // style: { color: "#000" },
      selector: (row) =>
        moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss") || "--",
    },
    {
      name: "Updated At",
      sortable: true,
      minWidth: "200px",
      // style: { color: "#000" },
      selector: (row) =>
        moment(row.updatedAt).format("YYYY-MM-DD HH:mm:ss") || "--",
    },
  ];

  const formatToSA = (val) => {
    const formattedNumber = new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    })
      .format(val)
      .replace(/\s/g, "");
    let newFormat = formattedNumber.charAt(0) + " " + formattedNumber.slice(1);
    newFormat = newFormat.replace(/,/g, ".");
    newFormat = newFormat.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    return newFormat;
  };

  const convertToNumeric = (val) => {
    if (val.includes("R")) {
      const cleanedValue = val.replace(/[^\d.-]/g, "");
      const numericValue = cleanedValue.replace(/\s/g, "");
      return numericValue;
    } else {
      return val;
    }
  };

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("first");
    const payload = {
      id: user.id,
      brand: user.brand,
      vista_order: user.vista_order,
      vin: user.vin,
      jlr_model_name: user.jlr_model_name,
      model_code: user.model_code,
      model_year_desc: user.model_year_desc,
      base_price: convertToNumeric(user.base_price),
      option_price: convertToNumeric(user.option_price),
      country: user.country,
      colour_desc: user.colour_desc,
      build_url: user.build_url,
      description_group_id: user.description_group_id,
      trim_desc: user.trim_desc,
    };
    await dispatch(updateUser(payload));

    MySwal.fire({
      icon: "success",
      title: "Updated!",
      text: "User Updated Successfully.",
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
    setShow(false);
  };

  // const userValues = {
  //   brand: brand,
  //   vin: vin,
  //   jlr_model_name: jlr_model_name,
  //   model_code: model_code,
  //   model_year: model_year,
  //   base_price: base_price,
  //   country: country,
  //   colour_desc: colour_desc,
  //   build_url: build_url,
  //   trim_desc: trim_desc,
  //   createdAt: createdAt,
  //   updatedAt: updatedAt,
  // };
  // const onCreateHandler = () => {
  //   if (
  //     email.length > 3 &&
  //     first_name.length > 3 &&
  //     last_name.length > 3 &&
  //     password.length > 5
  //   ) {
  //     const data = dispatch(addUser(userValues));
  //     setShow1(false);
  //     clearData();
  //   }
  //   SignupSchema;
  // };
  const customStyles = {
    rows: {
      style: {
        maxHeight: "1px", // override the row height
      },
    },
  };
  const handleInputChange = (e) => {
    const boxName = e.target.name;
    const newValue = e.target.value;

    setUser((prevState) => ({
      ...prevState,
      [boxName]: newValue,
    }));
  };
  const options = [
    { value: "Jaguar", label: "Jaguar" },
    { value: "Land Rover", label: "Land Rover" },
  ];

  return (
    <div>
      <Card
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          padding: "5px",
        }}
      >
        {getTabClear && location.state && (
          <div style={{ padding: "6px", width: "14rem" }}>
            <Input
              style={{
                padding: "6px",
                display: "inline-block",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                fontSize: "16px",
                width: "100%",
                borderRadius: "4px",
              }}
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchAccValue}
              placeholder="Enter acc num"
            />
            {searchAccValue && (
              <img
                src={x_coordinate}
                alt="Image description"
                height={"25"}
                width={"25"}
                onClick={handleAccClear}
                style={{
                  marginLeft: "-35px",
                  padding: isHovered1 ? "3px" : "2px",
                  backgroundColor: isHovered1 ? "#f2f2f2" : "transparent",
                  // border: "none",
                  // outline: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              />
            )}
          </div>
        )}

        <div style={{ padding: "11px", width: "14rem", fontSize: "15px" }}>
          <Select
            isClearable={true}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Brand"
            onChange={handleSearchBrandValue}
            value={
              brandsearchValue
                ? { value: brandsearchValue, label: brandsearchValue }
                : null
            }
            options={options}
            isSearchable={true}
          />
        </div>

        {/* <div style={{ padding: "5px", width: "14rem" }}>
          <input
            style={{
              padding: "8px",
              display: "inline-block",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "15px",
              width: "96%",
              borderRadius: "4px",
            }}
            className="dataTable-filter"
            type="text"
            bsSize="sm"
            id="search-input"
            value={visitaSearchValue}
            onChange={handleSearchvisitaValue}
            placeholder="Enter Visita Order"
          />
          {visitaSearchValue && (
            <img
              src={x_coordinate}
              alt="Image description"
              height={"25"}
              width={"25"}
              onClick={clearVisitaValue}
              style={{
                marginLeft: "-35px",
                padding: isHovered3 ? "3px" : "2px",
                backgroundColor: isHovered3 ? "#f2f2f2" : "transparent",
                // border: "none",
                // outline: "none",
                cursor: "pointer",
              }}
              onMouseEnter={() => setIsHovered3(true)}
              onMouseLeave={() => setIsHovered3(false)}
            />
          )}
        </div>
        <div style={{ padding: "5px", width: "17rem" }}>
          <input
            style={{
              padding: "8px",
              display: "inline-block",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              fontSize: "15px",
              width: "96%",
              borderRadius: "4px",
              textOverflow: "ellipsis",
            }}
            className="dataTable-filter"
            type="text"
            bsSize="sm"
            id="search-input"
            value={jlrmodelnamesearchValue}
            onChange={handleSearchjlrmodelValue}
            placeholder="Enter JLR Model"
            // maxLength="17"
            // style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"
          />
          {jlrmodelnamesearchValue && (
            <img
              src={x_coordinate}
              alt="Image description"
              height={"25"}
              width={"25"}
              onClick={clearjlrmodelnameValue}
              style={{
                marginLeft: "-35px",
                padding: isHovered2 ? "3px" : "2px",
                backgroundColor: isHovered2 ? "#f2f2f2" : "transparent",
                // border: "none",
                // outline: "none",
                cursor: "pointer",
              }}
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            />
          )}
        </div> */}
        <div
          style={{
            padding: "5px",
            marginTop: "5px",
            marginLeft: "10px",
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

      <Fragment>
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
              <h1 className="mb-1"> Edit Vehicles Information</h1>
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
                onClick={() => setShow(false)}
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
                  for="vin"
                >
                  VIN Number
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}

                  value={user.vin}
                  disabled={true}
                />
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
                  for="brand"
                >
                  Brand
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  {...register("brand")}
                  onChange={handleInputChange}
                  defaultValue={user.brand}
                  // name="brand"
                  placeholder={defaultValues.brand}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.brand?.message}</p>
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
                  for="vista_order"
                >
                  Vista Order
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  {...register("vista_order")}
                  onChange={handleInputChange}
                  defaultValue={user.vista_order}
                  // name="vista_order"
                  placeholder={defaultValues.vista_order}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.vista_order?.message}</p>
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
                  for="jlr_model_name"
                >
                  Jlr Model Name
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  {...register("jlr_model_name")}
                  onChange={handleInputChange}
                  defaultValue={user.jlr_model_name}
                  // name="jlr_model_name"
                  placeholder={defaultValues.jlr_model_name}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.jlr_model_name?.message}</p>
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
                  for="model_code"
                >
                  Model Code
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  {...register("model_code")}
                  onChange={handleInputChange}
                  defaultValue={user.model_code}
                  // name="model_code"
                  placeholder={defaultValues.model_code}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.model_code?.message}</p>
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
                  for="model_year_desc"
                >
                  Model Year
                </Label>
              </Col>
              <Col md={9}>
                <input
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  {...register("model_year_desc")}
                  onChange={handleInputChange}
                  defaultValue={user.model_year_desc}
                  // name="model_year_desc"
                  placeholder={defaultValues.model_year_desc}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>
                  {errors.model_year_desc?.message}
                </p>
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
                  for="description_group_id"
                >
                  Description Group ID
                </Label>
              </Col>
              <Col md={9}>
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="input form form-control"
                  {...register("description_group_id")}
                  onChange={handleInputChange}
                  defaultValue={user.description_group_id}
                  // name="description_group_id"
                  placeholder={defaultValues.description_group_id}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>
                  {errors.description_group_id?.message}
                </p>
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
                  for="country"
                >
                  Country
                </Label>
              </Col>
              <Col md={9}>
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="input form form-control"
                  {...register("country")}
                  onChange={handleInputChange}
                  defaultValue={user.country}
                  // name="country"
                  placeholder={defaultValues.country}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.country?.message}</p>
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
                  for="colour_desc"
                >
                  Colour Description
                </Label>
              </Col>
              <Col md={9}>
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="input form form-control"
                  {...register("colour_desc")}
                  onChange={handleInputChange}
                  defaultValue={user.colour_desc}
                  // name="colour_desc"
                  placeholder={defaultValues.colour_desc}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.colour_desc?.message}</p>
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
                  for="build_url"
                >
                  Build Url
                </Label>
              </Col>
              <Col md={9}>
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="input form form-control"
                  {...register("build_url")}
                  onChange={handleInputChange}
                  defaultValue={user.build_url}
                  // name="build_url"
                  placeholder={defaultValues.build_url}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.build_url?.message}</p>
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
                  for="trim_desc"
                >
                  Trim Description
                </Label>
              </Col>
              <Col md={9}>
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="input form form-control"
                  {...register("trim_desc")}
                  onChange={handleInputChange}
                  defaultValue={user.trim_desc}
                  // name="trim_desc"
                  placeholder={defaultValues.trim_desc}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{errors.trim_desc?.message}</p>
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
                  for="base_price"
                >
                  Base Price
                </Label>
              </Col>
              <Col md={9}>
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="input form form-control"
                  // {...register("base_price")}
                  onChange={handleInputChange}
                  onFocus={(e) => {
                    const boxName = e.target.name;
                    setUser((prevState) => ({
                      ...prevState,
                      [boxName]: convertToNumeric(user.base_price),
                    }));
                  }}
                  onBlur={(e) => {
                    const boxName = e.target.name;

                    setUser((prevState) => ({
                      ...prevState,
                      [boxName]: formatToSA(user.base_price),
                    }));
                  }}
                  value={user.base_price}
                  name="base_price"
                  placeholder={defaultValues.base_price}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                {/* <p style={{ color: "red" }}>{errors.base_price?.message}</p> */}
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
                  for="option_price"
                >
                  Option Price
                </Label>
              </Col>
              <Col md={9}>
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="input form form-control"
                  // {...register("option_price")}
                  onChange={handleInputChange}
                  onFocus={(e) => {
                    const boxName = e.target.name;

                    setUser((prevState) => ({
                      ...prevState,
                      [boxName]: convertToNumeric(user.option_price),
                    }));
                  }}
                  onBlur={(e) => {
                    const boxName = e.target.name;
                    setUser((prevState) => ({
                      ...prevState,
                      [boxName]: formatToSA(user.option_price),
                    }));
                  }}
                  value={user.option_price}
                  name="option_price"
                  placeholder={defaultValues.option_price}
                  type="text"
                  disabled={isLoggedIn ? true : false}
                />
                {/* <p style={{ color: "red" }}>{errors.option_price?.message}</p> */}
              </Col>
              {/* <div>
                      <Label
                        style={{
                          marginTop: "6px",
                          fontSize: "15px",
                          color: "black",
                          alignItems: "center",
                        }}
                        className="label"
                        for="createdAt"
                      >
                        Created Date
                      </Label>
                      <input
                        style={{
                          padding: "8px 7px",
                          display: "inline-block",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                          width: "75%",
                        }}
                        className="input"
                        {...register("createdAt")}
                        onChange={(e) => (defaultValues.createdAt = e.target.value)}
                        placeholder={defaultValues.createdAt}
                        type="date"
                      />
                    </div>
                    <div>
                      <Label
                        style={{
                          marginTop: "6px",
                          fontSize: "15px",
                          color: "black",
                          alignItems: "center",
                        }}
                        className="ldefaultValuesabel"
                        for="updatedAt"
                      >
                        Updated Date
                      </Label>
                      <input
                        style={{
                          padding: "8px 7px",
                          display: "inline-block",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                          width: "75%",
                        }}
                        className="input"
                        {...register("updatedAt")}
                        onChange={(e) => (defaultValues.updatedAt = e.target.value)}
                        placeholder={defaultValues.updatedAt}
                        type="date"
                      />
                    </div> */}

              <Col xs={12} className=" mt-2 pt-50">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmitHandler)}
                  disabled={
                    userHandler.role === "admin" || userHandler.role === "Admin"
                      ? false
                      : true
                  }
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
                    setShow(false);
                    reset();
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
                Vehicles List{" "}
                {store?.totalCount ? `(${store?.totalCount})` : ""}
              </CardTitle>
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
            {loading || loading1 ? (
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
                  fixedHeader
                  progressPending={pending}
                  progressComponent={<CustomLoader />}
                  customStyles={customStyles}
                />
              </div>
            )}
          </Card>
        </Suspense>
      </Fragment>
    </div>
  );
};

export default memo(DataTableServerSide);
