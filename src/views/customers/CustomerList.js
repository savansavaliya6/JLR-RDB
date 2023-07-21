import { Fragment, useState, useEffect, memo, Suspense } from "react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { getData, getDropdownValue, updateUser, addUser } from "./store"
import { useSelector, useDispatch } from "react-redux"
import ReactPaginate from "react-paginate"
import { ChevronDown, Eye, Edit, Trash } from "react-feather"
import DataTable from "react-data-table-component"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Loader from "react-js-loader"
import moment from "moment"
import check from "../../assets/imgs/iconsCheck.png"
import uncheck from "../../assets/imgs/iconsCross.png"
import Select from "react-select"
import { BsCircle } from "react-icons/bs"

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
  Badge,
} from "reactstrap"
import * as yup from "yup"
import axios from "axios"
import "./CustomerList.css"
const MySwal = withReactContent(Swal)
import { Tooltip } from "react-tippy"
import "react-tippy/dist/tippy.css"
import x_coordinate from "../../assets/imgs/x-coordinate.png"

const DataTableServerSide = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const store = useSelector((state) => state.datatables1)
  const [loading, setLoading] = useState(false)
  const [customerTypeSearchValue, setCustomerTypeSearchValue] = useState(null)
  const [statecodeSearchValue, setStatecodeSearchValue] = useState("")
  const [citySearchValue, setCitySearchValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [vin, setVin] = useState("")
  const [email, setEmail] = useState("")
  const [account_number, setAccount_number] = useState("")
  const [account_name, setAccount_name] = useState("")
  const [phone, setPhone] = useState("")
  const [customer_type, setCustomer_type] = useState("")
  const [id_type, setId_type] = useState("")
  const [id_number, setId_Number] = useState("")
  const [shipping_streets, setShipping_streets] = useState("")
  const [shipping_state_code, setShipping_state_code] = useState("")
  const [shipping_postal_code, setShipping_postal_code] = useState("")
  const [shipping_country_code, setshipping_country_code] = useState("")
  const [shipping_city, setShipping_city] = useState("")
  const [sales_organization, setSales_organization] = useState("")
  const [province_name, setProvince_name] = useState("")
  const [InterestedInJaguar, setInterestedInJaguar] = useState(0)
  const [InterestedInLandRover, setInterestedInLandRover] = useState(0)
  const [PreferredRetailer, setPreferredRetailer] = useState(0)
  const [products_and_services_opt_in, setProducts_and_services_opt_in] =
    useState(0)
  const [events_and_experience_opt_in, setEvents_and_experience_opt_in] =
    useState(0)
  const [promotions_and_offers_opt_in, setPromotions_and_offers_opt_in] =
    useState(0)
  const [
    ownership_and_vehicle_communication_opt_in,
    setOwnership_and_vehicle_communication_opt_in,
  ] = useState(0)
  const [surveys_and_research_opt_in, setSurveys_and_research_opt_in] =
    useState(0)
  const [
    partnership_and_sponsorship_opt_in,
    setPartnership_and_sponsorship_opt_in,
  ] = useState(0)

  const [
    juristic_entity_vat_registration_number,
    setJuristic_entity_vat_registration_number,
  ] = useState("")
  const [
    juristic_entity_id_number_ck_number,
    setJuristic_entity_id_number_ck_number,
  ] = useState("")
  const [juristic_entity_name, setJuristic_entity_name] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [selectedValue, setSelectedValue] = useState([])
  const [provinceDataValue, setProvinceDataValue] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [pending, setPending] = useState(true)
  const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)
  const [isRtl, setIsRtl] = useState(false)
  const { Option } = Select
  const [options, setOptions] = useState([])
  const [optiontype, setOptiontype] = useState([])
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered1, setIsHovered1] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const userHandler = JSON.parse(sessionStorage.getItem("userRole"))
  const userData = JSON.parse(sessionStorage.getItem("userData"))

  useEffect(() => {
    ; (userHandler.role === "user" || userHandler.role === "Dealer") &&
      setIsLoggedIn(true)
  }, [])

  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
    </div>
  )
  const handleDefaultCheckboxChange = (event) => {
    const checkboxName = event.target.name
    const newValue = event.target.checked ? 1 : 0

    setUser((prevState) => ({
      ...prevState,
      [checkboxName]: newValue,
    }))
  }

  const handleCheckboxChange = (event) => {
    const checkboxName = event.target.name
    const checkboxValue = event.target.checked ? 1 : 0

    switch (checkboxName) {
      case "InterestedInJaguar":
        setInterestedInJaguar(checkboxValue)
        break
      case "InterestedInLandRover":
        setInterestedInLandRover(checkboxValue)
        break
      case "PreferredRetailer":
        setPreferredRetailer(checkboxValue)
        break
      case "products_and_services_opt_in":
        setProducts_and_services_opt_in(checkboxValue)
        break
      case "events_and_experience_opt_in":
        setEvents_and_experience_opt_in(checkboxValue)
        break
      case "promotions_and_offers_opt_in":
        setPromotions_and_offers_opt_in(checkboxValue)
        break
      case "ownership_and_vehicle_communication_opt_in":
        setOwnership_and_vehicle_communication_opt_in(checkboxValue)
        break
      case "surveys_and_research_opt_in":
        setSurveys_and_research_opt_in(checkboxValue)
        break
      case "partnership_and_sponsorship_opt_in":
        setPartnership_and_sponsorship_opt_in(checkboxValue)
        break
      default:
        break
    }
  }
  const SignupSchema = yup.object().shape({
    vin: yup.string().required("Vehicle Ownership is required"),
    email: yup.string().email().required("Email is required"),
    account_name: yup.string().required("Account name is required"),
    phone: yup.string().required("Phone is required"),
    customer_type: yup
      .object({
        value: yup.string().required("Please select a Customer type"),
      })
      .nullable()
      .required("Please select a Customer type"),

    id_number: yup.string().required("ID Number is required"),
    id_type: yup
      .object({
        value: yup.string().required("Please select a ID type"),
      })
      .nullable()
      .required("Please select a ID type"),

    sales_organization: yup.string().required("Sales Organization is required"),
    // account_number: yup
    //   .string()
    //   .min(3, "Account number is required")
    //   .required("Account number is required"),
    shipping_streets: yup.string().required("Shipping streets is required"),
    shipping_state_code: yup
      .object({
        value: yup.string().required("Please select a Shpping Province"),
      })
      .nullable()
      .required("Please select a Shpping Province"),
    // shipping_state_code: yup
    //   .string()
    //   .min(3, "Shipping state code is required")
    //   .required("Shipping state code is required"),
    shipping_postal_code: yup
      .string()
      .required("Shipping Postal Code is required"),
    // shipping_country_code: yup
    //   .string()
    //   .min(3, "Shipping Country Code is required")
    //   .required("Shipping Country Code is required"),
    shipping_city: yup.string().required("Shipping city is required"),
    // juristic_entity_vat_registration_number: yup
    //   .string()
    //   .min(3, "Juristic registration number is required")
    //   .required("Juristic registration number is required"),
    // juristic_entity_id_number_ck_number: yup
    //   .string()
    //   .min(3, "Juristic ck number is required")
    //   .required("Juristic ck number is required"),
    // juristic_entity_name: yup
    //   .string()
    //   .min(3, "Juristic name is required")
    //   .required("Juristic  name is required"),
  })

  const editSchema = yup.object().shape({
    editVin: yup.string().required("Vehicle Ownership is required"),
    editEmail: yup.string().required("Email is required"),
    accountName: yup.string().required("Account name is required"),
    editPhone: yup.string().required("Phone is required"),
    // customer_type: yup
    //   .string()
    //   .min(9, "Customer Type is required")
    //   .required("Customer Type required"),
    // id_type: yup
    //   .string()
    //   .min(3, "ID Type is required")
    //   .required("ID Type is required"),
    idNumber: yup.string().required("ID Number is required"),

    salesOrganization: yup.string().required("Sales Organization is required"),
    // account_number: yup
    //   .string()
    //   .min(3, "Account number is required")
    //   .required("Account number is required"),
    shippingStreets: yup.string().required("Shipping streets is required"),
    // shipping_state_code: yup
    //   .string()
    //   .min(3, "Shipping state code is required")
    //   .required("Shipping state code is required"),
    shippingPostalCode: yup
      .string()
      .required("Shipping Postal Code is required"),
    shippingCountryCode: yup
      .string()
      .required("Shipping Country Code is required"),
    shippingCity: yup.string().required("Shipping city is required"),
    // juristic_entity_vat_registration_number: yup
    //   .string()
    //   .min(3, "Juristic registration number is required")
    //   .required("Juristic registration number is required"),
    // juristic_entity_id_number_ck_number: yup
    //   .string()
    //   .min(3, "Juristic ck number is required")
    //   .required("Juristic ck number is required"),
    // juristic_entity_name: yup
    //   .string()
    //   .min(3, "Juristic name is required")
    //   .required("Juristic  name is required"),
  })

  const [user, setUser] = useState({
    vin: "",
    email: "",
    // account_number: "",
    account_name: "",
    id_type: "",
    id_number: "",
    phone: "",
    customer_type: "",
    // province_name: "",
    InterestedInJaguar: "",
    InterestedInLandRover: "",
    PreferredRetailer: "",
    products_and_services_opt_in: "",
    events_and_experience_opt_in: "",
    promotions_and_offers_opt_in: "",
    ownership_and_vehicle_communication_opt_in: "",
    surveys_and_research_opt_in: "",
    partnership_and_sponsorship_opt_in: "",
    shipping_streets: "",
    shipping_state_code: "",
    shipping_postal_code: "",
    shipping_country_code: "",
    shipping_city: "",
    juristic_entity_vat_registration_number: "",
    juristic_entity_name: "",
    juristic_entity_id_number_ck_number: "",
  })

  const defaultValues = {
    id: user.id,
    vin: user.vin,
    email: user.email,
    // account_number: user.account_number,
    account_name: user.account_name,
    phone: user.phone,
    customer_type: user.customer_type,
    // province_name: user.province_name,
    id_type: user.id_type,
    id_number: user.id_number,
    shipping_streets: user.shipping_streets,
    shipping_state_code: user.shipping_state_code,
    shipping_postal_code: user.shipping_postal_code,
    shipping_country_code: user.shipping_country_code,
    shipping_city: user.shipping_city,
    InterestedInJaguar: user.InterestedInJaguar,
    InterestedInLandRover: user.InterestedInLandRover,
    PreferredRetailer: user.PreferredRetailer,
    products_and_services_opt_in: user.products_and_services_opt_in,
    events_and_experience_opt_in: user.events_and_experience_opt_in,
    promotions_and_offers_opt_in: user.promotions_and_offers_opt_in,
    ownership_and_vehicle_communication_opt_in:
      user.ownership_and_vehicle_communication_opt_in,
    surveys_and_research_opt_in: user.surveys_and_research_opt_in,
    partnership_and_sponsorship_opt_in: user.partnership_and_sponsorship_opt_in,
    juristic_entity_vat_registration_number:
      user.juristic_entity_vat_registration_number,
    juristic_entity_name: user.juristic_entity_name,
    juristic_entity_id_number_ck_number:
      user.juristic_entity_id_number_ck_number,
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUser(user)
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues,
    resolver: yupResolver(SignupSchema),
  })

  const {
    handleSubmit: handleEditSubmit,
    register: editRegister,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues,
    resolver: yupResolver(editSchema),
  })
  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(
  //     getData({
  //       page: currentPage,
  //       perPage: rowsPerPage,
  //       q: searchValue,
  //     })
  //   )
  //     .then(() => setLoading(false))
  //     .catch(() => setLoading(false));
  // }, [currentPage, rowsPerPage, searchValue, dispatch] );

  //useEffect(() => {
  //setLoading(true)

  //dispatch(
  //  getData({
  //    page: 1,
  //    perPage: rowsPerPage,
  //    q: location.state ? location.state : "",
  //  })
  //)
  //  .then(() => setLoading(false))
  //  .catch(() => setLoading(false))
  //}, [location])

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(
  //     getDropdownValue({
  //       page: currentPage,
  //       perPage: rowsPerPage,
  //       shipping_state_code: statecodeSearchValue,
  //       customer_type: customerTypeSearchValue,
  //       shipping_city: citySearchValue,
  //     })
  //   )
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.error(error);
  //     });
  // }, [customerTypeSearchValue]);

  const handleFilter = (e) => {
    setSearchValue(e.target.value)

    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    )
  }

  const onStatecodeHandler = async (value) => {
    setStatecodeSearchValue(`${value ? value.label : ""}`)
    setLoading(true)
    {
      value && value.label
        ? await dispatch(
          getDropdownValue({
            page: 1,
            perPage: rowsPerPage,
            shipping_state_code: value.label,
            customer_type: customerTypeSearchValue,
            shipping_city: citySearchValue,
          })
        )
        : await dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue,
          })
        )
      setLoading(false)
    }
  }

  const onCustomerHandler = async (value) => {
    setCustomerTypeSearchValue(`${value ? value.label : ""}`)
    setLoading(true)
    {
      value && value.label
        ? await dispatch(
          getDropdownValue({
            page: 1,
            perPage: rowsPerPage,
            shipping_state_code: statecodeSearchValue,
            customer_type: value.label,
            shipping_city: citySearchValue,
          })
        )
        : await dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue,
          })
        )
      setLoading(false)
    }
  }

  const handleCityChange = (e) => {
    setCitySearchValue(e.target.value)
    {
      customerTypeSearchValue &&
        dispatch(
          getDropdownValue({
            page: 1,
            perPage: rowsPerPage,
            shipping_state_code: statecodeSearchValue,
            customer_type: customerTypeSearchValue,
            shipping_city: e.target.value,
          })
        )
    }
  }

  const handleClear = async () => {
    setStatecodeSearchValue(null)
    setCustomerTypeSearchValue(null)
    setCitySearchValue("")
    setLoading(true)
    await dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
    setLoading(false)
  }
  const handleCityClear = () => {
    setCitySearchValue("")
    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        shipping_state_code: statecodeSearchValue,
        customer_type: customerTypeSearchValue,
        shipping_city: "",
      })
    )
  }
  const dataToRender = () => {
    const filters = {
      q: searchValue,
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }
  const handlePagination = (page) => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const handlePerPage = (e) => {
    dispatch(
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue,
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  const CustomPagination = () => {
    const count = store.total || 1
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
    )
  }

  const columns = [
    {
      name: "Action",
      maxWidth: "20px",
      center: true,
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          {userHandler.role === "user" || userHandler.role === "Dealer" ? (
            <Edit
              size={17}
              className="cursor-pointer me-1"
              id={`eye-tooltip-${row.id}`}
              onClick={() => {
                setUser(row)
                setShow(true)
              }}
            />
          ) : (
            <Edit
              size={17}
              className="cursor-pointer me-1"
              id={`eye-tooltip-${row.id}`}
              onClick={() => {
                setUser(row)
                setShow(true)
              }}
            />
          )}
          <UncontrolledTooltip placement="top" target={`eye-tooltip-${row.id}`}>
            {userHandler.role === "user" || userHandler.role === "Dealer"
              ? "Edit Customer"
              : "Edit Customer"}
            {/* Edit Customer */}
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
            Preview Customer
          </UncontrolledTooltip>
        </div>
      ),
    },

    {
      name: "Vehicles Ownership",
      sortable: true,
      right: true,
      minWidth: "210px",
      selector: (row) => (
        <div
          onClick={() => {
            navigate("/vehicle/management", { state: row.account_number })
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            cursor: selectedRow === row ? "pointer" : "default",
          }}
        >
          <div
            className="hover-effect"
          // onMouseEnter={(e) => {
          //   e.target.style.fontSize = "20px";
          //   e.target.style.cursor = "pointer";
          // }}
          // onMouseLeave={(e) => {
          //   e.target.style.fontSize = "10px";
          //   e.target.style.cursor = "default";
          // }}
          >
            <Badge
              color="primary"
              style={{
                margin: "2px",
              }}
            >
              {row.vin_count}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      name: "Email",
      minWidth: "250px",
      sortable: true,
      reorder: true,

      cell: (row) => (
        <div style={{ textTransform: "lowercase" }}>{row.email}</div>
      ),
      selector: email || "--",
      // style: { color: "#000" },
    },
    {
      name: "Customer Type",
      sortable: true,
      minWidth: "170px",
      style: { textTransform: "capitalize" },
      selector: (row) => (
        <div
          onClick={() => {
            row.customer_type === "Juristic" && setShowPopup(true)
          }}
          style={{
            color: row.customer_type === "Juristic" ? "#42b983" : "inherit",
            cursor: "pointer",
          }}
        >
          {row.customer_type === "Juristic" ? "Show More" : row.customer_type}
        </div>
      ),
    },
    {
      name: "Account Number",
      sortable: true,
      reorder: true,
      minWidth: "190px",
      right: true,
      // style: { color: "#000" },
      selector: (row) => (
        <div
          onClick={() => {
            navigate("/vehicle/management", { state: row.account_number })
          }}
        // style={{
        //   color: "#42b983",
        //   fontSize: selectedRow === row ? "15px" : "",
        //   cursor: selectedRow === row ? "pointer" : "default",
        // }}
        >
          <div
            className="hover-effect-defualt"
          // onMouseEnter={(e) => {
          //   e.target.style.fontSize = "15px";
          //   e.target.style.cursor = "pointer";
          // }}
          // onMouseLeave={(e) => {
          //   e.target.style.fontSize = "10px";
          //   e.target.style.cursor = "default";
          // }}
          >
            <div
              style={{
                textDecoration: "underline",
                margin: "2px",
                cursor: "pointer",
              }}
            >
              {row.account_number}
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Account Name",
      sortable: true,
      minWidth: "250px",
      reorder: true,
      selector: (row) => row.account_name || "--",
      style: {
        textAlign: "left",
      },
    },

    {
      name: "Phone",
      sortable: true,
      minWidth: "165px",
      right: true,
      selector: (row) => row.phone || "--",
      style: {
        textAlign: "left",
        // color: "#000",
      },
    },

    {
      name: "ID Type",
      sortable: true,
      minWidth: "70px",
      selector: (row) => row.id_type || "--",
      // style: { color: "#000" },
    },
    {
      name: "ID Number",
      sortable: true,
      minWidth: "170px",
      right: true,
      selector: (row) => row.id_number || "--",
      // style: { color: "#000" },
    },
    {
      name: "Shipping Streets",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.shipping_streets || "--",
      // style: { color: "#000" },
    },
    {
      name: "Shipping City",
      sortable: true,
      minWidth: "205px",
      selector: (row) => row.shipping_city || "--",
      // style: { color: "#000" },
    },
    {
      name: "Shipping Province",
      sortable: true,
      minWidth: "200px",
      selector: (row) => row.shipping_state_code || "--",
      // style: { color: "#000" },
    },
    {
      name: "Shipping Country Code",
      sortable: true,
      minWidth: "225px",
      selector: (row) => row.shipping_country_code || "--",
      // style: { color: "#000" },
    },
    {
      name: "Shipping Postal Code",
      sortable: true,
      minWidth: "215px",
      right: true,
      selector: (row) => row.shipping_postal_code || "--",
      // style: { color: "#000" },
    },

    {
      name: "Province Name",
      sortable: true,
      minWidth: "170px",
      selector: (row) => row.province_name || "--",
      // style: { color: "#000" },
    },
    {
      name: "Sales Organization",
      sortable: true,
      minWidth: "200px",
      right: true,
      selector: (row) => row.sales_organization || "--",
      // style: { color: "#000" },
    },
    {
      name: "Interested In Jaguar",
      sortable: true,
      minWidth: "250px",
      center: true,
      selector: (row) =>
        row.InterestedInJaguar === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"19"}
              width={"26"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"20"}
              width={"20"}
            />
          </div>
        ),
    },
    {
      name: "Interested In LR",
      sortable: true,
      minWidth: "250px",
      center: true,
      selector: (row) =>
        row.InterestedInLandRover === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
        ),
    },
    {
      name: "Preferred Retailer",
      sortable: true,
      minWidth: "250px",
      center: true,

      selector: (row) =>
        row.PreferredRetailer === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
        ),
    },
    {
      name: "Products and Services",
      sortable: true,
      minWidth: "250px",
      center: true,

      selector: (row) =>
        row.products_and_services_opt_in === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
        ),
    },
    {
      name: "Events and Experience",
      sortable: true,
      minWidth: "250px",
      center: true,

      selector: (row) =>
        row.events_and_experience_opt_in === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
        ),
    },
    {
      name: "Promotion and Offers",
      sortable: true,
      minWidth: "250px",
      center: true,

      selector: (row) =>
        row.promotions_and_offers_opt_in === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
        ),
    },
    {
      name: "Ownership and Vehicle",
      sortable: true,
      minWidth: "270px",
      selector: (row) =>
        row.ownership_and_vehicle_communication_opt_in === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
        ),
    },
    {
      name: "Surveys and Research",
      sortable: true,
      minWidth: "250px",
      center: true,
      selector: (row) =>
        row.surveys_and_research_opt_in === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
        ),
    },
    {
      name: "Partnership and Sponsorship",
      sortable: true,
      minWidth: "290px",
      center: true,
      selector: (row) =>
        row.partnership_and_sponsorship_opt_in === 1 ? (
          <div>
            <img
              src={check}
              alt="Image description"
              height={"17"}
              width={"20"}
            />
          </div>
        ) : (
          <div>
            <img
              src={uncheck}
              alt="Image description"
              height={"17"}
              width={"17"}
            />
          </div>
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
  ]

  const userValues = {
    vin: vin,
    email: email,
    // account_number: account_number,
    account_name: account_name,
    customer_type: customer_type,
    shipping_streets: shipping_streets,
    shipping_state_code: shipping_state_code,
    shipping_postal_code: shipping_postal_code,
    shipping_country_code: shipping_country_code,
    shipping_city: shipping_city,
    id_type: id_type,
    id_number: id_number,
    sales_organization: sales_organization,
    phone: phone,
    juristic_entity_vat_registration_number:
      juristic_entity_vat_registration_number,
    juristic_entity_name: juristic_entity_name,
    juristic_entity_id_number_ck_number: juristic_entity_id_number_ck_number,
    // province_name: province_name,
    InterestedInJaguar: InterestedInJaguar,
    InterestedInLandRover: InterestedInLandRover,
    PreferredRetailer: PreferredRetailer,
    products_and_services_opt_in: products_and_services_opt_in,
    events_and_experience_opt_in: events_and_experience_opt_in,
    promotions_and_offers_opt_in: promotions_and_offers_opt_in,
    ownership_and_vehicle_communication_opt_in:
      ownership_and_vehicle_communication_opt_in,
    surveys_and_research_opt_in: surveys_and_research_opt_in,
    partnership_and_sponsorship_opt_in: partnership_and_sponsorship_opt_in,
  }
  const onCreateHandler = async () => {
    try {
      const response = await dispatch(addUser(userValues))
      if (response.type == "datatables1/addUser/fulfilled") {
        MySwal.fire({
          icon: "success",
          title: "Updated!",
          text: "User Created Successfully.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        })
        setShow1(false)
        reset()
      } else {
        MySwal.fire({
          icon: "warning",
          title: "Cancelled!",
          text: "There was an error while processing! Please try again",
          customClass: {
            confirmButton: "btn btn-success",
          },
        })
      }
    } catch (error) {
      MySwal.fire({
        icon: "warning",
        title: "Cancelled!",
        text: error,
        customClass: {
          confirmButton: "btn btn-success",
        },
      })
    }
  }
  const onSubmitHandler = async () => {
    try {
      const response = await dispatch(updateUser(defaultValues))
      if (response.type == "datatables1/updateUser/fulfilled") {
        MySwal.fire({
          icon: "success",
          title: "Updated!",
          text: "User Updated Successfully.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        })
        editReset()
        setShow(false)
      } else {
        MySwal.fire({
          icon: "warning",
          title: "Cancelled!",
          text: "There was an error while processing! Please try again",
          customClass: {
            confirmButton: "btn btn-success",
          },
        })
      }
    } catch (error) {
      MySwal.fire({
        icon: "warning",
        title: "Cancelled!",
        text: error,
        customClass: {
          confirmButton: "btn btn-success",
        },
      })
    }
  }

  const handleRowClick = (row, event) => {
    setSelectedRow(row)
    let element = event.target

    while (element && element.tagName !== "column") {
      element = element.parentElement
    }
  }

  useEffect(() => {
    retailerData()
    // provinceData();
  }, [location])

  const retailerData = () => {
    var config = {
      method: "get",
      url: "https://rdbapi.vnvserver.com/customer/type/customer_buying_on_behalf_of",
      headers: {
        token: userData.token,
      },
    }
    axios(config)
      .then(async (response) => {
        if (response.data.status === 200) {
          const mydata = response.data.data
          const mappedOptions1 = mydata.map((item) => ({
            value: item.id,
            label: item.customer_type,
          }))
          setOptiontype(mappedOptions1)
          setSelectedValue(mydata)
          setLoading(true)

          await dispatch(
            getData({
              page: 1,
              perPage: rowsPerPage,
              q: location.state ? location.state : "",
            })
          )
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        }
      })
      .catch((err) => console.log("er--", err))
  }
  // const provinceData = () => {
  //   var config = {
  //     method: "get",
  //     url: "http://jlr-rdb-api.vnvserver.com/customer/provinces/list",
  //   };
  //   axios(config)
  //     .then(function (response) {
  //       if (response.data.status === 200) {
  //         const mydata = response.data.data;
  //         const mappedOptions = mydata.map((item) => ({
  //           value: item.id,
  //           label: item.province_name,
  //         }));
  //         setOptions(mappedOptions);
  //         setProvinceDataValue(mydata);
  //       }
  //     })
  //     .catch((err) => console.log("er--", err));
  // };

  const customStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 5 }),
    table: {
      width: "100%",
    },
    tableWrapper: {
      overflow: "auto",
    },
    rows: {
      style: {
        maxHeight: "1px",
      },
    },
  }
  const handleInputChange = (e) => {
    const boxName = event.target.name
    const newValue = event.target.value
    setUser((prevState) => ({
      ...prevState,
      [boxName]: newValue,
    }))
  }
  const optiontypes = [
    { value: "Juristic", label: "Juristic" },
    { value: "Individual", label: "Individual" },
  ]

  const optionStatecodetypes = [
    { value: "GP", label: "GP" },
    { value: "WC", label: "WC" },
    { value: "EC", label: "EC" },
    { value: "KZN", label: "KZN" },
    { value: "MP", label: "MP" },
    { value: "NW", label: "NW" },
    { value: "LP", label: "LP" },
    { value: "FS", label: "FS" },
    { value: "NC", label: "NC" },
  ]

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
        <div style={{ padding: "10px", width: "14rem", fontSize: "15px" }}>
          <Select
            options={optiontypes}
            onChange={onCustomerHandler}
            isClearable={true}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Customer"
            value={
              customerTypeSearchValue
                ? {
                  value: customerTypeSearchValue,
                  label: customerTypeSearchValue,
                }
                : null
            }
            isSearchable={true}
          />
        </div>
        <div
          style={{
            padding: "10px",
            width: "15rem",
            fontSize: "15px",
          }}
        >
          <Select
            menuPosition={"fixed"}
            styles={customStyles}
            isClearable={true}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Province"
            onChange={onStatecodeHandler}
            value={
              statecodeSearchValue
                ? { value: statecodeSearchValue, label: statecodeSearchValue }
                : null
            }
            isSearchable={true}
            options={optionStatecodetypes}
          ></Select>
        </div>
        {/* <div style={{ padding: "6px", width: "14rem" }}>
          <input
            style={{
              padding: "7px",
              display: "inline-block",

              boxSizing: "border-box",
              fontSize: "15px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
            className="dataTable-filter"
            type="text"
            bsSize="sm"
            id="search-input"
            value={citySearchValue}
            onChange={handleCityChange}
            placeholder="Enter Shipping City"
          />
          {citySearchValue && (
            <img
              src={x_coordinate}
              alt="Image description"
              height={"25"}
              width={"25"}
              onClick={handleCityClear}
              style={{
                marginLeft: "-35px",
                padding: isHovered ? "3px" : "2px",
                backgroundColor: isHovered ? "#f2f2f2" : "transparent",

                // border: "none",
                // outline: "none",
                cursor: "pointer",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          )}
        </div> */}
        <div
          style={{
            padding: "5px",
            marginTop: "5px",
            marginLeft: "12px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClear}
          >
            Clear
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
            <h1 className="mb-1">Create New Customer</h1>
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
                reset()
                editReset()
                setShow1(false)
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
        {console.log(errors)}
        <ModalBody className=" mx-50 pb-2">
          <form className="gy-1 pt-75" onSubmit={handleSubmit(onCreateHandler)}>
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
                  htmlFor="vin"
                >
                  Vehicles Ownership
                </Label>
              </Col>
              <Col md={9}>
                <input
                  autoComplete="off"
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  {...register("vin")}
                  onChange={(e) => setVin(e.target.value)}
                  // onChange={handleInputChange}
                  placeholder="Enter Vehicles Ownership"
                />
                <p style={{ color: "red" }}>{errors.vin?.message}</p>
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
                  htmlFor="Email"
                >
                  Email
                </Label>
              </Col>
              <Col md={9}>
                <input
                  autoComplete="off"
                  className="input form form-control"
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  {...register("email")}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              </Col>
              {/* <div style={{ marginTop: "10px" }}>
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                htmlFor="account_number"
              >
                Account Number
              </Label>

              <input
                className="input"
                style={{
                  padding: "8px 7px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  width: "75%",
                }}
                {...register("account_number")}
                onChange={(e) => setAccount_number(e.target.value)}
                placeholder="Enter Last Name"
                type="text"
              />

              <p style={{ color: "red" }}>{errors.account_number?.message}</p>
            </div> */}
              <Col md={3}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                  }}
                  className="label"
                  htmlFor="account_name"
                >
                  Account Name
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
                  {...register("account_name")}
                  onChange={(e) => setAccount_name(e.target.value)}
                  placeholder="Enter Account Name"
                  type="account_name"
                  autoComplete="off"
                />
                <p style={{ color: "red" }}>{errors.account_name?.message}</p>
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
                  htmlFor="phone"
                >
                  Phone
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
                  {...register("phone")}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Phone Number"
                  type="number"
                />

                <p style={{ color: "red" }}>{errors.phone?.message}</p>
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
                  htmlFor="customer_type"
                >
                  Customer Type
                </Label>
              </Col>
              <Col md={9}>
                <Controller
                  name={"customer_type"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        options={
                          selectedValue &&
                          selectedValue.map((item) => ({
                            value: item.customer_type,
                            label: item.customer_type,
                          }))
                        }
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption)
                          setCustomer_type(selectedOption.value)
                        }}
                        isSearchable={true}
                        placeholder="Select Customer Type"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                          }),
                        }}
                        className="select "
                      />
                    )
                  }}
                />
                <p style={{ color: "red" }}>{errors.customer_type?.message}</p>
              </Col>

              {customer_type === "Juristic" && (
                <Row>
                  <Col md={3}>
                    <Label
                      style={{
                        marginTop: "6px",
                        fontSize: "14px",
                        color: "black",
                        alignItems: "center",
                      }}
                      className="label"
                      htmlFor="juristic_entity_vat_registration_number"
                    >
                      Juristic Registration Number
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
                      // {...register("juristic_entity_vat_registration_number")}
                      onChange={(e) =>
                        setJuristic_entity_vat_registration_number(
                          e.target.value
                        )
                      }
                      placeholder="Enter Juristic registration Number"
                      type="text"
                    />
                    <p style={{ color: "red" }}>
                      {/* {errors.juristic_entity_vat_registration_number?.message} */}
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
                      htmlFor="juristic_entity_id_number_ck_number"
                    >
                      Juristic Ck Number
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
                      // {...register("juristic_entity_id_number_ck_number")}
                      onChange={(e) =>
                        setJuristic_entity_id_number_ck_number(e.target.value)
                      }
                      placeholder="Enter Juristic Ck Number"
                      type="text"
                    />
                    <p style={{ color: "red" }}>
                      {/* {errors.juristic_entity_id_number_ck_number?.message} */}
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
                      htmlFor="juristic_entity_name"
                    >
                      Juristic Entity Name
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
                      // {...register("juristic_entity_name")}
                      onChange={(e) => setJuristic_entity_name(e.target.value)}
                      placeholder="Enter Juristic Entity Name"
                      type="text"
                    />
                    <p style={{ color: "red" }}>
                      {/* {errors.juristic_entity_name?.message} */}
                    </p>
                  </Col>
                </Row>
              )}

              <Col md={3} className="alignment-label">
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                  }}
                  className="label"
                  for="id_type"
                >
                  ID Type
                </Label>
              </Col>

              <Col md={9} className="alignment-input">
                <Controller
                  name={"id_type"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        options={[
                          { value: "National ID", label: "National ID" },
                          { value: "Passport", label: "Passport" },
                        ]}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption)
                          setId_type(selectedOption.value)
                        }}
                        isSearchable={true}
                        placeholder="Select ID Type"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                          }),
                        }}
                        className="select "
                      />
                    )
                  }}
                />

                <p style={{ color: "red" }}>{errors.id_type?.message}</p>
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
                  htmlFor="id_number"
                >
                  ID Number
                </Label>
              </Col>
              <Col md={9} className="alignment-input">
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
                  {...register("id_number")}
                  onChange={(e) => setId_Number(e.target.value)}
                  placeholder="Enter ID Number"
                  type="text"
                />

                <p style={{ color: "red" }}>{errors.id_number?.message}</p>
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
                  htmlFor="sales_organization"
                >
                  Sales Organization
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
                  {...register("sales_organization")}
                  onChange={(e) => setSales_organization(e.target.value)}
                  placeholder="Enter Sales Organization"
                  type="text"
                />
                <p style={{ color: "red" }}>
                  {errors.sales_organization?.message}
                </p>
              </Col>
              {/* <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                  }}
                  className="label"
                  htmlFor="jaguar_retailer"
                >
                  Province Name
                </Label>

                <select
                  style={{
                    padding: "8px 7px",
                    display: "inline-block",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    width: "75%",
                  }}
                  disabled={false}
                  value={province_name}
                  onChange={(e) => setProvince_name(e.target.value)}
                >
                  {provinceDataValue.map((item) => (
                    <option key={item} value={item.province_name}>
                      {item.province_name}
                    </option>
                  ))}
                </select>
              </div> */}
              <Col md={3}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                  }}
                  className="label"
                  htmlFor="shipping_streets"
                >
                  Shipping Streets
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
                  {...register("shipping_streets")}
                  onChange={(e) => setShipping_streets(e.target.value)}
                  placeholder="Enter Shipping Streets"
                  type="text"
                />
                <p style={{ color: "red" }}>
                  {errors.shipping_streets?.message}
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
                  htmlFor="shipping_state_code"
                >
                  Shipping Province
                </Label>
              </Col>
              <Col md={9}>
                <Controller
                  name={"shipping_state_code"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        options={[
                          { value: "GP", label: "GP" },
                          { value: "WC", label: "WC" },
                          { value: "KZN", label: "KZN" },
                          { value: "MP", label: "MP" },
                          { value: "NW", label: "NW" },
                          { value: "LP", label: "LP" },
                          { value: "FS", label: "FS" },
                        ]}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption)
                          setShipping_state_code(selectedOption.value)
                        }}
                        isSearchable={true}
                        placeholder="Select Shipping Province"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                          }),
                        }}
                        className="select "
                      />
                    )
                  }}
                />

                <p style={{ color: "red" }}>
                  {errors.shipping_state_code?.message}
                </p>
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
                  htmlFor="shipping_postal_code"
                >
                  Shipping Postal code
                </Label>
              </Col>
              <Col md={9} className="alignment-input">
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
                  {...register("shipping_postal_code")}
                  onChange={(e) => setShipping_postal_code(e.target.value)}
                  placeholder="Enter  Shipping Postal code"
                  type="text"
                />
                <p style={{ color: "red" }}>
                  {errors.shipping_postal_code?.message}
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
                  htmlFor="shipping_country_code"
                >
                  Shipping Country Code
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
                  // {...register("shipping_country_code")}
                  onChange={(e) => setshipping_country_code(e.target.value)}
                  placeholder="Enter Shipping Country Code"
                  type="text"
                />
                {/* <p style={{ color: "red" }}>
                  {errors.shipping_country_code?.message}
                </p> */}
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
                  htmlFor="shipping_city"
                >
                  Shipping City
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
                  {...register("shipping_city")}
                  onChange={(e) => setShipping_city(e.target.value)}
                  placeholder="Enter Shipping City "
                  type="text"
                />
                <p style={{ color: "red" }}>{errors.shipping_city?.message}</p>
              </Col>

              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="InterestedInJaguar"
                >
                  Interested In Jaguar
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="InterestedInJaguar"
                  checked={InterestedInJaguar === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.InterestedInJaguar?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="InterestedInLandRover"
                >
                  Interested In Land Rover
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="InterestedInLandRover"
                  checked={InterestedInLandRover === 1}
                  onChange={handleCheckboxChange}
                />

                <p style={{ color: "red" }}>
                  {errors.InterestedInLandRover?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="PreferredRetailer"
                >
                  Preferred Retailer
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="PreferredRetailer"
                  checked={PreferredRetailer === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.PreferredRetailer?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="products_and_services_opt_in"
                >
                  Products and Services
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="products_and_services_opt_in"
                  checked={products_and_services_opt_in === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.products_and_services_opt_in?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="events_and_experience_opt_in"
                >
                  Events and Experience
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="events_and_experience_opt_in"
                  checked={events_and_experience_opt_in === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.events_and_experience_opt_in?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="promotions_and_offers_opt_in"
                >
                  Promotion and Offers
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="promotions_and_offers_opt_in"
                  checked={promotions_and_offers_opt_in === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.promotions_and_offers_opt_in?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="ownership_and_vehicle_communication_opt_in"
                >
                  Ownership and Vehicle Communication
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="ownership_and_vehicle_communication_opt_in"
                  checked={ownership_and_vehicle_communication_opt_in === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.ownership_and_vehicle_communication_opt_in?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="surveys_and_research_opt_in"
                >
                  Surveys and Research
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="surveys_and_research_opt_in"
                  checked={surveys_and_research_opt_in === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.surveys_and_research_opt_in?.message}
                </p>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="partnership_and_sponsorship_opt_in"
                >
                  Partnership and Sponsorship
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="partnership_and_sponsorship_opt_in"
                  checked={partnership_and_sponsorship_opt_in === 1}
                  onChange={handleCheckboxChange}
                />
                <p style={{ color: "red" }}>
                  {errors.partnership_and_sponsorship_opt_in?.message}
                </p>
              </div>

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
                    setShow1(false)
                    editReset()
                    reset()
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
            <h1 className="mb-1">Edit Customer Information</h1>
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
                reset()
                editReset()
                setShow(false)
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
        <ModalBody className=" mx-50 pb-2">
          <form
            className="gy-1 pt-75"
            onSubmit={handleEditSubmit(onSubmitHandler)}
          >
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
                  htmlFor="editVin"
                >
                  Vehicles Ownership
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
                  // disabled={true}
                  {...editRegister("editVin")}
                  onChange={handleInputChange}
                  defaultValue={user.vin}
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>{editErrors.editVin?.message}</p>
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
                  htmlFor="editEmail"
                >
                  Email
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
                  {...editRegister("editEmail")}
                  onChange={handleInputChange}
                  defaultValue={user.email}
                  disabled={isLoggedIn ? true : false}
                  // name="email"
                  placeholder={defaultValues.email}
                />
                <p style={{ color: "red" }}>{editErrors.editEmail?.message}</p>
              </Col>
              {/* <div style={{ marginTop: "10px" }}>
            <Label
              style={{
                marginTop: "6px",
                fontSize: "15px",
                color: "black",
                alignItems: "center",
              }}
              className="label"
              htmlFor="account_number"
            >
              Account Number
            </Label>

            <input
              className="input"
              style={{
                padding: "8px 7px",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                width: "75%",
              }}
              onChange={handleInputChange}
              value={user.account_number}
              name="account_number"
              placeholder={defaultValues.account_number}
              type="text"
            />
           </div> */}
              <Col md={3}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                  }}
                  className="label"
                  htmlFor="accountName"
                >
                  Account Name
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
                  {...editRegister("accountName")}
                  onChange={handleInputChange}
                  defaultValue={user.account_name}
                  // name="account_name"
                  placeholder={defaultValues.account_name}
                  type="text"
                  // onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
                <p style={{ color: "red" }}>
                  {editErrors.accountName?.message}
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
                  htmlFor="editPhone"
                >
                  Phone
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
                  {...editRegister("editPhone")}
                  onChange={handleInputChange}
                  defaultValue={user.phone}
                  disabled={isLoggedIn ? true : false}
                  // name="phone"
                  placeholder={defaultValues.phone}
                  type="number"
                />
                <p style={{ color: "red" }}>{editErrors.editPhone?.message}</p>
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
                  htmlFor="customer_Type"
                >
                  Customer Type
                </Label>
              </Col>

              <Col md={9} className="alignment-input">
                <Select
                  // style={{
                  //   padding: "7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  //   marginLeft: "1px",
                  // }}

                  className="select "
                  // onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                  defaultValue={{
                    value: user.customer_type,
                    label: user.customer_type,
                  }}
                  name="customer_type"
                  onChange={(selectedOption) =>
                    setCustomer_type(selectedOption)
                  }
                  // {...register("land_rover_retailer")}
                  options={selectedValue.map((items) => ({
                    value: items.customer_type,
                    label: items.customer_type,
                  }))}
                >
                  {/* {selectedValue.map((items) => (
                    <option key={items} value={items.customer_type}>
                      {items.customer_type}
                    </option>
                  ))} */}
                </Select>
                {/* <p style={{color: "red"}}>{errors.customer_type?.message}</p> */}
              </Col>

              {user.customer_type != "Individual" && (
                <Row>
                  <Col md={3}>
                    <Label
                      style={{
                        marginTop: "6px",
                        fontSize: "14px",
                        color: "black",
                        alignItems: "center",
                      }}
                      className="label"
                      htmlFor="juristic_entity_vat_registration_number"
                    >
                      Juristic Registration Number
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
                      // {...editRegister("editVin")}
                      value={
                        user.juristic_entity_vat_registration_number
                          ? user.juristic_entity_vat_registration_number
                          : ""
                      }
                      onChange={handleInputChange}
                      disabled={isLoggedIn ? true : false}
                      name="juristic_entity_vat_registration_number"
                      type="text"
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
                      htmlFor="juristic_entity_id_number_ck_number"
                    >
                      Juristic Ck Number
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
                      // {...editRegister("editVin")}
                      value={
                        user.juristic_entity_id_number_ck_number
                          ? user.juristic_entity_id_number_ck_number
                          : ""
                      }
                      onChange={handleInputChange}
                      disabled={isLoggedIn ? true : false}
                      name="juristic_entity_id_number_ck_number"
                      type="text"
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
                      htmlFor="juristic_entity_name"
                    >
                      Juristic Entity Name
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
                      // {...editRegister("editVin")}
                      value={
                        user.juristic_entity_name
                          ? user.juristic_entity_name
                          : ""
                      }
                      onChange={handleInputChange}
                      disabled={isLoggedIn ? true : false}
                      name="juristic_entity_name"
                      type="text"
                    />
                  </Col>
                </Row>
              )}

              <Col md={3} className="alignment-label">
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                  }}
                  className="label"
                  htmlFor="id_type"
                >
                  ID Type
                </Label>
              </Col>
              <Col md={9} className="alignment-input">
                <Select
                  // style={{
                  //   padding: "7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  //   marginLeft: "1px",
                  // }}
                  className="select"
                  // onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                  // value={id_type}
                  defaultValue={{ value: user.id_type, label: user.id_type }}
                  name="id_type"
                  onChange={(selectedOption) => setId_type(selectedOption)}
                  options={[
                    { value: "National ID", label: "National ID" },
                    { value: "Passport", label: "Passport" },
                  ]}
                ></Select>
                {/* <p style={{ color: "red" }}>{errors.id_type?.message}</p> */}
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
                  htmlFor="idNumber"
                >
                  ID Number
                </Label>
              </Col>
              <Col md={9} className="alignment-input">
                <input
                  // style={{
                  //   padding: "8px 7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  // }}
                  className="select form form-control"
                  {...editRegister("idNumber")}
                  onChange={handleInputChange}
                  defaultValue={user.id_number}
                  disabled={isLoggedIn ? true : false}
                  // name="id_number"
                  placeholder={defaultValues.id_number}
                  type="text"
                />
                <p style={{ color: "red" }}>{editErrors.idNumber?.message}</p>
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
                  htmlFor="shippingStreets"
                >
                  Shipping Streets
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
                  {...editRegister("shippingStreets")}
                  onChange={handleInputChange}
                  defaultValue={user.shipping_streets}
                  disabled={isLoggedIn ? true : false}
                  // name="shipping_streets"
                  placeholder={defaultValues.shipping_streets}
                  type="text"
                />
                <p style={{ color: "red" }}>
                  {editErrors.shippingStreets?.message}
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
                  htmlFor="shipping_state_code"
                >
                  Shipping Province
                </Label>
              </Col>

              <Col md={9}>
                <Select
                  // style={{
                  //   padding: "7px",
                  //   display: "inline-block",
                  //   border: "1px solid #ccc",
                  //   borderRadius: "4px",
                  //   boxSizing: "border-box",
                  //   width: "75%",
                  //   marginLeft: "1px",
                  // }}
                  className="select "
                  // onChange={handleInputChange}
                  // {...register("shipping_state_code")}
                  disabled={isLoggedIn ? true : false}
                  defaultValue={{
                    value: user.shipping_state_code,
                    label: user.shipping_state_code,
                  }}
                  name="shipping_state_code"
                  onChange={(selectedOption) =>
                    setShipping_state_code(selectedOption)
                  }
                  options={[
                    { value: "GP", label: "GP" },
                    { value: "WC", label: "WC" },
                    { value: "EC", label: "EC" },
                    { value: "KZN", label: "KZN" },
                    { value: "MP", label: "MP" },
                    { value: "NW", label: "NW" },
                    { value: "LP", label: "LP" },
                    { value: "FS", label: "FS" },
                  ]}
                ></Select>
                {/* <p style={{ color: "red" }}>{errors.shipping_state_code?.message}</p> */}
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
                  htmlFor="shippingPostalCode"
                >
                  Shipping Postal Code
                </Label>
              </Col>

              <Col md={9} className="alignment-input">
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
                  {...editRegister("shippingPostalCode")}
                  onChange={handleInputChange}
                  defaultValue={user.shipping_postal_code}
                  disabled={isLoggedIn ? true : false}
                  // name="shipping_postal_code"
                  placeholder={defaultValues.shipping_postal_code}
                  type="text"
                />
                <p style={{ color: "red" }}>
                  {editErrors.shippingPostalCode?.message}
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
                  htmlFor="shippingCountryCode"
                >
                  Shipping Country Code
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
                  {...editRegister("shippingCountryCode")}
                  defaultValue={user.shipping_country_code}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                  // name="shipping_country_code"
                  placeholder={defaultValues.shipping_country_code}
                  type="text"
                />
                <p style={{ color: "red" }}>
                  {editErrors.shippingCountryCode?.message}
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
                  htmlFor="shippingCity"
                >
                  Shipping City
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
                  {...editRegister("shippingCity")}
                  onChange={handleInputChange}
                  defaultValue={user.shipping_city}
                  disabled={isLoggedIn ? true : false}
                  // name="shipping_city"
                  placeholder={defaultValues.shipping_city}
                  type="text"
                />
                <p style={{ color: "red" }}>
                  {editErrors.shippingCity?.message}
                </p>
              </Col>

              {/* <div style={{ marginTop: "10px" }}>
              <Label
                style={{
                  marginTop: "6px",
                  fontSize: "15px",
                  color: "black",
                  alignItems: "center",
                }}
                className="label"
                htmlFor="province_name"
              >
                Province Name
              </Label>
              <select
                style={{
                  padding: "8px 7px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
                className="select"
                onChange={(e) => (defaultValues.province_name = e.target.value)}
                placeholder={defaultValues.province_name}
              >
                {provinceDataValue.map((item) => (
                  <option key={item} value={item.province_name}>
                    {item.province_name}
                  </option>
                ))}
              </select>
            </div> */}
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="InterestedInJaguar"
                >
                  Interested In Jaguar
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="InterestedInJaguar"
                  checked={user.InterestedInJaguar}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="InterestedInLandRover"
                >
                  Interested In Land Rover
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="InterestedInLandRover"
                  checked={user.InterestedInLandRover}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="PreferredRetailer"
                >
                  Preferred Retailer
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="PreferredRetailer"
                  checked={user.PreferredRetailer}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="products_and_services_opt_in"
                >
                  Products and Services
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="products_and_services_opt_in"
                  checked={user.products_and_services_opt_in}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="events_and_experience_opt_in"
                >
                  Events and Experience
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="events_and_experience_opt_in"
                  checked={user.events_and_experience_opt_in}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="promotions_and_offers_opt_in"
                >
                  Promotion and Offers
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="promotions_and_offers_opt_in"
                  checked={user.promotions_and_offers_opt_in}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="ownership_and_vehicle_communication_opt_in"
                >
                  OwnerShip and Vehicle Communication
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="ownership_and_vehicle_communication_opt_in"
                  checked={user.ownership_and_vehicle_communication_opt_in}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="surveys_and_research_opt_in"
                >
                  Surveys and Research
                </Label>

                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="surveys_and_research_opt_in"
                  checked={user.surveys_and_research_opt_in}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "15px",
                    color: "black",
                    alignItems: "center",
                    width: "300px",
                  }}
                  className="label"
                  htmlFor="partnership_and_sponsorship_opt_in"
                >
                  Partnership and Sponsorship
                </Label>
                <Input
                  style={{
                    marginLeft: "21px",
                    marginTop: "11px",
                    padding: "10px",
                  }}
                  type="checkbox"
                  name="partnership_and_sponsorship_opt_in"
                  checked={defaultValues.partnership_and_sponsorship_opt_in}
                  onChange={handleInputChange}
                  disabled={isLoggedIn ? true : false}
                />
              </div>

              {/* <Col xs={12} className=" mt-2 pt-50" >
                
                {userHandler.role === "user" ? (
                  <button
                    onClick={() => {
                      onSubmitHandler();
                    }}
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      marginRight: "5px",
                    }}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="reset"
                    className="btn btn-secondary"
                    onClick={() => setShow(false)}
                    style={{ color: "black" }}
                  >
                    Discard
                  </button>
                )}
              </Col> */}

              <Col xs={12} className="mt-2 pt-50">
                <button
                  // onClick={onSubmitHandler}
                  type="submit"
                  className="btn btn-primary"
                  style={{ marginRight: "5px" }}
                >
                  Update
                </button>

                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShow(false)
                    editReset()
                    reset()
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
        isOpen={showPopup}
        toggle={() => setShowPopup(!showPopup)}
        className="modal-dialog-centered modal-lg"
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
              marginLeft: "1rem",
            }}
          >
            <h1 className="mb-1">Juristic Details</h1>
          </div>
          <div
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: "1rem",
            }}
          >
            <img
              src={x_coordinate}
              alt="Image description"
              height={"30"}
              width={"30"}
              onClick={() => {
                reset()
                editReset()
                setShowPopup(false)
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
          <form className="gy-1 pt-75">
            <Row>
              <Col md={3}>
                <Label
                  style={{
                    marginTop: "6px",
                    fontSize: "14px",
                    color: "black",
                    alignItems: "center",
                  }}
                  className="label"
                  htmlFor="juristic_entity_vat_registration_number"
                >
                  Juristic Registration Number
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
                  disabled
                  className="input form form-control"
                  value={user.juristic_entity_vat_registration_number}
                  onChange={handleInputChange}
                  name="juristic_entity_vat_registration_number"
                  type="text"
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
                  htmlFor="juristic_entity_id_number_ck_number"
                >
                  Juristic Ck Number
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
                  disabled
                  value={user.juristic_entity_id_number_ck_number}
                  onChange={handleInputChange}
                  name="juristic_entity_id_number_ck_number"
                  type="text"
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
                  htmlFor="juristic_entity_name"
                >
                  Juristic Entity Name
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
                  disabled
                  className="input form form-control"
                  value={user.juristic_entity_name}
                  onChange={handleInputChange}
                  name="juristic_entity_name"
                  type="text"
                />
              </Col>
              <Col
                xs={12}
                className="mt-2 d-flex"
              //  justify-content-center"
              >
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() => {
                    reset()
                    editReset()
                    setShowPopup(false)
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

      <Suspense
        fallback={
          <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
        }
      >
        <Card>
          <CardHeader className="border-bottom" style={{ padding: "15px" }}>
            <CardTitle tag="h2" style={{ fontSize: "22px" }}>
              Customers List {store?.totalCount ? `(${store?.totalCount})` : ""}
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
                className="btn btn-primary"
                onClick={() => {
                  setShow1(true)
                }}
                style={{ padding: "10px" }}
              >
                Add New Customer
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
                fixedHeader
                highlightOnHover
                // pointerOnHover
                onRowClicked={handleRowClick}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                customStyles={customStyles}
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
  )
}

export default memo(DataTableServerSide)
