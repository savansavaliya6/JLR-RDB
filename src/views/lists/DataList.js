// ** React Imports
import { Fragment, useState, useEffect, memo, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

// ** Store & Actions
import { getData, deleteUser, updateUser, addUser } from "./store";
import { useSelector, useDispatch } from "react-redux";

import ReactPaginate from "react-paginate";
import { ChevronDown, Eye, Edit, Trash } from "react-feather";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import Loader from "../../components/reusable/Loader";
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
import * as yup from "yup";

const MySwal = withReactContent(Swal);

const DataTableServerSide = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.datatables);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [contact_no, setContact_No] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [userName, setUserName] = useState("");
  const [chart, setChart] = useState("");
  const [year, setYear] = useState("");
  const SignupSchema = yup.object().shape({
    UserName: yup.string().min(3).required("Please enter your UserName."),
    lastName: yup.string().min(3).required("Please enter your lastName."),
    email: yup.string().email().required("Please enter your email."),
    password: yup.string().min(6).required("Please enter your password."),
    contact_no: yup.string().min(10).required("Please enter your contact_no."),
  });
  const [user, setUser] = useState({
    userName: "monika",
    chart: "pie",
    year: "2023",
  });
  const defaultValues = {
    id: user.id,
    userName: user.userName,
    chart: user.chart,
    year: user.year,
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) });

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    );
  }, [dispatch]);

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value);

    dispatch(
      getData({
        page: store.total > 1 ? 1 : store.total,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    );
  };

  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    dispatch(
      getData({
        page: store.total > 1 ? 1 : store.total,
        perPage: rowsPerPage,
        q: e.target.value,
      })
    );
    setCurrentPage(page.selected + 1);
  };
  // setSearchValue;
  // ** Function to handle per page
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

  // ** Custom Pagination
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
      name: "ID",
      sortable: true,
      maxWidth: "100px",
      selector: (row) => row.id,
    },
    {
      name: "User Name",
      sortable: true,
      minWidth: "225px",
      selector: (row) => row.userName || "--",
    },
    {
      name: "Chart",
      sortable: true,
      minWidth: "225px",
      selector: (row) => row.chart || "--",
    },
    {
      name: "Year",
      sortable: true,
      minWidth: "225px",
      selector: (row) => row.year || "--",
    },

    {
      name: "Action",
      minWidth: "110px",
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Edit
            size={17}
            className="cursor-pointer me-1"
            id={`edit-tooltip-${row.id}`}
            onClick={() => {
              //   setUser(row);
              //   setShow(true);
              navigate("/database/report", { replace: true });
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`edit-tooltip-${row.id}`}
          >
            Edit List
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
            Preview List
          </UncontrolledTooltip>
          <Trash
            size={17}
            className="cursor-pointer"
            id={`trash-tooltip-${row.id}`}
            onClick={(e) => {
              e.preventDefault();
              var sweet_loader =
                '<div className="sweet_loader"><svg viewBox="0 0 140 140" width="140" height="140"><g class="outline"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="rgba(0,0,0,0.1)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></g><g class="circle"><path d="m 70 28 a 1 1 0 0 0 0 84 a 1 1 0 0 0 0 -84" stroke="#71BBFF" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dashoffset="200" stroke-dasharray="300"></path></g></svg></div>';
              return MySwal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-outline-danger ms-1",
                },
                buttonsStyling: false,
              }).then(function (result) {
                dispatch(deleteUser(row.id));
                MySwal.fire({
                  icon: "success",
                  title: "Deleted!",
                  text: "List Deleted Successfully.",
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                });
              });
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`trash-tooltip-${row.id}`}
          >
            Delete List
          </UncontrolledTooltip>
        </div>
      ),
    },
  ];
  // ** Table data to render
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
    userName: userName,
    chart: chart,
    year: year,
  };

  const onSubmit1 = () => {
    if (
      UserName.length > 3 &&
      lastName.length > 3 &&
      contact_no.length > 9 &&
      password.length > 5 &&
      email.length > 0
    ) {
      const data = dispatch(addUser(userValues));
      // console.log(data);
      toast.success("Form Submitted Successfully!");
      setShow1(false);
      clearState();
    }
    SignupSchema;
  };

  const clearState = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setContact_No("");

    // console.log("All state cleared");
  };

  const onSubmit = (data) => {
    // dispatch(updateUser(defaultValues));
    // MySwal.fire({
    //   icon: "success",
    //   title: "Updated!",
    //   text: "List Updated Successfully.",
    //   customClass: {
    //     confirmButton: "btn btn-success",
    //   },
    // });
    // setShow(false);
  };

  return (
    <Fragment>
      <Modal
        isOpen={show1}
        toggle={() => setShow1(!show1)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow1(!show1)}
        />
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Update Data</h1>
          </div>
          <form className="gy-1 pt-75" onSubmit={handleSubmit(onSubmit1)}>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" color="secondary" className="me-1" outline>
                Submit
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => setShow1(false)}
              >
                Discard
              </Button>
            </Col>
          </form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)} />
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit Data</h1>
            <p>Updating List details will receive a privacy audit.</p>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="UserName">
                User Name
              </Label>
              <Input
                id="UserName"
                value="username"
                onChange={(val) => (defaultValues.Username = val.target.value)}
                placeholder={defaultValues.Username}
              />
              {errors.UserName && (
                <FormFeedback>Please enter a valid User name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="chart">
                Chart
              </Label>
              <Input
                id="chart"
                value="chart"
                onChange={(val) => (defaultValues.chart = val.target.value)}
                placeholder={defaultValues.chart}
              />
              {errors.chart && (
                <FormFeedback>Please enter a valid chart</FormFeedback>
              )}
            </Col>
            <Col xs={12}>
              <Label className="form-label" for="year">
                Year
              </Label>
              <Input
                id="year"
                value="2023"
                onChange={(val) => (defaultValues.year = val.target.value)}
                placeholder={defaultValues.year}
              />
              {errors.year && (
                <FormFeedback>Please enter a valid year</FormFeedback>
              )}
            </Col>

            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                Submit
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => setShow(false)}
              >
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      <Suspense fallback={<Loader />}>
        <Card>
          <CardHeader className="border-bottom">
            <CardTitle tag="h4">Data List</CardTitle>
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
                // onClick={functionTwo}
                onClick={() => {
                  //   setUser(row);
                  setShow1(true);
                }}
              >
                Add New User
              </button>
            </div>
          </CardHeader>
          <Row className="mx-0 mt-1 mb-50">
            <Col sm="6">
              <div className="d-flex align-items-center">
                <Label for="sort-select">show</Label>
                <Input
                  className="dataTable-select"
                  type="select"
                  id="sort-select"
                  value={rowsPerPage}
                  onChange={(e) => handlePerPage(e)}
                >
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={75}>75</option>
                  <option value={100}>100</option>
                </Input>
                <Label for="sort-select">entries</Label>
              </div>
            </Col>
            <Col
              className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
              sm="6"
            >
              <Label className="me-1" for="search-input">
                Search
              </Label>
              <Input
                className="dataTable-filter"
                type="text"
                bsSize="sm"
                id="search-input"
                value={searchValue}
                onChange={handleFilter}
              />
            </Col>
          </Row>
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
            />
          </div>
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
