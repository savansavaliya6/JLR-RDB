import { Fragment, useState, useEffect, memo, Suspense } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  getDropdownValue,
  getData,
  deleteUser,
  updateUser,
  addUser,
} from "./store"
import { useSelector, useDispatch } from "react-redux"
import ReactPaginate from "react-paginate"
import { ChevronDown, Eye, Edit, Trash, Star } from "react-feather"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import Loader from "react-js-loader"

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
  CardSubtitle,
} from "reactstrap"
import InputPasswordToggle from "@components/input-password-toggle"
import * as yup from "yup"
import { Form, FormControl, FormGroup } from "react-bootstrap"
import FormControlLabel from "rsuite/esm/FormControlLabel"
import "./UserList.css"
import axios from "axios"
import Select from "react-select"

import x_coordinate from "../../../assets/imgs/x-coordinate.png"
import { toast } from "react-hot-toast"
import CustLoader from "./CustLoader"
import Statistics from "./Statistics"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import UpdateComponent from "./UpdateComponent"

const MySwal = withReactContent(Swal)
const User = JSON.parse(sessionStorage.getItem("userData"));
const DataTableServerSide = () => {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.exceptionReport)
  const [updateCount, setUpdateCount] = useState("")
  const [countLoader, setCountLoader] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isHovered1, setIsHovered1] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [role, setRole] = useState("")
  const [jaguar_retailer, setJagaurRetailer] = useState("")
  const [land_rover_retailer, setLandRoverRetailer] = useState("")
  const [first_name, setFirst_name] = useState("")
  const [last_name, setLast_name] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [correctdata, setcorrectdata] = useState()
  const [selectedValueJAR, setSelectedValueJAR] = useState([])
  const [selectedValueLR, setSelectedValueLR] = useState([])
  const [pending, setPending] = useState(true)
  const [roleSearchValue, setRoleSearchValue] = useState("")
  const [jgSearchValue, setJgSearchValue] = useState("")
  const [lrSearchValue, setLrSearchValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [jag_code, setjag_code] = useState("")
  const [lr_code, setlr_code] = useState("")
  const [checkUser, setCheckUser] = useState({})
  const [customLoading, setCustomLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState("")
  const [checkValidations, setCheckValidations] = useState(false)
  const [updateComponentLoading, setUpdateComponentLoading] = useState("")

  const [user, setUser] = useState({
    invoice_date: "",
    invoice_number: "",
    account_id: "",
    id_number: "",

    passport_number: "",
    first_name: "",
    last_name: "",
    email_address_1: "",
    cellular_phone_number: "",
    vin: "",
    make: "",
    model: "",
    model_description: "",
    salesperson: "",
    retailer: "",
    dealer_code: "",
    transaction_type: "",
    dms_customer_key: "",
    customer_master_key: "",
    platform: "",
    last_updated: "",
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUser(user)
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (show == false || show1 == false) {
      setCheckEmail(false)
    }
  }, [show, show1])

  const CustomLoader = () => (
    <div style={{ padding: "24px" }}>
      <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
    </div>
  )

  useEffect(() => {
    setLoading(true)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    )
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [currentPage, rowsPerPage, searchValue, dispatch])

  const defaultValues = {
    invoice_date: user.invoice_date,
    invoice_number: user.invoice_number,
    account_id: user.account_id,
    id_number: user.id_number,
    passport_number: user.passport_number,
    first_name: user.first_name,
    last_name: user.last_name,
    email_address_1: user.email_address_1,
    cellular_phone_number: user.cellular_phone_number,
    vin: user.vin,
    make: user.make,
    model: user.model,
    model_description: user.model_description,
    salesperson: user.salesperson,
    retailer: user.retailer,
    dealer_code: user.dealer_code,
    transaction_type: user.transaction_type,
    dms_customer_key: user.dms_customer_key,
    customer_master_key: user.customer_master_key,
    platform: user.platform,
    // last_updated: user.last_updated,
  }

  const defaultValuesForEdit = {
    invoice_date: user.invoice_date,
    invoice_number: user.invoice_number,
    accountId: user.account_id,
    id_number: user.id_number,
    passport_number: user.passport_number,
    first_name: user.first_name,
    last_name: user.last_name,
    email_address_1: user.email_address_1,
    cellular_phone_number: user.cellular_phone_number,
    vin: user.vin,
    make: user.make,
    model: user.model,
    model_description: user.model_description,
    salesperson: user.salesperson,
    retailer: user.retailer,
    dealer_code: user.dealer_code,
    transaction_type: user.transaction_type,
    dms_customer_key: user.dms_customer_key,
    customer_master_key: user.customer_master_key,
    platform: user.platform,
  }

  // email validation
  const validateEmail = async (email) => {
    if (email) {
      try {
        const myHeaders = new Headers()
        myHeaders.append("apikey", "k4B2JCRck2bYgKgXXRNN42i5F2Fmv6zG")

        const requestOptions = {
          method: "GET",
          redirect: "follow",
          headers: myHeaders,
        }

        const response = await fetch(
          `https://api.apilayer.com/email_verification/check?email=${email}`,
          requestOptions
        )

        const data = await response.json()
        if (data.format_valid && data.smtp_check) {
          setCustomLoading(false)
          setCheckEmail(true)
          return true
        } else {
          setCustomLoading(false)

          return false
        }
      } catch (error) {
        setCustomLoading(false)
        console.log("Error occurred during email validation:", error)
        return false
      }
    } else {
      setCustomLoading(false)

      return false
    }
  }

  const SignupSchema = yup.object().shape({
    invoice_date: yup.string().required("Invoice Date is required"),
    invoice_number: yup.string().required("Invoice Number is required"),
    account_id: yup.string().required("Account ID is required"),
    id_number: yup
      .string()
      .test("numeric", "ID Number must be a numeric value", (value) => {
        if (!value) {
          return true
        }
        return /^[0-9]+$/.test(value)
      })
      .test(
        "not-all-zeros",
        "First 6 digits should not be all zeros",
        (value) => {
          if (!value) {
            return true
          }
          const firstSixDigits = value.slice(0, 6)
          return firstSixDigits !== "000000"
        }
      )
      .test("len", "ID Number must be a 13-digit number", (value) => {
        if (!value) {
          return true
        }
        return value.length === 13
      })
      .required("ID Number is required"),
    passport_number: yup.string().required("Passport Number is required"),
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email_address_1: yup
      .string()
      .email("Invalid email")
      // .test(
      //   "email-validation",
      //   "Email is invalid or does not exist",
      //   async function (value) {
      //     setCustomLoading(true);
      //     return await validateEmail(value);
      //   }
      // )
      .required("Email is required"),
    cellular_phone_number: yup
      .string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .notOneOf(["1234567890", "0000000000"], "Invalid phone number")
      .required("Phone number is required")
      .required("Phone Number is required"),
    vin: yup.string().required("VIN is required"),
    make: yup.string().required("Make is required"),
    model: yup.string().required("Model is required"),
    model_description: yup.string().required("Model Description is required"),
    salesperson: yup.string().required("Salesperson is required"),
    retailer: yup.string().required("Retailer is required"),
    dealer_code: yup.string().required("Dealer Code is required"),
    transaction_type: yup.string().required("Transaction Type is required"),
    dms_customer_key: yup.string().required("DMS Customer Type is required"),
    customer_master_key: yup
      .number("Must enter number")
      .required("Customer Master Key is required"),
    platform: yup.string().required("Platform is required"),
  })

  const editSchema = yup.object().shape({
    //invoiceDate: yup.string().required("Invoice Date is required"),
    //invoiceNumber: yup.string().required("Invoice Number is required"),
    // accountId: yup.string().required("Account ID is required"),
    idNumber: yup
      .string()
      .test("validateIdNumber", "ID Number is required", function (value) {
        const passportNumber = this.resolve(yup.ref("passportNumber"))
        if (!passportNumber || passportNumber.trim() === "") {
          return !!value
        }
        return true
      })
      .test("numeric", "ID Number must be a numeric value", function (value) {
        if (!value) {
          return true
        }
        return /^[0-9]+$/.test(value)
      })
      .test(
        "not-all-zeros",
        "First 6 digits should not be all zeros",
        function (value) {
          if (!value) {
            return true
          }
          const firstSixDigits = value.slice(0, 6)
          return firstSixDigits !== "000000"
        }
      )
      .test("len", "ID Number must be a 13-digit number", function (value) {
        if (!value) {
          return true
        }
        return value.length === 13
      }),
    passportNumber: yup
      .string()
      .test(
        "validatePassportNumber",
        "Passport Number is required",
        function (value) {
          const idNumber = this.resolve(yup.ref("idNumber"))
          if (!idNumber || idNumber.trim() === "") {
            return !!value
          }
          return true
        }
      ),

    firstName: yup
      .string()
      .min(2, "First Name must be at least 2 characters long")
      .required("First Name is required"),
    lastName: yup
      .string()
      .min(2, "Last Name must be at least 2 characters long")
      .required("Last Name is required"),
    emailAddress1: yup
      .string()
      .email("Invalid email")
      // .test(
      //   "email-validation",
      //   "Email is invalid or does not exist",
      // async function (value) {
      //   setCustomLoading(true);
      //   return await validateEmail(value);
      // }
      // )
      .required("Email is required"),
    cellularPhoneNumber: yup
      .string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .notOneOf(["1234567890", "0000000000"], "Invalid phone number")
      .required("Phone number is required")
      .required("Phone Number is required"),
    //editVin: yup.string().required("VIN is required"),
    // editMake: yup.string().required("Make is required"),
    //editModel: yup.string().required("Model is required"),
    // modelDescription: yup.string().required("Model Description is required"),
    //salesPerson: yup.string().required("Salesperson is required"),
    //editRetailer: yup.string().required("Retailer is required"),
    //dealerCode: yup.string().required("Dealer Code is required"),
    // transactionType: yup.string().required("Transaction Type is required"),
    //dmsCustomerKey: yup.string().required("DMS Customer Type is required"),
    // customerMasterKey: yup
    //   .number("Must enter number")
    //   .required("Customer Master Key is required"),

    // editPlatform: yup.string().required("Platform is required"),
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: user,
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
    defaultValuesForEdit,
    resolver: yupResolver(editSchema),
  })

  useEffect(() => {
    editReset(user)
  }, [show])

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

  const handleChildLoading = (loading) => setUpdateComponentLoading(loading)

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
      name: "",
      minWidth: "30px",
      maxWidth: "80px",
      center: true,
      cell: (row) => (
        <div className="column-action d-flex align-items-center justify-content-center">
          <Edit
            // alignItems="center"
            size={17}
            color={
              row.status == 1 ||
                row.id_number === null ||
                row.id_number === "" ||
                row.id_number.toString().length !== 13 ||
                isNaN(row.id_number) ||
                row.passport_number === null ||
                row.passport_number === "" ||
                // row.cellular_phone_number.toString().length !== 10 ||
                isNaN(row.passport_number) ||
                row.first_name === null ||
                row.first_name.length <= 1 ||
                row.last_name === null ||
                row.last_name.length <= 1 ||
                row.cellular_phone_number === null ||
                row.cellular_phone_number === "" ||
                row.cellular_phone_number.toString().length !== 10 ||
                isNaN(row.cellular_phone_number)
                ? "red"
                : "black"
            }
            className="cursor-pointer me-1"
            id={`edit-tooltip-${row.account_id}`}
            onClick={() => {
              setUser(row)

              // setCheckUser(row);
              setShow(true)
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`edit-tooltip-${row.account_id}`}
          >
            Update Data
          </UncontrolledTooltip>

          {/*<Trash
            size={17}
            className="cursor-pointer"
            id={`trash-tooltip-${row.account_id}`}
            onClick={async (e) => {
              e.preventDefault()
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
                customClass: {
                  confirmButton: "swal-space-right", // Add space to the right of the confirm button
                  cancelButton: "swal-space-left", // Add space to the left of the cancel button
                },
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    await dispatch(deleteUser(row.customer_hash))
                    Swal.fire("Deleted!", "Report has been deleted.", "success")
                  } catch (error) {
                    Swal.fire(
                      "Error",
                      "An error occurred while deleting the report.",
                      "error"
                    )
                  }
                }
              })
            }}
          />*/}
          {/*<UncontrolledTooltip
            placement="top"
            target={`trash-tooltip-${row.account_id}`}
          >
            Delete User
          </UncontrolledTooltip>*/}
        </div>
      ),
    },
    // {
    //   name: "Customer Hash",
    //   sortable: true,
    //   minWidth: "40px",
    //   right: true,
    //   // style: { color: "#000" },
    //   selector: (row) => row.customer_hash,
    // },
    {
      name: "Customer Master Key",
      sortable: true,
      minWidth: "40px",
      center: true,
      // style: { color: "#000" },
      selector: (row) => row.customer_master_key,
    },
    {
      name: "Account ID",
      sortable: true,
      minWidth: "40px",
      center: true,
      // style: { color: "#000" },
      selector: (row) => row.account_id,
    },
    {
      name: "ID Number",
      sortable: true,
      minWidth: "100px",
      // style: { color: "#000" },
      selector: (row) => row.id_number,

      conditionalCellStyles: [
        {
          when: (row) =>
            row.id_number === null ||
            row.id_number === "" ||
            row.id_number.toString().length !== 13 ||
            isNaN(row.id_number),
          style: {
            backgroundColor: "#ffff9f",
          },
        },
      ],
    },

    {
      name: "Passport Number",
      sortable: true,
      minWidth: "140px",
      center: true,
      // style: { color: "#000" },
      selector: (row) => row.passport_number,
      conditionalCellStyles: [
        // {
        //   when: (row) =>
        //     row.passport_number === null ||
        //     row.passport_number === "" ||
        //     // row.cellular_phone_number.toString().length !== 10 ||
        //     isNaN(row.passport_number),
        //   style: {
        //     backgroundColor: "#ffff9f",
        //   },
        // },
      ],
    },
    //{
    //  name: "Passport Flag",
    //  sortable: true,
    //  minWidth: "140px",
    //  // style: { color: "#000" },
    //  selector: (row) => row.passport_flag,
    //},
    {
      name: "First Name",
      sortable: true,
      minWidth: "140px",
      center: true,
      selector: (row) => row.first_name,
      conditionalCellStyles: [
        {
          when: (row) => row.first_name === null || row.first_name.length <= 1,
          style: {
            backgroundColor: "#ffff9f",
          },
        },
      ],
    },

    {
      name: "Last Name",
      sortable: true,
      minWidth: "140px",
      center: true,
      selector: (row) => row.last_name,
      conditionalCellStyles: [
        {
          when: (row) => row.last_name === null || row.last_name.length <= 1,
          style: {
            backgroundColor: "#ffff9f",
          },
        },
      ],
    },

    {
      name: "Email Address",
      sortable: true,
      minWidth: "250px",
      center: true,
      selector: (row) => row.email_address_1,
      conditionalCellStyles: [
        {
          when: (row) => row.status === 1,
          style: {
            backgroundColor: "#ffff9f",
          },
        },
      ],
    },
  
    {
      name: "Cellular Phone Number",
      sortable: true,
      minWidth: "140px",
      center: true,
      selector: (row) => row.cellular_phone_number,
      conditionalCellStyles: [
        {
          when: (row) =>
            row.cellular_phone_number === null ||
            row.cellular_phone_number === "" ||
            row.cellular_phone_number.toString().length !== 10 ||
            isNaN(row.cellular_phone_number),
          style: {
            backgroundColor: "#ffff9f",
          },
        },
      ],
    },

  ]

  const dataToRender = () => {
   
    if (store.allData.length > 0) {
      return store.allData
    } else if (store.allData == []) {
      return []
    }

  }

  const customStyles = {
    rows: {
      style: {
        maxHeight: "1px",
      },
    },
  }

  useEffect(() => {
    if (show1) {
      setUser(defaultValues)
    }
  }, [show1])

  const onCreateHandler = () => {
    dispatch(addUser(user))
    reset()
    setShow1(false)
  }

  const onUpdateHandler = async () => {
    const payload = {
      // invoice_date: user.invoice_date,
      // invoice_number: user.invoice_number,
      account_id: user.account_id,
      id_number: user.id_number,
      // id_flag: user.id_number === checkUser.id_number ? 0 : 1,
      passport_number: user.passport_number,
      // passport_flag: user.passport_number === checkUser.passport_number ? 0 : 1,
      first_name: user.first_name,
      // name_flag: user.first_name === checkUser.first_name ? 0 : 1,
      last_name: user.last_name,
      // last_name_flag: user.last_name === checkUser.last_name ? 0 : 1,
      email_address_1: user.email_address_1,
      // email_flag: user.email_address_1 === checkUser.email_address_1 ? 0 : 1,
      cellular_phone_number: user.cellular_phone_number,
      // phone_flag:
      // user.cellular_phone_number === checkUser.cellular_phone_number ? 0 : 1,
      // vin: user.vin,
      // make: user.make,
      // model: user.model,
      // model_description: user.model_description,
      // salesperson: user.salesperson,
      // retailer: user.retailer,
      // dealer_code: user.dealer_code,
      // transaction_type: user.transaction_type,
      // dms_customer_key: user.dms_customer_key,
      customer_master_key: user.customer_master_key,
      // platform: user.platform,
      // last_updated: user.last_updated,
    }

    try {
      setLoading(true)
      const response = await dispatch(
        updateUser({ payload, id: user.customer_hash })
      )
      setLoading(false)
      if (response.error) {
        Swal.fire("Error", "This email is reserved.", "error")
        setLoading(false)
      } else {
        MySwal.fire({
          icon: "success",
          title: "Updated!",
          text: "Report Updated Successfully.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        })
      }

      setShow(false)
    } catch (error) {
      Swal.fire("Error", "There was an error while updating the user.", "error")
      setLoading(false)
    }
    editReset()
  }


  if (User.role == "Dealer") {
    UpdateData()
  }

  const UpdateData = () => {
    setCountLoader(true)
    var update = {
      method: "put",
      url: "https://rdbapi.vnvserver.com/specific/update/data",
      headers: {
        token: User.token
      },
    };


    axios(update)
      .then(function (response) {
        if (response.data.status === 200) {

          // const data = {
          //   ...response.data.data,
          //   accessToken: response.data.token,
          //   refreshToken: response.data.token,
          // };
          setUpdateCount(response.data.Update_Count)
          setCountLoader(false)
        }
      })
      .catch((error) => {
        setCountLoader(false)
        console.log(error)
      });
  }
  // axios.put('https://rdbapi.vnvserver.com/specific/update/data')
  //   .then(response => {
  //     response.data
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     // Handle the error
  //     console.error(error);
  //   });

  // const options = [
  //   { value: "All", label: "All" },
  //   { value: "Unstarted", label: "Unstarted" },
  //   { value: "Correct But Unstarted", label: "Correct But Unstarted" },
  //   { value: "started", label: "started" },
  // ]

  return (
    <Fragment>
      <Suspense
        fallback={
          <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
        }
      >
        {/* {!correctdata ? ( */}
        <>
          {/*{customLoading ? <CustLoader /> : null}*/}
          <Row className="match-height">
            {/* <Col xl="4" md="6" xs="12">
           <Earnings success={colors.success.main} />
            </Col> */}
            <Col xl="12" md="12" xs="12">
              <Statistics cols={{ xl: "4", sm: "6" }} />
            </Col>
          </Row>
          <Card>
            <CardHeader className="border-bottom" style={{ padding: "15px" }}>
              <CardTitle tag="h2" style={{ fontSize: "22px" }}>
                Data Quality Check Report<br />
                {updateCount && <h5 className="mt-1">
                  Verify Updated count :{updateCount}
                </h5>}
              </CardTitle>

              <button
                type="button"
                className="btn btn-primary"
                onClick={UpdateData}
                // onClick={() => {
                //   // setcorrectdata(true)
                // }}
                style={{ padding: "10px" }}
              >
                {countLoader ? "Loading" : "Verify Records"}
              </button>
              {/* <div
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
                  setShow1(true);
                }}
                style={{ padding: "10px" }}
              >
                Add New Report
              </button>
            </div> */}
            </CardHeader>

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
                  <h1 className="mb-1">Create New Report</h1>
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
                      setShow1(false)
                      editReset()
                      reset()
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
                  onSubmit={handleSubmit(onCreateHandler)}
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
                        htmlFor="account_id"
                      >
                        Account ID
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("account_id")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            account_id: e.target.value,
                          }))
                        }
                        placeholder="Enter Account ID"
                      />
                      <p style={{ color: "red" }}>
                        {errors.account_id?.message}
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
                        htmlFor="id_number"
                      >
                        ID Number
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("id_number")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            id_number: e.target.value,
                          }))
                        }
                        placeholder="Enter ID Number"
                      />
                      <p style={{ color: "red" }}>
                        {errors.id_number?.message}
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
                        htmlFor="invoice_number"
                      >
                        Invoice Number
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("invoice_number")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            invoice_number: e.target.value,
                          }))
                        }
                        placeholder="Enter Invoice Number"
                      />
                      <p style={{ color: "red" }}>
                        {errors.invoice_number?.message}
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
                        htmlFor="invoice_date"
                      >
                        Invoice Date
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        type="date"
                        autoComplete="off"
                        className="input form form-control"
                        {...register("invoice_date")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            invoice_date: e.target.value,
                          }))
                        }
                        placeholder="Enter Invoice Date"
                      />
                      <p style={{ color: "red" }}>
                        {errors.invoice_date?.message}
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
                        htmlFor="passport_number"
                      >
                        Passport Number
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("passport_number")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            passport_number: e.target.value,
                          }))
                        }
                        placeholder="Enter Passport Number"
                      />
                      <p style={{ color: "red" }}>
                        {errors.passport_number?.message}
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
                        htmlFor="first_name"
                      >
                        First Name
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("first_name")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            first_name: e.target.value,
                          }))
                        }
                        placeholder="Enter First Name"
                      />
                      <p style={{ color: "red" }}>
                        {errors.first_name?.message}
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
                        htmlFor="last_name"
                      >
                        Last Name
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("last_name")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            last_name: e.target.value,
                          }))
                        }
                        placeholder="Enter Last Name"
                      />
                      <p style={{ color: "red" }}>
                        {errors.last_name?.message}
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
                        htmlFor="email_address_1"
                      >
                        Email Address
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("email_address_1")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            email_address_1: e.target.value,
                          }))
                        }
                        placeholder="Enter Email Address"
                      />
                      {/*<Button
                      type="button"
                      color="primary"
                      onClick={() => {
                        validateEmail(user.email_address_1)
                      }}
                    >
                      Check Email
                    </Button>*/}
                      <p style={{ color: "red" }}>
                        {errors.email_address_1?.message}
                      </p>
                      {/*<p style={{ color: "red" }}>
                      {checkEmail == false &&
                        user.email_address_1 &&
                        "Invalid Email, Please enter correct Email address"}
                    </p>*/}
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
                        htmlFor="cellular_phone_number"
                      >
                        Cellular Phone Number
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("cellular_phone_number")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            cellular_phone_number: e.target.value,
                          }))
                        }
                        placeholder="Enter Cellular Phone Number"
                      />
                      <p style={{ color: "red" }}>
                        {errors.cellular_phone_number?.message}
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
                        htmlFor="vin"
                      >
                        VIN
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("vin")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            vin: e.target.value,
                          }))
                        }
                        placeholder="Enter VIN"
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
                        htmlFor="make"
                      >
                        Make
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("make")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            make: e.target.value,
                          }))
                        }
                        placeholder="Enter Make"
                      />
                      <p style={{ color: "red" }}>{errors.make?.message}</p>
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
                        htmlFor="model"
                      >
                        Nodel
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("model")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            model: e.target.value,
                          }))
                        }
                        placeholder="Enter Model"
                      />
                      <p style={{ color: "red" }}>{errors.model?.message}</p>
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
                        htmlFor="model_description"
                      >
                        Model Description
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("model_description")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            model_description: e.target.value,
                          }))
                        }
                        placeholder="Enter Model Description"
                      />
                      <p style={{ color: "red" }}>
                        {errors.model_description?.message}
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
                        htmlFor="salesperson"
                      >
                        Salesperson
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("salesperson")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            salesperson: e.target.value,
                          }))
                        }
                        placeholder="Enter Salesperson"
                      />
                      <p style={{ color: "red" }}>
                        {errors.salesperson?.message}
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
                        htmlFor="retailer"
                      >
                        Retailer
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("retailer")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            retailer: e.target.value,
                          }))
                        }
                        placeholder="Enter Retailer"
                      />
                      <p style={{ color: "red" }}>
                        {errors.retailer?.message}
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
                        htmlFor="dealer_code"
                      >
                        Dealer Code
                      </Label>
                    </Col>

                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("dealer_code")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            dealer_code: e.target.value,
                          }))
                        }
                        placeholder="Enter Dealer Code"
                      />
                      <p style={{ color: "red" }}>
                        {errors.dealer_code?.message}
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
                        htmlFor="transaction_type"
                      >
                        Transaction Type
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("transaction_type")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            transaction_type: e.target.value,
                          }))
                        }
                        placeholder="Enter Transaction Type"
                      />
                      <p style={{ color: "red" }}>
                        {errors.transaction_type?.message}
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
                        htmlFor="dms_customer_key"
                      >
                        DMS customer key
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("dms_customer_key")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            dms_customer_key: e.target.value,
                          }))
                        }
                        placeholder="Enter DMS Customer Key"
                      />
                      <p style={{ color: "red" }}>
                        {errors.dms_customer_key?.message}
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
                        htmlFor="customer_master_key"
                      >
                        Customer Master Key
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("customer_master_key")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            customer_master_key: Number(e.target.value),
                          }))
                        }
                        placeholder="Enter Customer Master Key"
                      />
                      <p style={{ color: "red" }}>
                        {errors.customer_master_key?.message}
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
                        htmlFor="platform"
                      >
                        Platform
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...register("platform")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            platform: e.target.value,
                          }))
                        }
                        placeholder="Enter Platform"
                      />
                      <p style={{ color: "red" }}>
                        {errors.platform?.message}
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
                          setShow1(false)
                          reset()
                          editReset()
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
                  <h1 className="mb-1">Update Data</h1>
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
                      setShow(false)
                      editReset()
                      reset()
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

              <ModalBody className=" mx-80 pb-2">
                <form
                  className="gy-1 pt-75"
                  onSubmit={handleEditSubmit(onUpdateHandler)}
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
                        htmlFor="accountId"
                      >
                        Account ID
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...editRegister("accountId")}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            account_id: e.target.value,
                          }))
                        }
                        defaultValue={user.account_id}
                        placeholder="Enter Account ID"
                        readOnly
                      />
                      {/* <p style={{ color: "red" }}>
                      {editErrors.accountId?.message}
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
                        htmlFor="idNumber"
                      >
                        ID Number
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...editRegister("idNumber")}
                        defaultValue={user ? user.id_number : ""}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            id_number: e.target.value,
                          }))
                        }
                        placeholder="Enter ID Number"
                      />

                      <p style={{ color: "red" }}>
                        {editErrors.idNumber?.message}
                      </p>
                    </Col>

                    {/* <Col md={3}>
                    <Label
                      style={{
                        marginTop: "6px",
                        fontSize: "15px",
                        color: "black",
                        alignItems: "center",
                      }}
                      className="label"
                      htmlFor="invoiceNumber"
                    >
                      Invoice Number
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("invoiceNumber")}
                      defaultValue={user.invoice_number}
                      disabled
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          invoice_number: e.target.value,
                        }))
                      }
                      placeholder="Enter Invoice Number"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.invoiceNumber?.message}
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
                      htmlFor="invoiceDate"
                    >
                      Invoice Date
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      type="date"
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("invoiceDate")}
                      defaultValue={user.invoice_date}
                      disabled
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          invoice_date: e.target.value,
                        }))
                      }
                      placeholder="Enter Invoice Date"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.invoiceDate?.message}
                    </p>
                  </Col>*/}
                    <Col md={3}>
                      <Label
                        style={{
                          marginTop: "6px",
                          fontSize: "15px",
                          color: "black",
                          alignItems: "center",
                        }}
                        className="label"
                        htmlFor="passportNumber"
                      >
                        Passport Number
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...editRegister("passportNumber")}
                        defaultValue={user.passport_number}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            passport_number: e.target.value,
                          }))
                        }
                        placeholder="Enter Passport Number"
                      />
                      <p style={{ color: "red" }}>
                        {editErrors.passportNumber?.message}
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
                        htmlFor="firstName"
                      >
                        First Name
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...editRegister("firstName")}
                        defaultValue={user.first_name}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            first_name: e.target.value,
                          }))
                        }
                        placeholder="Enter First Name"
                      />
                      <p style={{ color: "red" }}>
                        {editErrors.firstName?.message}
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
                        htmlFor="lastName"
                      >
                        Last Name
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...editRegister("lastName")}
                        defaultValue={user.last_name}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            last_name: e.target.value,
                          }))
                        }
                        placeholder="Enter Last Name"
                      />
                      <p style={{ color: "red" }}>
                        {editErrors.lastName?.message}
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
                        htmlFor="emailAddress1"
                      >
                        Email Address
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...editRegister("emailAddress1")}
                        defaultValue={user.email_address_1}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            email_address_1: e.target.value,
                          }))
                        }
                        placeholder="Enter Email Address"
                      />
                      {/*<Button
                      type="button"
                      color="primary"
                      onClick={() => {
                        validateEmail(user.email_address_1)
                      }}
                    >
                      Check Email
                    </Button>*/}
                      <p style={{ color: "red" }}>
                        {editErrors.emailAddress1?.message}
                      </p>
                      {/*<p style={{ color: "red" }}>
                      {checkEmail &&
                        "Invalid Email, Please enter correct Email address"}
                    </p>*/}
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
                        htmlFor="cellularPhoneNumber"
                      >
                        Cellular Phone Number
                      </Label>
                    </Col>
                    <Col md={9}>
                      <input
                        autoComplete="off"
                        className="input form form-control"
                        {...editRegister("cellularPhoneNumber")}
                        defaultValue={user.cellular_phone_number}
                        onChange={(e) =>
                          setUser((prevState) => ({
                            ...prevState,
                            cellular_phone_number: e.target.value,
                          }))
                        }
                        placeholder="Enter Cellular Phone Number"
                      />
                      <p style={{ color: "red" }}>
                        {editErrors.cellularPhoneNumber?.message}
                      </p>
                    </Col>

                    {/* <Col md={3}>
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
                      VIN
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("editVin")}
                      disabled
                      defaultValue={user.vin}
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          vin: e.target.value,
                        }))
                      }
                      placeholder="Enter VIN"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.editVin?.message}
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
                      htmlFor="editMake"
                    >
                      Make
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("editMake")}
                      disabled
                      defaultValue={user.make}
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          make: e.target.value,
                        }))
                      }
                      placeholder="Enter Make"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.editMake?.message}
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
                      htmlFor="editModel"
                    >
                      Nodel
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("editModel")}
                      defaultValue={user.model}
                      disabled
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          model: e.target.value,
                        }))
                      }
                      placeholder="Enter Model"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.editModel?.message}
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
                      htmlFor="modelDescription"
                    >
                      Model Description
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("modelDescription")}
                      disabled
                      defaultValue={user.model_description}
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          model_description: e.target.value,
                        }))
                      }
                      placeholder="Enter Model Description"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.modelDescription?.message}
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
                      htmlFor="salesPerson"
                    >
                      Salesperson
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("salesPerson")}
                      disabled
                      defaultValue={user.salesperson}
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          salesperson: e.target.value,
                        }))
                      }
                      placeholder="Enter Salesperson"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.salesPerson?.message}
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
                      htmlFor="editRetailer"
                    >
                      Retailer
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("editRetailer")}
                      defaultValue={user.retailer}
                      disabled
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          retailer: e.target.value,
                        }))
                      }
                      placeholder="Enter Retailer"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.editRetailer?.message}
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
                      htmlFor="dealerCode"
                    >
                      Dealer Code
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("dealerCode")}
                      defaultValue={user.dealer_code}
                      disabled
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          dealer_code: e.target.value,
                        }))
                      }
                      placeholder="Enter Dealer Code"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.dealerCode?.message}
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
                      htmlFor="transactionType"
                    >
                      Transaction Type
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("transactionType")}
                      defaultValue={user.transaction_type}
                      disabled
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          transaction_type: e.target.value,
                        }))
                      }
                      placeholder="Enter Transaction Type"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.transactionType?.message}
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
                      htmlFor="dmsCustomerKey"
                    >
                      DMS customer key
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("dmsCustomerKey")}
                      defaultValue={user.dms_customer_key}
                      disabled
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          dms_customer_key: e.target.value,
                        }))
                      }
                      placeholder="Enter DMS Customer Key"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.dmsCustomerKey?.message}
                    </p>
                  </Col> */}
                    {/* <Col md={3}>
                    <Label
                      style={{
                        marginTop: "6px",
                        fontSize: "15px",
                        color: "black
                        alignItems: "center",
                      }}
                      className="label"
                      htmlFor="customerMasterKey"
                    >
                      Customer Master Key
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("customerMasterKey")}
                      defaultValue={user.customer_master_key}
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          customer_master_key: Number(e.target.value),
                        }))
                      }
                      placeholder="Enter Customer Master Key"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.customerMasterKey?.message}
                    </p>
                  </Col> */}
                    {/* <Col md={3}>
                    <Label
                      style={{
                        marginTop: "6px",
                        fontSize: "15px",
                        color: "black",
                        alignItems: "center",
                      }}
                      className="label"
                      htmlFor="editPlatform"
                    >
                      Platform
                    </Label>
                  </Col>
                  <Col md={9}>
                    <input
                      autoComplete="off"
                      className="input form form-control"
                      {...editRegister("editPlatform")}
                      disabled
                      defaultValue={user.platform}
                      onChange={(e) =>
                        setUser((prevState) => ({
                          ...prevState,
                          platform: e.target.value,
                        }))
                      }
                      placeholder="Enter Platform"
                    />
                    <p style={{ color: "red" }}>
                      {editErrors.editPlatform?.message}
                    </p>
                  </Col> */}

                    <Col xs={12} className=" mt-2 pt-50">
                      <button
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

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // padding: "5px",
                // marginLeft: "5px",
                // marginRight: "15px",
              }}
            >
              <div
                style={{
                  // flex:1
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
                  style={{
                    padding: "4px",
                    marginTop: "10px",
                    position: "reletive",
                  }}
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
                  // flex: 1,
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
        </>
        {/* ) : (
          <Modal
            isOpen={correctdata}
            toggle={() => setcorrectdata(!correctdata)}
            className="modal-fullscreen modal-dialog-centered  p-2 mx-80"
            scrollable={true}
            size="lg"
            //fullscreen="lg"
            style={{ width: updateComponentLoading ? "100%" : "90vh" }}
          >
            <ModalBody className=" mx-100 pb-2">
              <UpdateComponent
                handleChildLoading={handleChildLoading}
                setcorrectdata={setcorrectdata}
              />
            </ModalBody>
          </Modal>
        )} */}
      </Suspense>
    </Fragment>
  )
}

export default memo(DataTableServerSide)
