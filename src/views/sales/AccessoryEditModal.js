import React, { useEffect, useState } from "react";
import { Col, Label, Modal, ModalBody, Row } from "reactstrap";
import x_coordinate from "../../assets/imgs/x-coordinate.png";
import { Edit } from "react-feather";

const AccesoryEditModal = ({
  popup,
  setPopup,
  handleChangeFromChild,
  accessoryList,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addAccessoryListPopup, setAddAccessoryListPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState({ accessory_list: [] });
  const [accessory_list, setAccessory_list] = useState([]);
  const [editList, setEditList] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editList.accessory_list.length) {
      setEditList((prevState) => ({
        ...editList,
        accessory_list: [{ ...editList.accessory_list[0], [name]: value }],
      }));
    } else {
      setSelectedValue((prevState) => ({
        accessory_list: [{ ...prevState.accessory_list[0], [name]: value }],
      }));
    }
  };

  useEffect(() => {
    if (accessoryList !== "No Data Found")
      setAccessory_list(JSON.parse(accessoryList));
  }, []);

  return (
    <>
      {addAccessoryListPopup && (
        <Modal
          isOpen={addAccessoryListPopup}
          toggle={() => setAddAccessoryListPopup(!addAccessoryListPopup)}
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
              <h1 className="mb-1">Add Accessory List</h1>
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
                onClick={() => setAddAccessoryListPopup(false)}
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
            <form
              className="gy-1 pt-75 "
              onSubmit={(e) => {
                e.preventDefault();
                if (editList.accessory_list.length) {
                  let list = [...accessory_list];
                  list[editList.index] = editList.accessory_list[0];

                  setAccessory_list(list);
                } else {
                  setAccessory_list((prevState) => [
                    ...prevState,
                    ...selectedValue.accessory_list,
                  ]);
                }
                setAddAccessoryListPopup(false);
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
                    // {...register("PartCode")}
                    value={editList?.accessory_list[0].PartCode}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="PartCode"
                    placeholder="Enter Part Code"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.PartCode?.message}</p> */}
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
                    // {...register("UnitPrice")}
                    value={editList?.accessory_list[0].UnitPrice}
                    name="UnitPrice"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Unit Price "
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.UnitPrice?.message}</p> */}
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
                    name="Description"
                    // {...register("Description")}
                    value={editList?.accessory_list[0].Description}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Description"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>{errors.Description?.message}</p> */}
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
                    name="AccessoryType"
                    value={editList?.accessory_list[0].AccessoryType}
                    // {...register("AccessoryType")}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Accessory Type"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>
                    {errors.AccessoryType?.message}
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
                    // {...register("AddedAccessory")}
                    value={editList?.accessory_list[0].AddedAccessory}
                    name="AddedAccessory"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Enter Added Accessory"
                    type="text"
                  />
                  {/* <p style={{ color: "red" }}>
                    {errors.AddedAccessory?.message}
                  </p> */}
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
                      setAddAccessoryListPopup(false);
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
        {/* <button
          type="submit"
          className="btn btn-primary"
          style={{
            margin: "auto",
            marginBottom: "20px",
          }}
          onClick={() => setAddAccessoryListPopup(true)}
        >
          Add New Accessory List
        </button> */}

        <ModalBody
          className="mx-50 pb-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form className="gy-1 pt-75">
            {accessory_list && accessory_list.length ? (
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
                    <th>Action</th>
                    <th>PartCode</th>
                    <th>UnitPrice</th>
                    <th>Description</th>
                    <th>AccessoryType</th>
                    <th>AddedAccessory</th>
                  </tr>

                  {accessory_list.length ? (
                    accessory_list.map((item, index) => (
                      <tr key={item.PartCode}>
                        <Edit
                          size={20}
                          className="cursor-pointer me-1"
                          onClick={() => {
                            setEditList({
                              accessory_list: [item],
                              index: index,
                            });
                            setAddAccessoryListPopup(true);
                          }}
                        />

                        <td>{item.PartCode ? item.PartCode : "--"} </td>
                        <td>{item.UnitPrice ? item.UnitPrice : "--"} </td>
                        <td>{item.Description ? item.Description : "--"} </td>
                        <td>
                          {item.AccessoryType ? item.AccessoryType : "--"}
                        </td>
                        <td>
                          {item.AddedAccessory ? item.AddedAccessory : "--"}
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
            ) : (
              <div>No Data Found</div>
            )}
            <Col xs={12} className=" mt-2 pt-50">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={accessory_list.length ? false : true}
                style={{
                  marginRight: "5px",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleChangeFromChild(accessory_list);
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

export default AccesoryEditModal;
