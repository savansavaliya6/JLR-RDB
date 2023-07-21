import { Fragment, useState, useEffect, memo, Suspense } from "react"
import {
    getData,
} from "./store";

import { useSelector, useDispatch } from "react-redux"
import DataTable from "react-data-table-component"
import Loader from "react-js-loader"
import axios from "axios"
import Select from "react-select";
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
import ReactPaginate from "react-paginate";
import x_coordinate from "../../assets/imgs/x-coordinate.png";


const VehicleReports = () => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state.vehicleReports);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isHovered, setIsHovered] = useState(false)
    const [correctdata, setcorrectdata] = useState()
    const [correctdata1, setcorrectdata1] = useState()
    const [listshowPopup, setListShowPopup] = useState(false);
    const [user, setUser] = useState();
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
            name: "VIN",
            minWidth: "140px",
            center: true,
            selector: (row) => row.vin,
        },
        {
            name: "Reservation Status",
            sortable: true,
            minWidth: "140px",
            center: true,

            selector: (row) => row.common_type_of_sale,
            cell: (row) => {
                let color = row.common_type_of_sale === "AAA" ? "grey" : "green"
                return <div style={{ border: "solid 0.5px", borderRadius: "5px", color: color, padding: "4px" }}>
                    {row.common_type_of_sale === "AAA" ? "Reserved" : "Available"}

                </div >
            }
        },
        {
            name: "Common Status Point Description",
            sortable: true,
            minWidth: "140px",
            center: true,
            // style: { color: "#000" },
            selector: (row) => row.common_status_point_desc,
            cell: (row) => {

                return <div style={{ textAlign: "center" }}>
                    {row.common_status_point_desc}
                </div >
            },
        },
        {
            name: "Status",
            sortable: true,
            minWidth: "140px",
            center: true,
            // style: { color: "#000" },
            selector: (row) => row.report_status,
            cell: (row) => {
                let color = ""
                if (row.report_flag === "L") {
                    color = "#ff4949"

                } else if (row.report_flag === "D") {
                    color = "#FFBA00"

                } else if (row.report_flag === "O") {
                    color = "#13ce66"
                } else if (row.report_flag === "E") {
                    color = "#1890ff"
                } else {
                    color = "#fff"
                }
                return <div>
                    <marquee scrollamount="3" style={{ border: "solid 0.5px", borderRadius: "5px", color: color, padding: "2px" }}>
                        {row.report_status}
                    </marquee>
                </div >
            },
        },
        {
            name: "Exterior Image",
            sortable: true,
            minWidth: "0px",
            style: { height: "180px" },
            // selector: (row) => row.exterior_images,

            cell: (row) => (

                <div >
                    {row.exterior_images && JSON.parse(row.exterior_images)[0] ? (
                        <img
                            src={`https://cdn.jlrsaportal.co.za/${JSON.parse(row.exterior_images)[0]}`}
                            onClick={() => { setcorrectdata(true); setUser(row); }}
                            alt='img'
                            style={{ width: "100px", height: "80px", cursor: "pointer" }}
                        />
                    ) : (
                        <img src="https://udaan.jlrsaportal.co.za/thumb/img/noavailable/no-image-stock.jpeg" alt='default img' style={{ width: "100px", height: "80px" }} />
                    )}
                    {/* <div className="mt-1 text-center">
                        <button type="button"
                            className="btn btn-outline-primary" onClick={() => { setcorrectdata(true); setUser(row); }}>
                            View
                        </button>
                    </div> */}
                </div>
            ),
            selector: (row) => row.exterior_images,
        },

        {
            name: "Interior Image",
            sortable: true,
            minWidth: "140px",
            center: true,
            cell: (row) => (
                <div >
                    {row.interior_images && JSON.parse(row.interior_images)[0] ? (
                        <img
                            src={`https://cdn.jlrsaportal.co.za/${JSON.parse(row.interior_images)[0]}`}
                            onClick={() => { setcorrectdata1(true); setUser(row); }}
                            alt='img'
                            style={{ width: "100px", height: "80px", cursor: "pointer" }}
                        />
                    ) : (
                        <img src="https://udaan.jlrsaportal.co.za/thumb/img/noavailable/no-image-stock.jpeg" alt='default img' style={{ width: "100px", height: "80px" }} />
                    )}
                    {/* <div className="mt-1 text-center">
                        <button type="button"
                            className="btn btn-outline-primary" onClick={() => { setcorrectdata1(true); setUser(row); }}>
                            View
                        </button>
                    </div> */}
                </div>

            ),
            selector: (row) => row.interior_images,
        },

        {
            name: "Color Description",
            sortable: true,
            minWidth: "140px",
            center: true,
            selector: (row) => row.colour_desc,
        },

        {
            name: "Trim Description",
            sortable: true,
            minWidth: "140px",
            center: true,

            selector: (row) => row.trim_desc,

        },

        {
            name: "Brand",
            sortable: true,
            minWidth: "140px",
            center: true,

            selector: (row) => row.brand,

        },

        {
            name: "Model Name",
            sortable: true,
            minWidth: "140px",
            center: true,

            selector: (row) => row.jlr_model_name,

        },



        {
            name: " Option Price",
            sortable: true,
            minWidth: "140px",
            center: true,

            selector: (row) => row.option_price ? `${formatToSA(row.option_price)}` : "--",
        },

        {
            name: " Delivery Price",
            sortable: true,
            minWidth: "140px",
            center: true,

            selector: (row) => row.Delivery_Price ? `${formatToSA(row.Delivery_Price)}` : "--",
        },
        {
            name: "Base Price",
            sortable: true,
            minWidth: "140px",
            center: true,

            selector: (row) => row.base_price ? `${formatToSA(row.base_price)}` : "--",

        },
        {
            name: "Build URL",
            sortable: true,
            minWidth: "140px",
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

    ]

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px', // Adjust this value to increase/decrease the cell height
            },
        },
    }
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


    const dataToRender = () => {
        // const filters = {
        //     q: searchValue,
        // };

        // const isFiltered = Object.keys(filters).some(function (k) {
        //     return filters[k].length > 0;
        // });

        if (store.allData.length > 0) {
            return store.allData;
        } else if (store.allData.length === 0) {
            return [];
        }
        else {
            return []
        }
    };
    const CustomLoader = () => (
        <div style={{ padding: "24px" }}>
            <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
        </div>
    )
    // const handleSearchRoleValue = async (value) => {
    //     setRoleSearchValue(`${value ? value.label : ""}`);
    //     setLoading(true);
    //     {
    //         value && value.label
    //             ? await dispatch(
    //                 getDropdownValue({
    //                     page: 1,
    //                     perPage: rowsPerPage,
    //                     role: value.value,
    //                     land_rover_retailer: lrSearchValue,
    //                     jaguar_retailer: jgSearchValue,
    //                 })
    //             )
    //             : await dispatch(
    //                 getData({
    //                     page: currentPage,
    //                     perPage: rowsPerPage,
    //                     q: searchValue,
    //                 })
    //             );
    //         setLoading(false);
    //     }
    // };

    // model image css
    const styles = {
        padding: '0px',
        marginRight: '12px',
        boxShadow: [
            '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            '0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        ].join(', '),
        maxHeight: "150px",

    };
    return (
        <Fragment>
            <Suspense
                fallback={
                    <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
                }
            >
                <>
                    <Card>
                        <CardHeader className="border-bottom" style={{ padding: "15px" }}>
                            <CardTitle tag="h2" style={{ fontSize: "22px" }}>
                                Vehicle Reports
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
                                    // flex: 1,
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
                                    style={{ padding: "4px", marginTop: "10px", width: "40px" }}
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
                                        width: "200px"
                                    }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <Loader type="spinner-default" bgColor={"#42b983"} size={60} />
                        ) : (
                            <div className="react-dataTable mt-1">
                                <DataTable
                                    noHeader
                                    pagination
                                    paginationServer
                                    className="react-dataTable"
                                    columns={columns}
                                    // sortIcon={<ChevronDown size={10} />}
                                    paginationComponent={CustomPagination}
                                    data={dataToRender()}
                                    // progressPending={pending}
                                    progressComponent={<CustomLoader />}
                                    customStyles={customStyles}
                                    fixedHeader
                                    highlightOnHover
                                />
                            </div>
                        )}

                        {/* Exterio image view model */}
                        <Modal
                            isOpen={correctdata}
                            toggle={() => setcorrectdata(!correctdata)}
                            className="modal-xl modal-dialog-centered  p-2 mx-80"
                            scrollable={true}
                        // size="lg"
                        //fullscreen="lg"
                        // style={{ width: "90vh", backgroundColor: 'red' }}
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
                                        marginTop: "10px",
                                        marginLeft: "2rem",
                                    }}
                                >
                                    <h1 className="mb-1" style={{ color: "#000" }}>
                                        Exterior Image
                                    </h1>
                                </div>
                                <div
                                    style={{
                                        alignItems: "flex-end",
                                        justifyContent: "flex-end",
                                        marginRight: "2rem",
                                        marginTop: "10px",
                                    }}
                                >
                                    <img
                                        src={x_coordinate}
                                        alt="Image description"
                                        height={"25"}
                                        width={"25"}
                                        onClick={() => setcorrectdata(!correctdata)}
                                        style={{
                                            padding: isHovered ? "3px" : "2px",
                                            backgroundColor: isHovered ? "#f2f2f2" : "transparent",
                                        }}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    />
                                </div>
                            </div>

                            <ModalBody className=" mx-100 pb-2">

                                <table class="table table-bordered">
                                    <tr>
                                        <th>Vin Number</th>
                                        <th><h5> {user && user.vin}</h5> </th>
                                    </tr>

                                    <tr>
                                        <th style={{ minWidth: '120px' }}>Exterior Image</th>
                                        <td>
                                            {user && JSON.parse(user.exterior_images).map((item) => (
                                                <>

                                                    <img src={`https://cdn.jlrsaportal.co.za/${item}`} alt='img'
                                                        className="mb-1" style={styles} />
                                                </>
                                            ))}
                                        </td>
                                    </tr>
                                </table>
                                {/* <button className='btn-close' color='none'></button> */}


                                {/* <UpdateComponent
                                    handleChildLoading={handleChildLoading}
                                    setcorrectdata={setcorrectdata}
                                /> */}
                            </ModalBody>
                        </Modal>

                        {/* Interio image view model */}
                        <Modal
                            isOpen={correctdata1}
                            toggle={() => setcorrectdata1(!correctdata1)}
                            className="modal-lg modal-dialog-centered  p-2 mx-80"
                            scrollable={true}
                        // size="lg"
                        //fullscreen="lg"
                        // style={{ width: "90vh", backgroundColor: 'red' }}
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
                                        marginTop: "10px",
                                        marginLeft: "2rem",
                                    }}
                                >
                                    <h1 className="mb-1" style={{ color: "#000" }}>
                                        Interior Image
                                    </h1>
                                </div>
                                <div
                                    style={{
                                        alignItems: "flex-end",
                                        justifyContent: "flex-end",
                                        marginRight: "2rem",
                                        marginTop: "10px",
                                    }}
                                >
                                    <img
                                        src={x_coordinate}
                                        alt="Image description"
                                        height={"30"}
                                        width={"30"}
                                        onClick={() => setcorrectdata1(!correctdata1)}
                                        style={{
                                            padding: isHovered ? "2px" : "1px",
                                            backgroundColor: isHovered ? "#f2f2f2" : "transparent",
                                        }}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    />
                                </div>
                            </div>

                            <ModalBody className=" mx-100 pb-2">

                                <table class="table table-bordered">
                                    <tr>
                                        <th>Vin Number</th>
                                        <th><h5> {user && user.vin}</h5> </th>
                                    </tr>

                                    <tr>
                                        <th style={{ minWidth: '120px' }}>Interior Image</th>
                                        <td>
                                            {user && JSON.parse(user.interior_images).map((item) => (
                                                <>

                                                    <img src={`https://cdn.jlrsaportal.co.za/${item}`} alt='img'
                                                        className="mb-1" style={styles} />
                                                </>
                                            ))}
                                        </td>
                                    </tr>
                                </table>
                            </ModalBody>
                        </Modal>
                    </Card>
                </>
            </Suspense>
        </Fragment >
    )
}

export default VehicleReports