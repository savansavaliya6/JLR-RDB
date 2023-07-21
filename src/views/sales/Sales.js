import { Fragment, useState, useEffect, memo, Suspense } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getData, getDropdownValue, updateUser, addUser } from "./store";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { ChevronDown, Eye, Edit, Trash, AlignCenter } from "react-feather";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "react-js-loader";
import moment from "moment";
import {
  Card,
  CardHeader,
  Col,
  CardTitle,
  Modal,
  ModalBody,
  UncontrolledTooltip,
  Label,
  Input,
  Badge,
  Row,
} from "reactstrap";
import * as yup from "yup";
import axios from "axios";
import "./Sales.css";
const MySwal = withReactContent(Swal);
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import x_coordinate from "../../assets/imgs/x-coordinate.png";
import AccesoryAddModal from "./AccesoryAddModal";
import TradeInListModal from "./TradeInListModal";
import AccesoryEditModal from "./AccessoryEditModal";
import TradeInListEditModal from "./TradeInListEditModal";

const DataTableServerSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.datatables2);

  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [vin, setVin] = useState("");
  const [status, setStatus] = useState("");
  const [vista_order, setVista_order] = useState("");
  const [outcome, setOutcome] = useState("");
  const [options_price, setOptions_price] = useState("");
  const [shipping_country_code, setShipping_country_code] = useState("");
  const [shipping_city, setShipping_city] = useState("");
  const [opportunity_id, setOpportunity_id] = useState("");
  const [financed_amount, setFinanced_amount] = useState("");
  const [sales_agent, setSales_agent] = useState("");
  const [accessories_price, setAccessories_price] = useState("");
  const [sales_organization, setSales_organization] = useState("");
  const [trade_ln_list, setTrade_ln_list] = useState("");
  const [quote_number, setQuote_number] = useState("");
  const [quote_id, setQuote_id] = useState("");
  const [reason_why, setReason_why] = useState("");
  const [holding_deposit, setHolding_deposit] = useState("");
  const [grand_total, setGrand_total] = useState("");
  const [finance_bank, setFinance_bank] = useState("");
  const [description_group_id, setDescription_group_id] = useState("");
  const [discount_amount, setDiscount_amount] = useState("");
  const [delivery_price, setDelivery_price] = useState("");
  const [cash_amount, setCash_amount] = useState("");
  const [base_price, setBase_price] = useState("");
  const [actual_trade_in_amount, setActual_trade_in_amount] = useState("");

  //
  const [accessoryList, setAccessoryList] = useState([]);
  const [tradeInList, setTradeInList] = useState([]);

  //
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [tradeshowPopup, setTradeShowPopup] = useState(false);
  const [listshowPopup, setListShowPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [vehOwnSearchValue, setVehOwnSearchValue] = useState("");
  const [visitaSearchValue, setVisitaSearchValue] = useState("");
  const [pending, setPending] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userHandler = JSON.parse(sessionStorage.getItem("userRole"));
  const [addAccessoryListPopup, setAddAccessoryListPopup] = useState(false);
  const [addTradeInListPopup, setAddTradeInListPopup] = useState(false);
  const [editAccessoryListPopup, setEditAccessoryListPopup] = useState(false);
  const [editTradeInListPopup, setEditTradeInListPopup] = useState(false);

  const handleChangeFromAccessoryChild = (value) => {
    setAccessoryList(value);
  };
  const handleChangeFromTradeChild = (value) => {
    setTradeInList(value);
  };

  useEffect(() => {
    (userHandler.role === "user" || userHandler.role === "Dealer") &&
      setIsLoggedIn(true);
  }, []);

  const SignupSchema = yup.object().shape({
    vista_order: yup.string().required("Vista Order is required"),
    outcome: yup.string().required("Outcome is required"),
    options_price: yup.string().required("Options Price is required"),
    shipping_city: yup.string().required("Shipping city is required"),
    status: yup.string().required("Status is required"),
    shipping_country_code: yup
      .string()
      .required(" Shipping Country Code is required"),
    opportunity_id: yup.string().required("Opportunity ID is required"),
    financed_amount: yup.string().required("Financed Amount is required"),
    sales_agent: yup.string().required("Sales Agent is required"),
    sales_organization: yup.string().required("Sales Organization is required"),
    quote_id: yup.string().required("Quote ID is required"),
    quote_number: yup.string().required("Quote Number is required"),
    reason_why: yup.string().required("Reason Why is required"),
    holding_deposit: yup.string().required("Holding Deposit is required"),
    accessories_price: yup.string().required("Accessories Price is required"),
    grand_total: yup.string().required("Grand Total is required"),
    finance_bank: yup.string().required("Financed Bank is required"),
    description_group_id: yup
      .string()
      .required("Description Group ID is required"),
    discount_amount: yup.string().required("Discount Amount is required"),
    delivery_price: yup.string().required("Delivery Price is required"),
    cash_amount: yup.string().required("Cash Amount is required"),
    base_price: yup.string().required("Base Price is required"),
    actual_trade_in_amount: yup.string().required("Actual Trade is required"),
    //   trade_ln_list: yup
    // .string()
    // .min(3, "Trade in list is required")
    // .required("Trade in list is required"),
    // accessory_list: yup
    //   .string()
    //   .min(3, "Accessory List is required")
    //   .required("Accessory List is required"),
    // year: yup.string().min(3, "Year is required").required("Year is required"),
    // MMCode: yup
    //   .string()
    //   .min(3, "MMCode is required")
    //   .required("MMCode is required"),
    // EquityAmount: yup
    //   .string()
    //   .min(3, "Equity Amount is required")
    //   .required("Equity Amount is required"),
    // TradeInBrand: yup
    //   .string()
    //   .min(3, "Trade In Brand is required")
    //   .required("Trade In Brand is required"),
    // TradeInModel: yup
    //   .string()
    //   .min(3, "Trade In Model is required")
    //   .required("Trade In Model is required"),
    // SettlementBank: yup
    //   .string()
    //   .min(3, "Settlement Bank is required")
    //   .required("Settlement Bank is required"),
    // SettlementValue: yup
    //   .string()
    //   .min(3, "Settlement Value is required")
    //   .required("Settlement Value is required"),
    // FinalTradeInOffer: yup
    //   .string()
    //   .min(3, "Final Trade In Offer is required")
    //   .required("Final Trade In Offer is required"),
    // PurhcasingFranchise: yup
    //   .string()
    //   .min(3, "Purhcasing Franchise is required")
    //   .required("Purhcasing Franchise is required"),
    // PartCode: yup
    //   .string()
    //   .min(3, "Part Code is required")
    //   .required("Part Code is required"),
    // UnitPrice: yup
    //   .string()
    //   .min(3, "Unit Price is required")
    //   .required("Unit Price is required"),
    // Description: yup
    //   .string()
    //   .min(3, "Description is required")
    //   .required("Description is required"),
    // AccessoryType: yup
    //   .string()
    //   .min(3, "Accessory Type is required")
    //   .required("Accessory Type is required"),
    // AddedAccessory: yup
    //   .string()
    //   .min(3, "Added Accessory is required")
    //   .required("Added Accessory is required"),
  });

  const editSchema = yup.object().shape({
    editVin: yup.string().required("Vista Order is required"),
    vistaOrder: yup.string().required("Vista Order is required"),
    outCome: yup.string().required("Outcome is required"),
    optionsPrice: yup.string().required("Options Price is required"),
    shippingCity: yup.string().required("Shipping city is required"),
    editStatus: yup.string().required("Status is required"),
    shippingCountryCode: yup
      .string()
      .required(" Shipping Country Code is required"),
    opportunityId: yup.string().required("Opportunity ID is required"),
    financedAmount: yup.string().required("Financed Amount is required"),
    salesAgent: yup.string().required("Sales Agent is required"),
    salesOrganization: yup.string().required("Sales Organization is required"),
    quoteId: yup.string().required("Quote ID is required"),
    quoteNumber: yup.string().required("Quote Number is required"),
    reasonWhy: yup.string().required("Reason Why is required"),
    holdingDeposit: yup.string().required("Holding Deposit is required"),
    accessoriesPrice: yup.string().required("Accessories Price is required"),
    grandTotal: yup.string().required("Grand Total is required"),
    financeBank: yup.string().required("Financed Bank is required"),
    descriptionGroupId: yup
      .string()
      .required("Description Group ID is required"),
    discountAmount: yup.string().required("Discount Amount is required"),
    deliveryPrice: yup.string().required("Delivery Price is required"),
    cashAmount: yup.string().required("Cash Amount is required"),
    basePrice: yup.string().required("Base Price is required"),
    actualTradeInAmount: yup.string().required("Actual Trade is required"),
    //   trade_ln_list: yup
    // .string()
    // .min(3, "Trade in list is required")
    // .required("Trade in list is required"),
    // accessory_list: yup
    //   .string()
    //   .min(3, "Accessory List is required")
    //   .required("Accessory List is required"),
    // year: yup.string().min(3, "Year is required").required("Year is required"),
    // MMCode: yup
    //   .string()
    //   .min(3, "MMCode is required")
    //   .required("MMCode is required"),
    // EquityAmount: yup
    //   .string()
    //   .min(3, "Equity Amount is required")
    //   .required("Equity Amount is required"),
    // TradeInBrand: yup
    //   .string()
    //   .min(3, "Trade In Brand is required")
    //   .required("Trade In Brand is required"),
    // TradeInModel: yup
    //   .string()
    //   .min(3, "Trade In Model is required")
    //   .required("Trade In Model is required"),
    // SettlementBank: yup
    //   .string()
    //   .min(3, "Settlement Bank is required")
    //   .required("Settlement Bank is required"),
    // SettlementValue: yup
    //   .string()
    //   .min(3, "Settlement Value is required")
    //   .required("Settlement Value is required"),
    // FinalTradeInOffer: yup
    //   .string()
    //   .min(3, "Final Trade In Offer is required")
    //   .required("Final Trade In Offer is required"),
    // PurhcasingFranchise: yup
    //   .string()
    //   .min(3, "Purhcasing Franchise is required")
    //   .required("Purhcasing Franchise is required"),
    // PartCode: yup
    //   .string()
    //   .min(3, "Part Code is required")
    //   .required("Part Code is required"),
    // UnitPrice: yup
    //   .string()
    //   .min(3, "Unit Price is required")
    //   .required("Unit Price is required"),
    // Description: yup
    //   .string()
    //   .min(3, "Description is required")
    //   .required("Description is required"),
    // AccessoryType: yup
    //   .string()
    //   .min(3, "Accessory Type is required")
    //   .required("Accessory Type is required"),
    // AddedAccessory: yup
    //   .string()
    //   .min(3, "Added Accessory is required")
    //   .required("Added Accessory is required"),
  });

  const [user, setUser] = useState({
    id: "",
    vin: "",
    vista_order: "",
    outcome: "",
    options_price: "",
    opportunity_id: "",
    financed_amount: "",
    sales_agent: "",
    accessories_price: "",
    shipping_city: "",
    shipping_country_code: "",
    sales_organization: "",
    trade_ln_list: "",
    quote_number: "",
    quote_id: "",
    reason_why: "",
    holding_deposit: "",
    grand_total: "",
    finance_bank: "",
    description_group_id: "",
    delivery_price: "",
    discount_amount: "",
    cash_amount: "",
    base_price: "",
    accessory_list: "",
    year: "",
    MMCode: "",
    EquityAmount: "",
    TradeInBrand: "",
    TradeInModel: "",
    SettlementBank: "",
    FinalTradeInOffer: "",
    PurhcasingFranchise: "",
    PartCode: "",
    UnitPrice: "",
    Description: "",
    AccessoryType: "",
    AddedAccessory: "",
  });
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

  useEffect(() => {
    setLoading(true);
    dispatch(
      getDropdownValue({
        page: currentPage,
        perPage: rowsPerPage,
        vin: vehOwnSearchValue,
        vista_order: visitaSearchValue,
      })
    )
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, [vehOwnSearchValue, visitaSearchValue]);

  const defaultValues = {
    id: user.id,
    vin: user.vin,
    vista_order: user.vista_order,
    outcome: user.outcome,
    options_price: user.options_price,
    opportunity_id: user.opportunity_id,
    financed_amount: user.financed_amount,
    sales_agent: user.sales_agent,
    accessories_price: user.accessories_price,
    shipping_city: user.shipping_city,
    sales_organization: user.sales_organization,
    shipping_country_code: user.shipping_country_code,
    trade_ln_list: user.trade_ln_list[0],
    quote_number: user.quote_number,
    quote_id: user.quote_id,
    reason_why: user.reason_why,
    holding_deposit: user.holding_deposit,
    grand_total: user.grand_total,
    finance_bank: user.finance_bank,
    description_group_id: user.description_group_id,
    discount_amount: user.discount_amount,
    delivery_price: user.delivery_price,
    cash_amount: user.cash_amount,
    base_price: user.base_price,
    accessory_list: user.accessory_list[0],
    actual_trade_in_amount: user.actual_trade_in_amount,
    year: user.year,
    MMCode: user.MMCode,
    EquityAmount: user.EquityAmount,
    TradeInBrand: user.TradeInBrand,
    TradeInModel: user.TradeInModel,
    SettlementBank: user.SettlementBank,
    FinalTradeInOffer: user.FinalTradeInOffer,
    SettlementValue: user.SettlementValue,
    PurhcasingFranchise: user.PurhcasingFranchise,
    PartCode: user.PartCode,
    UnitPrice: user.UnitPrice,
    Description: user.Description,
    AccessoryType: user.AccessoryType,
    AddedAccessory: user.AddedAccessory,
    // createdAt: user.createdAt,
    // updatedAt: user.updatedAt,
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) });

  const {
    handleSubmit: handleEditSubmit,
    register: editRegister,
    reset: editReset,
    formState: { errors: editErrors },
  } = useForm({ defaultValues, resolver: yupResolver(editSchema) });

  useEffect(() => {
    getData();
    updateUser();
    addUser();
  }, []);

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
  }, [currentPage, rowsPerPage, searchValue, dispatch]);
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

  const handleSearchVinValue = (e) => {
    setVehOwnSearchValue(e.target.value);
    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        vin: e.target.value,
        vista_order: visitaSearchValue,
      })
    );
  };
  const handleSearchvisitaValue = (e) => {
    setVisitaSearchValue(e.target.value);

    dispatch(
      getDropdownValue({
        page: 1,
        perPage: rowsPerPage,
        vin: vehOwnSearchValue,
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
        vin: vehOwnSearchValue,
        vista_order: "",
      })
    );
  };
  const handleClear = () => {
    setVehOwnSearchValue("");
    setVisitaSearchValue("");

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue,
      })
    );
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

      minWidth: "10px",
      center: true,
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          {userHandler.role === "user" || userHandler.role === "Dealer" ? (
            <Eye
              size={17}
              className="cursor-pointer me-1"
              id={`eye-tooltip-${row.id}`}
              onClick={() => {
                setUser(row);
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
                setShow(true);
              }}
            />
          )}
          <UncontrolledTooltip placement="top" target={`eye-tooltip-${row.id}`}>
            {userHandler.role === "user" || userHandler.role === "Dealer"
              ? "View Sales"
              : "Edit Sales"}
            {/* View Sales */}
          </UncontrolledTooltip>
          <Link
            className="d-none"
            to={`/apps/invoice/preview/${row.id}`}
            id={`pw-tooltip-${row.id}`}
          >
            <Eye size={17} className="mx-1" />
          </Link>
        </div>
      ),
    },

    {
      name: "VIN Number",
      sortable: true,
      minWidth: "200px",
      right: true,

      selector: (row) => row.vin || "--",
      cell: (row) => (
        <Tooltip title={row.vin}>
          <div>{row.vin || "--"}</div>
        </Tooltip>
      ),
    },
    {
      name: "Accessory List",
      sortable: true,
      minWidth: "190px",
      style: { color: "#000", textAlign: "center" },
      center: true,
      selector: (row) => {
        return (
          <div
            onClick={() => {
              if (row.accessory_list != "No Data Found") {
                // console.log("-----row.id----", row.id);
                handleListData(row.id);
                setListShowPopup(true);
              }
            }}
            style={{
              cursor:
                row.accessory_list != "No Data Found" ? "pointer" : "default",
            }}
          >
            {row.accessory_list != "No Data Found" ? (
              <div
                className="hover-effect"
              //   onMouseEnter={(e) => {
              //     e.target.style.fontSize = "15px";
              //   }}
              >
                <div
                  style={{
                    textDecoration: "underline",
                    margin: "2px",
                    cursor: "pointer",
                    color: "#42b983",
                  }}
                >
                  Click to view
                </div>
              </div>
            ) : (
              <div>No data Found</div>
            )}
          </div>
        );
      },
    },

    {
      name: "Trade in list",
      sortable: true,
      minWidth: "150px",
      style: { color: "#000", textAlign: "center" },
      center: true,
      selector: (row) => {
        // const hasListData = row.trade_ln_list.length > 0;
        return (
          <div
            onClick={() => {
              if (row.trade_ln_list != "No Data Found") {
                handleListData(row.id);
                setTradeShowPopup(true);
              }
            }}
            style={{
              cursor:
                row.trade_ln_list != "No Data Found" ? "pointer" : "default",
            }}
          >
            {row.trade_ln_list != "No Data Found" ? (
              <div
                className="hover-effect"
              //   onMouseEnter={(e) => {
              //     e.target.style.fontSize = "15px";
              //   }}
              >
                <div
                  style={{
                    textDecoration: "underline",
                    color: "#42b983",
                    margin: "2px",
                    cursor: "pointer",
                  }}
                >
                  Click to view
                </div>
              </div>
            ) : (
              // <div
              //   className="hover-effect"
              //   // onMouseEnter={(e) => {
              //   //   e.target.style.fontSize = "15px";
              //   // }}
              // >
              //   <Badge
              //     className="hover-effect-defualt"
              //     color="secondary"
              //     style={{
              //       margin: "2px",
              //     }}
              //   >
              //     Click to view
              //   </Badge>
              // </div>
              <div>No data Found </div>
            )}
          </div>
        );
      },
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
          className=".hover-effect-defualt"
          onClick={() => {
            navigate("/customers/management", { state: row.account_number });
          }}
        // style={{
        //   color: "#42b983",
        //   fontSize: selectedRow === row ? "15px" : "",
        //   cursor: selectedRow === row ? "pointer" : "default",
        // }}
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
      ),
    },
    {
      name: "Vista Order",
      sortable: true,
      minWidth: "160px",
      right: true,

      selector: (row) => row.vista_order || "--",
      // cell: (row) => (
      //   <Tooltip title={row.vista_order}>
      //     <div>{row.vista_order || "--"}</div>
      //   </Tooltip>
      // ),
    },
    {
      name: "Outcome",
      sortable: true,
      minWidth: "140px",

      selector: (row) => row.outcome || "--",
      cell: (row) => (
        <Tooltip title={row.outcome}>
          <div>{row.outcome || "--"}</div>
        </Tooltip>
      ),
    },
    {
      name: "Options Price",
      sortable: true,
      minWidth: "200px",
      right: true,
      selector: (row) => `${formatToSA(row.options_price)}`,
    },
    {
      name: "Shipping Country Code",
      sortable: true,
      minWidth: "250px",
      right: true,

      selector: (row) => row.shipping_country_code || "--",
    },
    {
      name: "Shipping City",
      sortable: true,
      minWidth: "200px",

      selector: (row) => row.shipping_city || "--",
    },

    {
      name: "Opportunity ID",
      sortable: true,
      minWidth: "225px",

      selector: (row) => row.opportunity_id || "--",
    },
    {
      name: "Financed Amount",
      sortable: true,
      minWidth: "200px",
      right: true,

      selector: (row) => `${formatToSA(row.financed_amount)}`,
    },
    {
      name: "Sales Organization",
      sortable: true,
      minWidth: "200px",
      right: true,

      selector: (row) => row.sales_organization || "--",
    },

    {
      name: "Quote ID",
      sortable: true,
      minWidth: "225px",

      selector: (row) => row.quote_id || "--",
    },
    {
      name: "Quote Number",
      sortable: true,
      minWidth: "180px",
      right: true,

      selector: (row) => row.quote_number || "--",
    },

    {
      name: "Reason Why",
      sortable: true,
      minWidth: "180px",

      selector: (row) => row.reason_why || "--",
    },
    {
      name: "Holding Deposit",
      sortable: true,
      minWidth: "200px",
      right: true,
      selector: (row) => `${formatToSA(row.holding_deposit)}`,
    },

    {
      name: "Grand Total",
      sortable: true,
      minWidth: "180px",
      right: true,

      selector: (row) => `${formatToSA(row.grand_total)}`,
    },
    {
      name: "Financed Bank",
      sortable: true,
      minWidth: "200px",

      selector: (row) => row.finance_bank || "--",
    },
    {
      name: "Description Group ID",
      sortable: true,
      minWidth: "250px",
      right: true,

      selector: (row) => row.description_group_id || "--",
    },
    {
      name: "Discount Amount",
      sortable: true,
      minWidth: "200px",
      right: true,
      selector: (row) => `${formatToSA(row.discount_amount)}`,
    },
    {
      name: "Delivery Price",
      sortable: true,
      minWidth: "200px",
      right: true,

      selector: (row) => `${formatToSA(row.delivery_price)}`,
    },
    {
      name: "Cash Amount",
      sortable: true,
      minWidth: "200px",
      right: true,

      selector: (row) => `${formatToSA(row.cash_amount)}`,
    },
    {
      name: "Base Price",
      sortable: true,
      minWidth: "150px",
      right: true,

      selector: (row) => `${formatToSA(row.base_price)}`,
    },
    {
      name: "Actual Trade",
      sortable: true,
      minWidth: "170px",
      right: true,
      selector: (row) => `${formatToSA(row.actual_trade_in_amount)}`,
    },
    {
      name: "Sales Agent",
      sortable: true,
      minWidth: "200px",

      selector: (row) => row.sales_agent || "--",
    },

    {
      name: "Accessories Price",
      sortable: true,
      minWidth: "200px",
      right: true,
      selector: (row) => `${formatToSA(row.accessories_price)}`,
    },

    {
      name: "Status",
      sortable: true,
      minWidth: "170px",

      selector: (row) => row.status || "--",
    },

    {
      name: "Created At",
      sortable: true,
      minWidth: "200px",

      selector: (row) =>
        moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss") || "--",
    },
    {
      name: "Updated At",
      sortable: true,
      minWidth: "200px",

      selector: (row) =>
        moment(row.updatedAt).format("YYYY-MM-DD HH:mm:ss") || "--",
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

  const onSubmitHandler = () => {
    const payload = {
      id: user.id,
      vin: user.vin,
      vista_order: user.vista_order,
      outcome: user.outcome,
      options_price: user.options_price,
      opportunity_id: user.opportunity_id,
      financed_amount: user.financed_amount,
      sales_agent: user.sales_agent,
      accessories_price: user.accessories_price,
      shipping_city: user.shipping_city,
      sales_organization: user.sales_organization,
      shipping_country_code: user.shipping_country_code,
      trade_ln_list: tradeInList,
      quote_number: user.quote_number,
      quote_id: user.quote_id,
      reason_why: user.reason_why,
      holding_deposit: user.holding_deposit,
      grand_total: user.grand_total,
      finance_bank: user.finance_bank,
      description_group_id: user.description_group_id,
      discount_amount: user.discount_amount,
      delivery_price: user.delivery_price,
      cash_amount: user.cash_amount,
      base_price: user.base_price,
      accessory_list: accessoryList,
      actual_trade_in_amount: user.actual_trade_in_amount,
      // year: user.year,
      // MMCode: user.MMCode,
      // EquityAmount: user.EquityAmount,
      // TradeInBrand: user.TradeInBrand,
      // TradeInModel: user.TradeInModel,
      // SettlementBank: user.SettlementBank,
      // FinalTradeInOffer: user.FinalTradeInOffer,
      // SettlementValue: user.SettlementValue,
      // PurhcasingFranchise: user.PurhcasingFranchise,
      // PartCode: user.PartCode,
      // UnitPrice: user.UnitPrice,
      // Description: user.Description,
      // AccessoryType: user.AccessoryType,
      // AddedAccessory: user.AddedAccessory,
      // createdAt: user.createdAt,
      // updatedAt: user.updatedAt,
    };
    console.log(payload);

    // dispatch(updateUser(payload));

    // MySwal.fire({
    //   icon: "success",
    //   title: "Updated!",
    //   text: "User Updated Successfully.",
    //   customClass: {
    //     confirmButton: "btn btn-success",
    //   },
    // });
    // setShow(false);
  };

  const userValues = {
    vin: vin,
    vista_order: vista_order,
    outcome: outcome,
    description_group_id: description_group_id,
    options_price: options_price,
    opportunity_id: opportunity_id,
    financed_amount: financed_amount,
    sales_agent: sales_agent,
    accessories_price: accessories_price,
    shipping_city: shipping_city,
    shipping_country_code: shipping_country_code,
    status: status,
    sales_organization: sales_organization,
    trade_ln_list: tradeInList,
    quote_number: quote_number,
    quote_id: quote_id,
    reason_why: reason_why,
    holding_deposit: holding_deposit,
    grand_total: grand_total,
    finance_bank: finance_bank,
    discount_amount: discount_amount,
    delivery_price: delivery_price,
    cash_amount: cash_amount,
    base_price: base_price,
    actual_trade_in_amount: actual_trade_in_amount,
    accessory_list: accessoryList,
    // year: year,
    // MMCode: MMCode,
    // EquityAmount: EquityAmount,
    // TradeInBrand: TradeInBrand,
    // TradeInModel: TradeInModel,
    // SettlementBank: SettlementBank,
    // FinalTradeInOffer: FinalTradeInOffer,
    // SettlementValue: SettlementValue,
    // PurhcasingFranchise: PurhcasingFranchise,
    // PartCode: PartCode,
    // UnitPrice: UnitPrice,
    // Description: Description,
    // AccessoryType: AccessoryType,
    // AddedAccessory: AddedAccessory,
  };
  const onCreateHandler = () => {
    if (vista_order.length > 3) {
      dispatch(addUser(userValues));
      setShow1(false);
      reset();
      editReset();
    } else toast.error("Please fill the form");
  };

  const handleRowClick = (row, event) => {
    setSelectedRow(row);
    let element = event.target;
    while (element && element.tagName !== "column") {
      element = element.parentElement;
    }
  };

  const handleListData = (row) => {
    var config = {
      url: `https://rdbapi.vnvserver.com/sales/data/${row}`,
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === 200) {
          const myData = response.data.data;
          setSelectedValue(myData);
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
    setUser((prevState) => ({
      ...prevState,
      [boxName]: newValue,
    }));
  };
  return (
    <div>
      {/* <Card
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          padding: "5px",
        }}
      >
        <div style={{ padding: "6px", width: "15rem" }}>
          <input
            style={{
              padding: "9px",
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
            value={vehOwnSearchValue}
            onChange={handleSearchVinValue}
            placeholder="Enter VIN Number"
          />
        </div>
        <div style={{ padding: "6px", width: "12rem" }}>
          <input
            style={{
              padding: "9px",
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
                padding: isHovered ? "3px" : "2px",
                backgroundColor: isHovered ? "#f2f2f2" : "transparent",
                cursor: "pointer",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          )}
        </div>
        <div
          style={{
            padding: "10px",
            marginTop: "5px",
            marginLeft: "12px",
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
      </Card> */}

      <Fragment>
        {addAccessoryListPopup && (
          <AccesoryAddModal
            popup={addAccessoryListPopup}
            setPopup={setAddAccessoryListPopup}
            handleChangeFromChild={handleChangeFromAccessoryChild}
          />
        )}
        {addTradeInListPopup && (
          <TradeInListModal
            popup={addTradeInListPopup}
            setPopup={setAddTradeInListPopup}
            handleChangeFromChild={handleChangeFromTradeChild}
          />
        )}
        {editAccessoryListPopup && (
          <AccesoryEditModal
            popup={editAccessoryListPopup}
            setPopup={setEditAccessoryListPopup}
            accessoryList={user.accessory_list}
            handleChangeFromChild={handleChangeFromAccessoryChild}
          />
        )}
        {editTradeInListPopup && (
          <TradeInListEditModal
            popup={editTradeInListPopup}
            setPopup={setEditTradeInListPopup}
            trade_in_list={user.trade_ln_list}
            handleChangeFromChild={handleChangeFromTradeChild}
          />
        )}
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
              <h1 className="mb-1">Create New Sale</h1>
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
          <ModalBody className=" mx-50 pb-2">
            <form
              className="gy-1 pt-75 "
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
                    onChange={(e) => {
                      setVista_order(e.target.value);
                    }}
                    placeholder="Enter Vista Order"
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
                    for="outcome"
                  >
                    Outcome
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
                    {...register("outcome")}
                    onChange={(e) => {
                      setOutcome(e.target.value);
                    }}
                    placeholder="Enter Outcome"
                    type="text"
                  />

                  <p style={{ color: "red" }}>{errors.outcome?.message}</p>
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
                    for="options_price"
                  >
                    Options Price
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
                    {...register("options_price")}
                    onChange={(e) => {
                      setOptions_price(e.target.value);
                    }}
                    placeholder="Enter Options Price"
                    type="text"
                  />

                  <p style={{ color: "red" }}>
                    {errors.options_price?.message}
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
                    for="shipping_country_code"
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
                    {...register("shipping_country_code")}
                    onChange={(e) => {
                      setShipping_country_code(e.target.value);
                    }}
                    placeholder="Enter Shipping Country Code"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.shipping_country_code?.message}
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
                    for="status"
                  >
                    Status
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
                    {...register("status")}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    placeholder="Enter status"
                    type="number"
                  />

                  <p style={{ color: "red" }}>{errors.status?.message}</p>
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
                    for="shipping_city"
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
                    onChange={(e) => {
                      setShipping_city(e.target.value);
                    }}
                    placeholder="Enter Shipping City"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.shipping_city?.message}
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
                    for="opportunity_id"
                  >
                    Opportunity ID
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
                    {...register("opportunity_id")}
                    onChange={(e) => {
                      setOpportunity_id(e.target.value);
                    }}
                    placeholder="Enter Opportunity ID"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.opportunity_id?.message}
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
                    for="financed_amount"
                  >
                    Financed Amount
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
                    {...register("financed_amount")}
                    onChange={(e) => {
                      setFinanced_amount(e.target.value);
                    }}
                    placeholder="Enter Financed Amount"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.financed_amount?.message}
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
                    for="sales_agent"
                  >
                    Sales Agent
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
                    {...register("sales_agent")}
                    onChange={(e) => {
                      setSales_agent(e.target.value);
                    }}
                    placeholder="Enter Sales Agent"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.sales_agent?.message}</p>
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
                    for="sales_organization"
                  >
                    Sales Organization
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
                    {...register("sales_organization")}
                    onChange={(e) => {
                      setSales_organization(e.target.value);
                    }}
                    placeholder="Enter Sales Organization"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.sales_organization?.message}
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
                    for="quote_id"
                  >
                    Quote ID
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
                    {...register("quote_id")}
                    onChange={(e) => {
                      setQuote_id(e.target.value);
                    }}
                    placeholder="Enter Quote ID"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.quote_id?.message}</p>
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
                    for="quote_number"
                  >
                    Quote Number
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
                    // }}/
                    className="input form form-control"
                    {...register("quote_number")}
                    onChange={(e) => {
                      setQuote_number(e.target.value);
                    }}
                    placeholder="Enter Quote Number"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.quote_number?.message}</p>
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
                    for="reason_why"
                  >
                    Reason Why
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
                    {...register("reason_why")}
                    onChange={(e) => {
                      setReason_why(e.target.value);
                    }}
                    placeholder="Enter Reason Why"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.reason_why?.message}</p>
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
                    for="holding_deposit"
                  >
                    Holding Deposit
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
                    {...register("holding_deposit")}
                    onChange={(e) => {
                      setHolding_deposit(e.target.value);
                    }}
                    placeholder="Enter Holding Deposit"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.holding_deposit?.message}
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
                    for="accessories_price"
                  >
                    Accessories Price
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
                    {...register("accessories_price")}
                    onChange={(e) => {
                      setAccessories_price(e.target.value);
                    }}
                    placeholder="Enter Accessories Price"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.accessories_price?.message}
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
                    for="grand_total"
                  >
                    Grand Total
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
                    {...register("grand_total")}
                    onChange={(e) => {
                      setGrand_total(e.target.value);
                    }}
                    placeholder="Enter Grand Total"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.grand_total?.message}</p>
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
                    for="finance_bank"
                  >
                    Financed Bank
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
                    {...register("finance_bank")}
                    onChange={(e) => {
                      setFinance_bank(e.target.value);
                    }}
                    placeholder="Enter Financed Bank"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.finance_bank?.message}</p>
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
                    onChange={(e) => {
                      setDescription_group_id(e.target.value);
                    }}
                    placeholder="Enter Description Group ID"
                    type="text"
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
                    for="discount_amount"
                  >
                    Discount Amount
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
                    {...register("discount_amount")}
                    onChange={(e) => {
                      setDiscount_amount(e.target.value);
                    }}
                    placeholder="Enter Discount Amount"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.discount_amount?.message}
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
                    for="delivery_price"
                  >
                    Delivery Price
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
                    {...register("delivery_price")}
                    onChange={(e) => {
                      setDelivery_price(e.target.value);
                    }}
                    placeholder="Enter Delivery Price"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.delivery_price?.message}
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
                    for="cash_amount"
                  >
                    Cash Amount
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
                    {...register("cash_amount")}
                    onChange={(e) => {
                      setCash_amount(e.target.value);
                    }}
                    placeholder="Enter Cash Amount"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.cash_amount?.message}</p>
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
                    {...register("base_price")}
                    onChange={(e) => {
                      setBase_price(e.target.value);
                    }}
                    placeholder="Enter Base Price"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.base_price?.message}</p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="actual_trade_in_amount"
                  >
                    Actual Trade
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
                    {...register("actual_trade_in_amount")}
                    onChange={(e) => {
                      setActual_trade_in_amount(e.target.value);
                    }}
                    placeholder="Enter Actual Trade"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.actual_trade_in_amount?.message}
                  </p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="trade_ln_list"
                  >
                    Trade in list
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
                    {...register("trade_ln_list")}
                    onChange={(e) => {
                      setTrade_ln_list(e.target.value);
                    }}
                    placeholder="EnterTrade in list"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.trade_ln_list?.message}
                  </p>
                </Col>
                {/* ---------------------Accessory list started------------------------ */}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "15px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="PartCode "
                  >
                    Accessory List
                  </Label>
                </Col>
                <Col md={9}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      marginRight: "5px",
                      marginTop: "15px",
                    }}
                    onClick={() => setAddAccessoryListPopup(true)}
                  >
                    Accessory List
                  </button>
                </Col>
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "15px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="Year"
                  >
                    Trade In List
                  </Label>
                </Col>
                <Col md={9}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      marginRight: "5px",
                      marginTop: "15px",
                    }}
                    onClick={() => setAddTradeInListPopup(true)}
                  >
                    Trade In List
                  </button>
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
                    for="PartCode "
                  >
                    Part Code
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
                    {...register("PartCode")}
                    onChange={(e) => {
                      setPartCode(e.target.value);
                    }}
                    placeholder="Enter Part Code"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.PartCode?.message}</p>
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
                    for="UnitPrice"
                  >
                    Unit Price
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
                    {...register("UnitPrice")}
                    onChange={(e) => {
                      setUnitPrice(e.target.value);
                    }}
                    placeholder="Enter Unit Price "
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.UnitPrice?.message}</p>
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
                    for="Description"
                  >
                    Description
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
                    {...register("Description")}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder="Enter Description"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.Description?.message}</p>
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
                    for="AccessoryType"
                  >
                    Accessory Type{" "}
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
                    {...register("AccessoryType")}
                    onChange={(e) => {
                      setAccessoryType(e.target.value);
                    }}
                    placeholder="Enter Accessory Type"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.AccessoryType?.message}
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
                    for="AddedAccessory "
                  >
                    Added Accessory
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
                    {...register("AddedAccessory")}
                    onChange={(e) => {
                      setAddedAccessory(e.target.value);
                    }}
                    placeholder="Enter Added Accessory"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.AddedAccessory?.message}
                  </p>

                </Col> */}
                {/* ---------------------Accessory list ends------------------------ */}
                {/* <Col md={3} >
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="accessory_list"
                  >
                    Accessory List
                  </Label>
                </Col> */}
                {/* ---------------------Trade in list started------------------------ */}
                {/* <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="Year "
                  >
                    Year
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
                    {...register("Year")}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    placeholder="Enter Year"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.Year?.message}</p>
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
                    for="MMCode"
                  >
                    MM Code
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
                    {...register("MMCode")}
                    onChange={(e) => {
                      setMMCode(e.target.value);
                    }}
                    placeholder="Enter MM Code "
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.MMCode?.message}</p>
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
                    for="EquityAmount"
                  >
                    Equity Amount
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
                    {...register("EquityAmount")}
                    onChange={(e) => {
                      setEquityAmount(e.target.value);
                    }}
                    placeholder="Enter Equity Amount"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.EquityAmount?.message}</p>
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
                    for="TradeInBrand "
                  >
                    Trade In Brand{" "}
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
                    {...register("TradeInBrand")}
                    onChange={(e) => {
                      setTradeInBrand(e.target.value);
                    }}
                    placeholder="Enter Trade In Brand"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.TradeInBrand?.message}</p>
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
                    for="TradeInModel "
                  >
                    Trade In Model
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
                    {...register("TradeInModel")}
                    onChange={(e) => {
                      setTradeInModel(e.target.value);
                    }}
                    placeholder="Enter Trade In Model"
                    type="text"
                  />
                  <p style={{ color: "red" }}>{errors.TradeInModel?.message}</p>
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
                    for="SettlementBank"
                  >
                    Settlement Bank
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
                    {...register("SettlementBank")}
                    onChange={(e) => {
                      setSettlementBank(e.target.value);
                    }}
                    placeholder="Enter Settlement Bank "
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.SettlementBank?.message}
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
                    for="SettlementValue  "
                  >
                    Settlement Value
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
                    {...register("SettlementValue")}
                    onChange={(e) => {
                      setSettlementValue(e.target.value);
                    }}
                    placeholder="Enter Settlement Value "
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.SettlementValue?.message}
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
                    for="FinalTradeInOffer"
                  >
                    Final Trade In Offer
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
                    {...register("FinalTradeInOffer")}
                    onChange={(e) => {
                      setFinalTradeInOffer(e.target.value);
                    }}
                    placeholder="Enter Final Trade In Offer"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.FinalTradeInOffer?.message}
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
                    for="PurhcasingFranchise "
                  >
                    Purhcasing Franchise{" "}
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
                    {...register("PurhcasingFranchise")}
                    onChange={(e) => {
                      setPurhcasingFranchise(e.target.value);
                    }}
                    placeholder="Enter Purhcasing Franchise"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {errors.PurhcasingFranchise?.message}
                  </p>
                </Col> */}
                {/* ---------------------Trade in list ends------------------------ */}
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
                      setShow1(false);
                      editReset();
                      reset();
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
              <h1 className="mb-1">Edit Sales Information</h1>
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
                    for="editVin"
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
                    {...editRegister("editVin")}
                    onChange={handleInputChange}
                    defaultValue={user.vin}
                    placeholder={defaultValues.vin}
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
                    for="vistaOrder"
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
                    {...editRegister("vistaOrder")}
                    onChange={handleInputChange}
                    defaultValue={user.vista_order}
                    placeholder={defaultValues.vista_order}
                    disabled={isLoggedIn ? true : false}
                    type="text"
                  // name="vista_order"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.vistaOrder?.message}
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
                    for="outCome"
                  >
                    Outcome
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
                    {...editRegister("outCome")}
                    onChange={handleInputChange}
                    defaultValue={user.outcome}
                    placeholder={defaultValues.outcome}
                    disabled={isLoggedIn ? true : false}
                    type="text"
                  // name="outcome"
                  />

                  <p style={{ color: "red" }}>{editErrors.outCome?.message}</p>
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
                    for="optionsPrice"
                  >
                    Options Price
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
                    {...editRegister("optionsPrice")}
                    onChange={handleInputChange}
                    defaultValue={user.options_price}
                    placeholder={defaultValues.options_price}
                    disabled={isLoggedIn ? true : false}
                    type="text"
                  // name="options_price"
                  />

                  <p style={{ color: "red" }}>
                    {editErrors.optionsPrice?.message}
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
                    for="shippingCountryCode"
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
                    onChange={handleInputChange}
                    defaultValue={user.shipping_country_code}
                    placeholder={defaultValues.shipping_country_code}
                    type="text"
                    disabled={isLoggedIn ? true : false}
                  // name="shipping_country_code"
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
                    for="shippingCity"
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
                    placeholder={defaultValues.shipping_city}
                    disabled={isLoggedIn ? true : false}
                    name="shipping_city"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.shippingCity?.message}
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
                    for="opportunityId"
                  >
                    Opportunity ID
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
                    {...editRegister("opportunityId")}
                    onChange={handleInputChange}
                    defaultValue={user.opportunity_id}
                    placeholder={defaultValues.opportunity_id}
                    // name="opportunity_id"
                    type="text"
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.opportunityId?.message}
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
                    for="financedAmount"
                  >
                    Financed Amount
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
                    {...editRegister("financedAmount")}
                    defaultValue={user.financed_amount}
                    onChange={handleInputChange}
                    // name="financed_amount"
                    placeholder={defaultValues.financed_amount}
                    type="text"
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.financedAmount?.message}
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
                    for="salesOrganization"
                  >
                    Sales Organization
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
                    {...editRegister("salesOrganization")}
                    defaultValue={user.sales_organization}
                    onChange={handleInputChange}
                    // name="sales_organization"
                    placeholder={defaultValues.sales_organization}
                    type="text"
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.salesOrganization?.message}
                  </p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="quoteId"
                  >
                    Quote ID
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
                    {...editRegister("quoteId")}
                    defaultValue={user.quote_id}
                    onChange={handleInputChange}
                    // name="quote_id"
                    placeholder={defaultValues.quote_id}
                    type="text"
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{editErrors.quoteId?.message}</p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="quoteNumber"
                  >
                    Quote Number
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
                    {...editRegister("quoteNumber")}
                    defaultValue={user.quote_number}
                    onChange={handleInputChange}
                    // name="quote_number"
                    placeholder={defaultValues.quote_number}
                    type="text"
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.quoteNumber?.message}
                  </p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="reasonWhy"
                  >
                    Reason Why
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
                    {...editRegister("reasonWhy")}
                    defaultValue={user.reason_why}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="reason_why"
                    placeholder={defaultValues.reason_why}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.reasonWhy?.message}
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
                    for="holdingDeposit"
                  >
                    Holding Deposit
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
                    {...editRegister("holdingDeposit")}
                    defaultValue={user.holding_deposit}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="holding_deposit"
                    placeholder={defaultValues.holding_deposit}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.holdingDeposit?.message}
                  </p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="grandTotal"
                  >
                    Grand Total
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
                    {...editRegister("grandTotal")}
                    defaultValue={user.grand_total}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="grand_total"
                    placeholder={defaultValues.grand_total}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.grandTotal?.message}
                  </p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="financeBank"
                  >
                    Financed Bank
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
                    {...editRegister("financeBank")}
                    defaultValue={user.finance_bank}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="finance_bank"
                    placeholder={defaultValues.finance_bank}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.financeBank?.message}
                  </p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="descriptionGroupId"
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
                    {...editRegister("descriptionGroupId")}
                    defaultValue={user.description_group_id}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="description_group_id"
                    placeholder={defaultValues.description_group_id}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.descriptionGroupId?.message}
                  </p>
                </Col>{" "}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="discountAmount"
                  >
                    Discount Amount
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
                    {...editRegister("discountAmount")}
                    defaultValue={user.discount_amount}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="discount_amount"
                    placeholder={defaultValues.discount_amount}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.discountAmount?.message}
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
                    for="deliveryPrice"
                  >
                    Delivery Price
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
                    {...editRegister("deliveryPrice")}
                    defaultValue={user.delivery_price}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="delivery_price"
                    placeholder={defaultValues.delivery_price}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.deliveryPrice?.message}
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
                    for="cashAmount"
                  >
                    Cash Amount
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
                    {...editRegister("cashAmount")}
                    defaultValue={user.cash_amount}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="cash_amount"
                    placeholder={defaultValues.cash_amount}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.cashAmount?.message}
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
                    for="basePrice"
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
                    {...editRegister("basePrice")}
                    defaultValue={user.base_price}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="base_price"
                    placeholder={defaultValues.base_price}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.basePrice?.message}
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
                    for="actualTradeInAmount"
                  >
                    Actual Trade
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
                    {...editRegister("actualTradeInAmount")}
                    defaultValue={user.actual_trade_in_amount}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="actual_trade_in_amount"
                    placeholder={defaultValues.actual_trade_in_amount}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.actualTradeInAmount?.message}
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
                    for="salesAgent"
                  >
                    Sales Agent
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
                    {...editRegister("salesAgent")}
                    defaultValue={user.sales_agent}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="sales_agent"
                    placeholder={defaultValues.sales_agent}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.salesAgent?.message}
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
                    for="accessoriesPrice"
                  >
                    Accessories Price
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
                    {...editRegister("accessoriesPrice")}
                    defaultValue={user.accessories_price}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="accessories_price"
                    placeholder={defaultValues.accessories_price}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.accessoriesPrice?.message}
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
                    for="editStatus"
                  >
                    Status
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
                    {...editRegister("editStatus")}
                    defaultValue={user.status}
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                    // name="status"
                    placeholder={defaultValues.status}
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {editErrors.editStatus?.message}
                  </p>
                </Col>
                {/* <Col>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="trade_ln_list"
                  >
                    Trade in list
                  </Label>
                  </Col> */}
                {/* <input
                style={{
                  padding: "8px 7px",
                  display: "inline-block",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  width: "75%",
                }}
                className="input"
                value={user.trade_ln_list}
                
                name="trade_ln_list"
                placeholder={defaultValues.trade_ln_list}
                type="text"
                onChange={handleInputChange}
              />
              <p style={{ color: "red" }}>{errors.trade_ln_list?.message}</p> */}
                {/* --------------------------Accessory List and Trade In list popup -------------------------- */}
                {/* ---------------------Accessory list started------------------------ */}
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "15px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="PartCode "
                  >
                    Accessory List
                  </Label>
                </Col>
                <Col md={9}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      marginRight: "5px",
                      marginTop: "15px",
                    }}
                    onClick={() => setEditAccessoryListPopup(true)}
                  >
                    Accessory List
                  </button>
                </Col>
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "15px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="Year"
                  >
                    Trade In List
                  </Label>
                </Col>
                <Col md={9}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      marginRight: "5px",
                      marginTop: "15px",
                    }}
                    onClick={() => setEditTradeInListPopup(true)}
                  >
                    Trade In List
                  </button>
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
                    for="PartCode"
                  >
                    Part Code
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
                    value={user.PartCode}
                    name="PartCode"
                    placeholder={defaultValues.PartCode}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.PartCode?.message}</p>
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
                    for="UnitPrice"
                  >
                    Unit Price
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
                    value={user.UnitPrice}
                    name="UnitPrice"
                    placeholder={defaultValues.UnitPrice}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.UnitPrice?.message}</p>
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
                    for="Description"
                  >
                    Description
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
                    value={user.Description}
                    name="Description"
                    placeholder={defaultValues.Description}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.Description?.message}</p>
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
                    for="AccessoryType"
                  >
                    Accessory Type
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
                    value={user.AccessoryType}
                    name="AccessoryType"
                    placeholder={defaultValues.AccessoryType}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {errors.AccessoryType?.message}
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
                    for="AddedAccessory"
                  >
                    Added Accessory
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
                    value={user.AddedAccessory}
                    name="AddedAccessory"
                    placeholder={defaultValues.AddedAccessory}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {errors.AddedAccessory?.message}
                  </p>
                </Col>
                {/* <Col md={3}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // backgroundColor: "yellowgreen",
                  }}
                > */}
                {/* <Col>
                    <h4
                      style={{
                        marginTop: "6px",
                        // marginLeft: "6px",
                        fontSize: "17px",
                        color: "black",
                        alignItems: "center",
                      }}
                    >
                      Accessory List
                    </h4>
                  </Col>
                  {/* <img
                src={plus}
                alt="Image description"
                height={"25"}
                width={"25"}
                onClick={setIsOpenAcc(true)}
                style={{
                  padding: isHovered ? "3px" : "2px",
                  // backgroundColor: isHovered ? "#f2f2f2" : "transparent",
                  cursor: "pointer",
                  marginTop: "6px",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              /> 
                <Col md={3}>
                  <Label
                    style={{
                      marginTop: "6px",
                      fontSize: "15px",
                      color: "black",
                      alignItems: "center",
                    }}
                    className="label"
                    for="Year"
                  >
                    Year
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
                    value={user.year}
                    name="Year"
                    placeholder={defaultValues.year}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.year?.message}</p>
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
                    for="MMCode"
                  >
                    MM Code
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
                    value={user.MMCode}
                    name="MMCode"
                    placeholder={defaultValues.MMCode}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.MMCode?.message}</p>
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
                    for="EquityAmount"
                  >
                    Equity Amount
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
                    value={user.EquityAmount}
                    name="EquityAmount"
                    placeholder={defaultValues.EquityAmount}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.EquityAmount?.message}</p>
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
                    for="TradeInBrand"
                  >
                    Trade In Brand
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
                    value={user.TradeInBrand}
                    name="TradeInBrand"
                    placeholder={defaultValues.TradeInBrand}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.TradeInBrand?.message}</p>
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
                    for="TradeInModel"
                  >
                    Trade In Model
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
                    value={user.TradeInModel}
                    name="TradeInModel"
                    placeholder={defaultValues.TradeInModel}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>{errors.TradeInModel?.message}</p>
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
                    for="SettlementBank"
                  >
                    Settlement Bank
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
                    value={user.SettlementBank}
                    name="SettlementBank"
                    placeholder={defaultValues.SettlementBank}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {errors.SettlementBank?.message}
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
                    for="SettlementValue"
                  >
                    Settlement Value
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
                    value={user.SettlementValue}
                    name="SettlementValue"
                    placeholder={defaultValues.SettlementValue}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {errors.SettlementValue?.message}
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
                    for="FinalTradeInOffer"
                  >
                    Final Trade In Offer
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
                    value={user.FinalTradeInOffer}
                    name="FinalTradeInOffer"
                    placeholder={defaultValues.FinalTradeInOffer}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {errors.FinalTradeInOffer?.message}
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
                    for="PurhcasingFranchise"
                  >
                    Purhcasing Franchise
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
                    value={user.PurhcasingFranchise}
                    name="PurhcasingFranchise"
                    placeholder={defaultValues.PurhcasingFranchise}
                    type="text"
                    onChange={handleInputChange}
                    disabled={isLoggedIn ? true : false}
                  />
                  <p style={{ color: "red" }}>
                    {errors.PurhcasingFranchise?.message}
                  </p>
                </Col> */}
                <Col xs={12} className=" mt-2 pt-50">
                  {(userHandler.role === "admin" ||
                    userHandler.role === "Admin") && (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                          marginRight: "5px",
                        }}
                      >
                        Update
                      </button>
                    )}
                  {(userHandler.role === "admin" ||
                    userHandler.role === "Admin") && (
                      <button
                        type="reset"
                        className="btn btn-secondary"
                        onClick={() => {
                          setShow(false);
                          editReset();
                          reset();
                        }}
                        style={{ color: "black" }}
                      >
                        Discard
                      </button>
                    )}
                </Col>
              </Row>
            </form>
          </ModalBody>
        </Modal>

        <Modal
          style={{ right: "13vw" }}
          isOpen={tradeshowPopup}
          toggle={() => setTradeShowPopup(!tradeshowPopup)}
          className="modal-dialog-centered "
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
                Trade In List
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
                onClick={() => setTradeShowPopup(false)}
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
              <div
                style={{
                  width: "100%",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <table>
                  <tr>
                    <th>Year</th>
                    <th>MMCode</th>
                    <th>EquityAmount</th>
                    <th>TradeInBrand</th>
                    <th>TradeInModel</th>
                    <th>SettlementBank</th>
                    <th>SettlementValue</th>
                    <th>FinalTradeInOffer</th>
                    <th>PurhcasingFranchise</th>
                  </tr>
                  {selectedValue.trade_ln_list &&
                    selectedValue.trade_ln_list !== "No data Found" &&
                    selectedValue.trade_ln_list.length ? (
                    selectedValue.trade_ln_list.map((val) => (
                      <tr key={val.MMCode}>
                        <td>{val.Year ? val.Year : "--"} </td>
                        <td>{val.MMCode ? val.MMCode : "--"}</td>
                        <td>{val.EquityAmount ? val.EquityAmount : "--"}</td>
                        <td>{val.TradeInBrand ? val.TradeInBrand : "--"}</td>
                        <td>{val.TradeInModel ? val.TradeInModel : "--"}</td>
                        <td>
                          {val.SettlementBank ? val.SettlementBank : "No Data"}
                        </td>
                        <td>
                          {val.SettlementValue ? val.SettlementValue : "--"}
                        </td>
                        <td>
                          {val.FinalTradeInOffer ? val.FinalTradeInOffer : "--"}
                        </td>
                        <td>
                          {val.PurhcasingFranchise
                            ? val.PurhcasingFranchise
                            : "--"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan="2">
                        No records found
                      </td>
                    </tr>
                  )}
                </table>
              </div>

              {/* <Col xs={12} className="mt-2 d-flex">
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => setTradeShowPopup(false)}
                  style={{
                    color: "black",
                  }}
                >
                  Discard
                </Button>
              </Col> */}
            </form>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={listshowPopup}
          toggle={() => setListShowPopup(!listshowPopup)}
          className="modal-dialog-centered"
        >
          {/* modal-lg */}
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
                Accessory List Details
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
                onClick={() => setListShowPopup(false)}
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
              <div
                style={{
                  width: "auto",
                  flex: "space between",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <table className="table">
                  <tr>
                    {/* <th>Key</th>
                    <th>Value</th> */}
                    <th>PartCode</th>
                    <th>UnitPrice</th>
                    <th>Description</th>
                    <th>AccessoryType</th>
                    <th>AddedAccessory</th>
                  </tr>

                  {/* {selectedValue.accessory_list &&
                  JSON.parse(selectedValue.accessory_list).length ? (
                    Object.entries(
                      JSON.parse(selectedValue.accessory_list)[0]
                    ).map(([key, value]) => (
                      <tr>
                        <td>{key ? key : "--"} :</td>
                        <td>{value ? value : "--"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan="2">
                        No records found
                      </td>
                    </tr>
                  )} */}
                  {selectedValue.accessory_list &&
                    selectedValue.accessory_list !== "No data Found" &&
                    selectedValue.accessory_list.length ? (
                    selectedValue.accessory_list.map((item) => (
                      <tr key={item.PartCode}>
                        <td>{item.PartCode ? item.PartCode : "--"} </td>
                        <td>{item.UnitPrice ? item.UnitPrice : "--"} </td>
                        <td>{item.Description ? item.Description : "--"} </td>
                        <td>
                          {item.AccessoryType ? item.AccessoryType : "--"}
                        </td>
                        <td>
                          {item.AddedAccessory ? item.AddedAccessory : "--"}
                        </td>

                        {/* <td>{PartCode ? PartCode : "--"} :</td>
                          <td>{UnitPrice ? UnitPrice : "--"}</td>
                          <td>{Description ? Description : "--"} :</td>
                          <td>{AccessoryType ? AccessoryType : "--"}</td>
                          <td>{AddedAccessory ? AddedAccessory : "--"}</td>
                          <td>{AccessoryType ? AccessoryType : "--"}</td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan="2">
                        No records found
                      </td>
                    </tr>
                  )}
                </table>
              </div>

              {/* <Col xs={12} className="mt-2 d-flex">
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => setListShowPopup(false)}
                  style={{ color: "black" }}
                >
                  Discard
                </Button>
              </Col> */}
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
                Sales List {store?.totalCount ? `(${store?.totalCount})` : ""}
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
                    setShow1(true);
                  }}
                  style={{ padding: "10px" }}
                >
                  Add New Sale
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
                  onRowClicked={handleRowClick}
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
