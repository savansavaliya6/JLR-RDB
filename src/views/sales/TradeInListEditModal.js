import React, { useEffect, useState } from "react";
import { Col, Label, Modal, ModalBody, Row } from "reactstrap";
import x_coordinate from "../../assets/imgs/x-coordinate.png";
import { Edit } from "react-feather";

const TradeInListEditModal = ({
  popup,
  setPopup,
  handleChangeFromChild,
  trade_in_list,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addTradeInListPopup, setAddTradeInListPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ tradeInList: [] });
  const [tradeInList, setTradeInList] = useState([]);
  const [editList, setEditList] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (editList.tradeInList.length) {
      setEditList((prevState) => ({
        ...editList,
        tradeInList: [{ ...editList.tradeInList[0], [name]: value }],
      }));
    } else {
      setSelectedValue((prevState) => ({
        tradeInList: [{ ...prevState.tradeInList[0], [name]: value }],
      }));
    }
  };

  useEffect(() => {
    if (trade_in_list !== "No Data Found")
      setTradeInList(JSON.parse(trade_in_list));
  }, []);
  return (
    <>
      {addTradeInListPopup && (
        <Modal
          isOpen={addTradeInListPopup}
          toggle={() => setAddTradeInListPopup(!addTradeInListPopup)}
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
              <h1 className="mb-1">Add Trade In List</h1>
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
                onClick={() => setAddTradeInListPopup(false)}
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
              onSubmit={(e) => {
                e.preventDefault();
                if (editList.tradeInList.length) {
                  let list = [...tradeInList];
                  list[editList.index] = editList.tradeInList[0];
                  setTradeInList(list);
                } else {
                  setTradeInList((prevState) => [
                    ...prevState,
                    ...selectedValue.tradeInList,
                  ]);
                }
                setAddTradeInListPopup(false);
              }}
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
                    // {...register("Year")}
                    name="Year"
                    value={editList?.tradeInList[0].Year}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Year"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.Year?.message}</p> */}
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
                    // {...register("MMCode")}
                    name="MMCode"
                    value={editList?.tradeInList[0].MMCode}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter MM Code "
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.MMCode?.message}</p> */}
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
                    // {...register("EquityAmount")}
                    name="EquityAmount"
                    value={editList?.tradeInList[0].EquityAmount}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Equity Amount"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.EquityAmount?.message}</p> */}
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
                    // {...register("TradeInBrand")}
                    name="TradeInBrand"
                    value={editList?.tradeInList[0].TradeInBrand}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Trade In Brand"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.TradeInBrand?.message}</p> */}
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
                    // {...register("TradeInModel")}
                    name="TradeInModel"
                    value={editList?.tradeInList[0].TradeInModel}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Trade In Model"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.TradeInModel?.message}</p> */}
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
                    // {...register("SettlementBank")}
                    name="SettlementBank"
                    value={editList?.tradeInList[0].SettlementBank}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Settlement Bank "
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>
                    {errors.SettlementBank?.message}
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
                    for="SettlementValue "
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
                    // {...register("SettlementValue")}
                    name="SettlementValue"
                    value={editList?.tradeInList[0].SettlementValue}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Settlement Value "
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>
                    {errors.SettlementValue?.message}
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
                    // {...register("FinalTradeInOffer")}
                    name="FinalTradeInOffer"
                    value={editList?.tradeInList[0].FinalTradeInOffer}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Final Trade In Offer"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>
                     {errors.FinalTradeInOffer?.message} 
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
                    // {...register("PurhcasingFranchise")}
                    name="PurhcasingFranchise"
                    value={editList?.tradeInList[0].PurhcasingFranchise}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Purhcasing Franchise"
                    type="text"
                  />
                  <p style={{ color: "red" }}>
                    {/* {errors.PurhcasingFranchise?.message} */}
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
                      setAddTradeInListPopup(false);
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
      )}
      <Modal
        isOpen={popup}
        style={{ right: "13vw" }}
        toggle={() => setPopup(!popup)}
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
              marginTop: "10px",
              marginLeft: "2rem",
            }}
          >
            <h1 className="mb-1" style={{ color: "#000" }}>
              Trade In List Details
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
              onClick={() => setPopup(false)}
              style={{
                padding: isHovered ? "3px" : "2px",
                backgroundColor: isHovered ? "#f2f2f2" : "transparent",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        </div>
        {/* <button
          type="submit"
          className="btn btn-primary"
          style={{
            margin: "auto",
            marginBottom: "20px",
          }}
          onClick={() => setAddTradeInListPopup(true)}
        >
          Add New Trade In List
        </button> */}

        <ModalBody
          className="mx-50 pb-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form className="gy-1 pt-75">
            {tradeInList && tradeInList.length ? (
              <div
                style={{
                  width: "100%",

                  justifyContent: "center",
                  alignItems: "center",
                  flex: "space between",
                }}
              >
                <table className="table">
                  <tr>
                    <th>Action</th>
                    <th>EquityAmount</th>
                    <th>FinalTradeInOffer</th>
                    <th>MMCode</th>
                    <th>PurhcasingFranchise</th>
                    <th>SettlementBank</th>
                    <th>SettlementValue</th>
                    <th>TradeInBrand</th>
                    <th>TradeInModel</th>
                    <th>Year</th>
                  </tr>

                  {tradeInList.length ? (
                    tradeInList.map((item, index) => (
                      <tr key={item.EquityAmount}>
                        <Edit
                          size={20}
                          className="cursor-pointer me-1"
                          onClick={() => {
                            setEditList({
                              tradeInList: [item],
                              index: index,
                            });
                            setAddTradeInListPopup(true);
                          }}
                        />
                        <td>{item.EquityAmount ? item.EquityAmount : "--"} </td>
                        <td>
                          {item.FinalTradeInOffer
                            ? item.FinalTradeInOffer
                            : "--"}{" "}
                        </td>
                        <td>{item.MMCode ? item.MMCode : "--"} </td>
                        <td>
                          {item.PurhcasingFranchise
                            ? item.PurhcasingFranchise
                            : "--"}
                        </td>
                        <td>
                          {item.SettlementBank ? item.SettlementBank : "--"}
                        </td>
                        <td>
                          {item.SettlementValue ? item.SettlementValue : "--"}
                        </td>{" "}
                        <td>{item.TradeInBrand ? item.TradeInBrand : "--"}</td>{" "}
                        <td>{item.TradeInModel ? item.TradeInModel : "--"}</td>
                        <td>{item.Year ? item.Year : "--"}</td>
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
            ) : (
              <div>No Data Found</div>
            )}
            <Col xs={12} className=" mt-2 pt-50">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={tradeInList.length ? false : true}
                style={{
                  marginRight: "5px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleChangeFromChild(tradeInList);
                  setPopup(false);
                }}
              >
                Submit
              </button>

              <button
                type="reset"
                className="btn btn-secondary"
                onClick={() => {
                  setPopup(false);
                }}
                style={{ color: "black" }}
              >
                Discard
              </button>
            </Col>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TradeInListEditModal;
