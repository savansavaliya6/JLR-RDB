// // ** React Imports
// import { Fragment } from "react";

// // ** Custom Components
// import Breadcrumbs from "@components/breadcrumbs";
// import TableServerSide from "./DataList";
// // ** Third Party Components
// import { Row, Col } from "reactstrap";

// // ** Styles
// import "@styles/react/libs/tables/react-dataTable-component.scss";

// const Lists = () => {
//   return (
//     <Fragment>
//       <Breadcrumbs
//         title="List Management"
//         data={[{ title: "List Managerment" }, { title: "List Management" }]}
//       />
//       <Row>
//         <Col sm="12">
//           {" "}
//           <TableServerSide />
//         </Col>
//       </Row>
//     </Fragment>
//   );
// };

// export default Lists;

import React, { useState } from "react";

function CheckboxExample() {
  const [selectedValues, setSelectedValues] = useState([]);
  const checkboxValues = [
    {
      id: "2",
      type: "pie",
      name: "pie1",
    },
    {
      id: "3",
      type: "line",
      name: "line1",
    },
    {
      id: "4",
      type: "bar",
      name: "bar1",
    },
  ];

  const handleCheckboxChange = (event) => {
    const selectedValue = event.target.value;

    const isSelected = selectedValues.includes(selectedValue);
    console.log("isSelected", selectedValue);
    // if (isSelected) {
    //   setSelectedValues(
    //     selectedValues.filter((value) => value !== selectedValue)
    //   );
    // } else {
    //   setSelectedValues([...selectedValues, selectedValue]);
    // }
  };

  const handleSubmit = () => {
    console.log(`Selected : ${selectedValues.join(", ")}`);
    console.log(
      "Selected values:",
      selectedValues === "bar" && console.log("bar")
    );
  };

  return (
    <div>
      {checkboxValues.map((value) => (
        <div key={value.id}>
          <input
            type="checkbox"
            value={value.type}
            checked={selectedValues.includes(value.type)}
            onChange={handleCheckboxChange}
          />
          <label>{value.name}</label>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CheckboxExample;
