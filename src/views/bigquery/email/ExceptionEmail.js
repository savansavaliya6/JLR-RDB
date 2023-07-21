import { Fragment, useState, useEffect, memo, Suspense } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  //getDropdownValue,
  getData,
  deleteUser,
  updateUser,
  addUser,
} from "./store"
import { useSelector, useDispatch } from "react-redux"
import ReactPaginate from "react-paginate"
import { ChevronDown, Eye, Edit, Trash } from "react-feather"
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
import CustLoader from "./custLoader"

const MySwal = withReactContent(Swal)

const DataTableServerSide = () => {
  const dispatch = useDispatch()
  const store = useSelector((state) => state.exceptionEmail)

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
  const [user, setUser] = useState({
    id: "",
    email_address_1: "",
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
    id: user.id,
    email_address_1: user.email_address_1,
  }

  const defaultValuesForEdit = {
    id: user.id,
    email_address_1: user.email_address_1,
  }

  // email validation
  //const validateEmail = async (email) => {
  //  if (email) {
  //    try {
  //      const myHeaders = new Headers()
  //      myHeaders.append("apikey", "k4B2JCRck2bYgKgXXRNN42i5F2Fmv6zG")

  //      const requestOptions = {
  //        method: "GET",
  //        redirect: "follow",
  //        headers: myHeaders,
  //      }

  //      const response = await fetch(
  //        `https://api.apilayer.com/email_verification/check?email=${email}`,
  //        requestOptions
  //      )

  //      const data = await response.json()
  //      if (data.format_valid && data.smtp_check) {
  //        setCustomLoading(false)
  //        setCheckEmail(true)
  //        return true
  //      } else {
  //        setCustomLoading(false)

  //        return false
  //      }
  //    } catch (error) {
  //      setCustomLoading(false)

  //      console.log("Error occurred during email validation:", error)
  //      return false
  //    }
  //  } else {
  //    setCustomLoading(false)

  //    return false
  //  }
  //}

  const SignupSchema = yup.object().shape({
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
  })

  const editSchema = yup.object().shape({
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
      minWidth: "90px",
      cell: (row) => (
        <div className="column-action d-flex align-items-center justify-content-center">
          <Edit
            size={17}
            className="cursor-pointer me-1"
            id={`edit-tooltip-${row.id}`}
            onClick={() => {
              setUser(row)
              setCheckUser(row)
              setShow(true)
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`edit-tooltip-${row.id}`}
          >
            Edit Email
          </UncontrolledTooltip>

          <Trash
            size={17}
            className="cursor-pointer"
            id={`trash-tooltip-${row.id}`}
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
                    await dispatch(deleteUser(row.id))
                    Swal.fire("Deleted!", "Email has been deleted.", "success")
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
      name: "Email Address",
      sortable: true,
      minWidth: "140px",
      // style: { color: "#000" },
      selector: (row) => (
        <div style={{ textAlign: "center" }}>{row.email_address_1}</div>
      ),
    },
  ]

  const dataToRender = () => {
    // const filters = {
    //   q: searchValue,
    // };

    // const isFiltered = Object.keys(filters).some(function (k) {
    //   return filters[k].length > 0;
    // });

    if (store.allData.length > 0) {
      return store.allData
    } else if (store.allData === 0) {
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
    dispatch(addUser({ email_address_1: user.email_address_1 }))
    reset()
    setShow1(false)
  }

  const onUpdateHandler = async () => {
    const payload = {
      id: user.id,
      email_address_1: user.email_address_1,
    }

    try {
      setLoading(true)
      const response = await dispatch(updateUser(payload))
      setLoading(false)
      if (response.error) {
        Swal.fire(
          "Error",
          "There was an error while updating the email.",
          "error"
        )
        setLoading(false)
      } else {
        MySwal.fire({
          icon: "success",
          title: "Updated!",
          text: "Email Updated Successfully.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        })
      }

      setShow(false)
    } catch (error) {
      Swal.fire(
        "Error",
        "There was an error while updating the email.",
        "error"
      )
      setLoading(false)
    }
    editReset()
  }

  return (
    <Fragment>
      <Suspense
        fallback={
          <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
        }
      >
        {customLoading ? <CustLoader /> : null}
        <Card>
          <CardHeader className="border-bottom" style={{ padding: "15px" }}>
            <CardTitle tag="h2" style={{ fontSize: "22px" }}>
              Data Quality Check Report
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
                Add New Email
              </button>
            </div>
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
                <h1 className="mb-1">Create New Email</h1>
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
                <h1 className="mb-1">Edit Report</h1>
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

            <ModalBody className=" mx-50 pb-2">
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
                      </Button>
                    */}
                    <p style={{ color: "red" }}>
                      {editErrors.emailAddress1?.message}
                    </p>
                    {/*<p style={{ color: "red" }}>
                      {checkEmail &&
                        "Invalid Email, Please enter correct Email address"}
                    </p>*/}
                  </Col>

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
          {/* <div
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
          </div> */}
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
    </Fragment>
  )
}

export default memo(DataTableServerSide)
