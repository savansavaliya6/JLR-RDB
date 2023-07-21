import { Fragment, useState, useEffect, memo, Suspense } from "react"
import * as yup from "yup"
import Select from "react-select"
import axios from "axios"
import Loader from "react-js-loader"
import { useSelector, useDispatch } from "react-redux"
import ReactPaginate from "react-paginate"
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
import DataTable from "react-data-table-component"
import { getData, updateUser } from "./updateStore"
import CustLoader from "./CustLoader"
import { Star, Edit, X, Check, AlignCenter } from "react-feather"
import { flexbox } from "@chakra-ui/react"
const UpdateComponent = ({ setcorrectdata, handleChildLoading }) => {
  const [selectedOption, setSelectedOption] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [pending, setPending] = useState(true)
  const [loading, setLoading] = useState(false)

  const [isActive, setIsActive] = useState([])
  const [inputValue, setInputValue] = useState({})
  const [updatePayload, setUpdatePayload] = useState([])
  const [indexes, setIndexes] = useState([])
  // const [customLoading, setCustomLoading] = useState(false);
  const dispatch = useDispatch()
  const store = useSelector((state) => state.updateReport)
  const count = store.total || 1
  const [toggle, setToggle] = useState("value")

  useEffect(() => {
    handleChildLoading(loading)
  }, [loading])

  useEffect(() => {
    setLoading(true)
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        search: selectedOption,
      })
    )
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [currentPage, rowsPerPage, selectedOption])

  useEffect(() => {
    if (store.allData.length > 0) {
      setLoading(true)
      let obj = []
      for (let x = 0; x < store.allData.length; x++) {
        obj.push({ isActive: false })
      }
      setIsActive(obj)
      setLoading(false)
    }
  }, [store])

  const options = [
    { value: "all", label: "All" },
    { value: "unstared", label: "Unstared" },
    { value: "correct_but_notstared", label: "Correct But Unstared" },
    { value: "stared", label: "stared" },
  ]

  const handleClick = (i, row) => {
    setIsActive((prevState) => [
      ...prevState,
      (isActive[i].isActive = !isActive[i].isActive),
    ])
    setInputValue(row)
  }

  const handleRight = (i) => {
    setIsActive((prevState) => [
      ...prevState,
      (isActive[i].isActive = !isActive[i].isActive),
    ])
    setUpdatePayload((prevState) => [...prevState, inputValue])
    let index = store.allData.findIndex(
      (x) => x.customer_hash === inputValue.customer_hash
    )
    setIndexes((prevState) => [...prevState, index])
    setInputValue({})
  }
  const handleCancel = (i) => {
    setIsActive((prevState) => [
      ...prevState,
      (isActive[i].isActive = !isActive[i].isActive),
    ])
    setInputValue({})
  }

  const handleChange = (event) => {
    setInputValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }
  // multiple update field
  const handleSubmit = () => {
    console.log(updatePayload)
    setLoading(true)
    dispatch(updateUser(updatePayload))
    setLoading(false)
  }

  const handleUpdatedRow = (row, i) => {
    if (indexes.includes(i)) {
      return updatePayload.filter(
        (item) => item.customer_hash == row.customer_hash
      )
    }
  }

  const columns = [
    {
      name: "",
      minWidth: "100px",
      center: true,
      cell: (row, i) => (
        <div className="column-action d-flex align-items-center justify-content-center">
          {!isActive[i].isActive ? (
            <Edit
              size={17}
              // alignItems="center"

              // color={
              //     row.status == 1 ||
              //         row.id_number === null ||
              //         row.id_number === "" ||
              //         row.id_number.toString().length !== 13 ||
              //         isNaN(row.id_number) ||
              //         row.passport_number === null ||
              //         row.passport_number === "" ||
              //         // row.cellular_phone_number.toString().length !== 10 ||
              //         isNaN(row.passport_number) ||
              //         row.first_name === null ||
              //         row.first_name.length <= 1 ||
              //         row.last_name === null ||
              //         row.last_name.length <= 1 ||
              //         row.cellular_phone_number === null ||
              //         row.cellular_phone_number === "" ||
              //         row.cellular_phone_number.toString().length !== 10 ||
              //         isNaN(row.cellular_phone_number)
              //         ? "red"
              //         : "black"
              // }
              className="cursor-pointer me-1"
              // onChange={handleChange}
              // onBlur={handleBlur}

              // onClick={() => setToggle(!toggle)}
              onClick={() => handleClick(i, row)}
            />
          ) : (
            <>
              <Check
                size={17}
                color="green"
                className="cursor-pointer me-1"
                onClick={() => handleRight(i)}
              />
              <X
                size={17}
                color="red"
                className="cursor-pointer me-1"
                onClick={() => handleCancel(i)}
              />
            </>
          )}
        </div>
      ),
    },

    {
      name: "",
      minWidth: "80px",
      center: true,
      cell: (row) => (
        <div className="column-action d-flex align-items-center justify-content-center">
          <Star
            size={17}
            color={"orange"}
            // alignItems="center"

            // color={
            //     row.status == 1 ||
            //         row.id_number === null ||
            //         row.id_number === "" ||
            //         row.id_number.toString().length !== 13 ||
            //         isNaN(row.id_number) ||
            //         row.passport_number === null ||
            //         row.passport_number === "" ||
            //         // row.cellular_phone_number.toString().length !== 10 ||
            //         isNaN(row.passport_number) ||
            //         row.first_name === null ||
            //         row.first_name.length <= 1 ||
            //         row.last_name === null ||
            //         row.last_name.length <= 1 ||
            //         row.cellular_phone_number === null ||
            //         row.cellular_phone_number === "" ||
            //         row.cellular_phone_number.toString().length !== 10 ||
            //         isNaN(row.cellular_phone_number)
            //         ? "red"
            //         : "black"
            // }
            className="cursor-pointer me-1 "
            type="button"
            onClick={() => {
              // setUser(row);
              console.log("correct data")
              // // setCheckUser(row);
              // setShow(true);
            }}
          />
        </div>
      ),
    },

    {
      name: "Id Number",
      sortable: true,
      minWidth: "300px",
      center: true,
      // style: { color: "#000" },
      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)
        return (
          <Fragment>
            {isActive[i].isActive ? (
              <>
                <input
                  type="text"
                  id="inputField"
                  className="input "
                  placeholder="Enter Id Number"
                  name="id_number"
                  value={inputValue.id_number}
                  onChange={(e) => handleChange(e)}
                />
              </>
            ) : (
              <label>
                {Array.isArray(updatedRow)
                  ? updatedRow[0].id_number
                  : row.id_number}
              </label>
            )}
            {/* <p style={{ color: "red" }}>required</p> */}
          </Fragment>
        )
      },
    },
    {
      name: "Account ID",
      sortable: true,
      minWidth: "300px",
      center: true,
      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)

        return (
          <Fragment>
            {isActive[i].isActive ? (
              <input
                type="text"
                className="input "
                placeholder="Enter Account ID "
                name="account_id"
                value={inputValue.account_id}
                onChange={handleChange}
              />
            ) : (
              <label>
                {Array.isArray(updatedRow)
                  ? updatedRow[0].account_id
                  : row.account_id}
              </label>
            )}
          </Fragment>
        )
      },
    },
    {
      name: "Passport Number",
      sortable: true,
      minWidth: "300px",

      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)

        return (
          <Fragment>
            {isActive[i].isActive ? (
              <input
                type="text"
                className="input "
                placeholder="Enter Passport Number"
                name="passport_number"
                value={inputValue.passport_number}
                onChange={handleChange}
              />
            ) : (
              <label>
                {Array.isArray(updatedRow)
                  ? updatedRow[0].passport_number
                  : row.passport_number}
              </label>
            )}
          </Fragment>
        )
      },
    },

    {
      name: "Email Address",
      sortable: true,
      minWidth: "300px",
      center: true,

      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)

        return (
          <Fragment>
            {isActive[i].isActive ? (
              <input
                type="text"
                className="input "
                placeholder="Enter Email Address"
                name="email_address_1"
                value={inputValue.email_address_1}
                onChange={handleChange}
              />
            ) : (
              <label>
                {Array.isArray(updatedRow)
                  ? updatedRow[0].email_address_1
                  : row.email_address_1}
              </label>
            )}
          </Fragment>
        )
      },
    },

    {
      name: "First Name",
      sortable: true,
      minWidth: "300px",
      center: true,

      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)

        return (
          <Fragment>
            {isActive[i].isActive ? (
              <input
                type="text"
                className="input "
                placeholder="Enter First Name"
                name="first_name"
                value={inputValue.first_name}
                onChange={handleChange}
              />
            ) : (
              <label>
                {Array.isArray(updatedRow)
                  ? updatedRow[0].first_name
                  : row.first_name}
              </label>
            )}
          </Fragment>
        )
      },
    },

    {
      name: "Last Name",
      sortable: true,
      minWidth: "300px",
      center: true,

      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)

        return (
          <Fragment>
            {isActive[i].isActive ? (
              <input
                type="text"
                className="input "
                placeholder="Enter Last Name"
                name="last_name"
                value={inputValue.last_name}
                onChange={handleChange}
              />
            ) : (
              <label>
                {Array.isArray(updatedRow)
                  ? updatedRow[0].last_name
                  : row.last_name}
              </label>
            )}
          </Fragment>
        )
      },
    },

    {
      name: "Cellular Phone Number",
      sortable: true,
      minWidth: "300px",
      center: true,

      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)

        return (
          <Fragment>
            {isActive[i].isActive ? (
              <input
                type="text"
                className="input "
                placeholder="Enter Phone Number"
                name="cellular_phone_number"
                value={inputValue.cellular_phone_number}
                onChange={handleChange}
              />
            ) : (
              <label>
                {updatedRow
                  ? updatedRow.cellular_phone_number
                  : row.cellular_phone_number}
              </label>
            )}
          </Fragment>
        )
      },
    },
    {
      name: "Customer Master Key",
      sortable: true,
      minWidth: "300px",
      center: true,

      cell: (row, i) => {
        const updatedRow = handleUpdatedRow(row, i)

        return (
          <Fragment>
            {isActive[i].isActive ? (
              <input
                type="text"
                className="input "
                placeholder="Enter Customer Master Key"
                name="customer_master_key"
                value={inputValue.customer_master_key}
                onChange={handleChange}
              />
            ) : (
              <label>
                {updatedRow
                  ? updatedRow.customer_master_key
                  : row.customer_master_key}
              </label>
            )}
          </Fragment>
        )
      },
    },
  ]
  const customStyles = {
    rows: {
      style: {
        maxHeight: "1px",
      },
    },
  }

  const dataToRender = () => {
    // const filters = {
    //   q: searchValue,
    // };

    // const isFiltered = Object.keys(filters).some(function (k) {
    //   return filters[k].length > 0;
    // });

    if (store.allData.length > 0) {
      return store.allData
    } else {
      return []
    }
  }
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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
  // const CustomLoader = () => (
  //     <div style={{ padding: "24px" }}>
  //         <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
  //     </div>
  // );
  useEffect(() => {
    const timeout = setTimeout(() => {
      // setUser(user);
      setPending(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <div>
      <Row>
        <Card>
          <Col
            className="pt-1"
            style={{
              display: "flex",
              justifyContent: " space-between",
              zIndex: "99",
            }}
          >
            <div style={{ width: "180px" }}>
              <Select
                isClearable={true}
                isSearchable={true}
                placeholder="Filter By"
                onChange={(selectedOption) =>
                  setSelectedOption(selectedOption.value)
                }
                className="basic-single"
                classNamePrefix="select"
                options={options}
              />
            </div>
            <button
              style={{
                padding: "10px",
                textAlign: "center",
              }}
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setIsActive([])
                setInputValue({})
                setUpdatePayload([])
                setIndexes([])
                setcorrectdata(false)
              }}
            >
              Go back
            </button>
          </Col>

          {loading ? (
            <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
          ) : (
            <div className="react-dataTable mt-2">
              <DataTable
                noHeader
                pagination
                paginationServer
                className="react-dataTable"
                columns={columns}
                // sortIcon={<ChevronDown size={10} />}
                paginationComponent={CustomPagination}
                data={dataToRender()}
                //progressPending={pending}
                // progressComponent={<CustomLoader />}
                customStyles={customStyles}
                fixedHeader
                highlightOnHover
              />
            </div>
          )}
          {/* <button style={{
                        padding: "10px",
                        width: "8%",
                        textAlign: 'center',


                    }}
                        type="button"
                        className="btn btn-primary mb-1 mt-1"
                        onClick={() => {
                            // setcorrectdata(false);
                        }}
                    >
                        Correct All
                    </button> */}
          <div>
            <button
              style={{
                padding: "10px",
                textAlign: "center",
              }}
              type="button"
              className="btn btn-primary mb-1 mt-1"
              onClick={() => handleSubmit()}
            >
              Correct All
            </button>
          </div>
        </Card>
      </Row>
    </div>
  )
}

export default UpdateComponent
