import React, { useState } from "react";
import { Col, Label, Modal, ModalBody, Row } from "reactstrap";
import x_coordinate from "../../assets/imgs/x-coordinate.png";

const TradeInListModal = ({ popup, setPopup, handleChangeFromChild }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addTradeInListPopup, setAddTradeInListPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ tradeInList: [] });
  const [tradeInList, setTradeInList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValue((prevState) => ({
      tradeInList: [{ ...prevState.tradeInList[0], [name]: value }],
    }));
  };

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
                onClick={() => {
                  setSelectedValue({ tradeInList: [] });

                  setAddTradeInListPopup(false);
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
              onSubmit={(e) => {
                e.preventDefault();
                setTradeInList((prevState) => [
                  ...prevState,
                  ...selectedValue.tradeInList,
                ]);
                setSelectedValue({ tradeInList: [] });
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
                      setSelectedValue({ tradeInList: [] });
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
        <button
          type="submit"
          className="btn btn-primary"
          style={{
            margin: "auto",
            marginBottom: "20px",
          }}
          onClick={() => setAddTradeInListPopup(true)}
        >
          Add New Trade In List
        </button>

        <ModalBody
          className="mx-50 pb-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form className="gy-1 pt-75">
            {tradeInList && tradeInList.length ? (
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
                    tradeInList.map((item) => (
                      <tr key={item.EquityAmount}>
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
            ) : null}
            <Col xs={12} className=" mt-2 pt-50">
              {tradeInList.length ? (
                <button
                  type="submit"
                  className="btn btn-primary"
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
              ) : null}
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

export default TradeInListModal;
