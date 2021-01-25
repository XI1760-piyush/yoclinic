import React, { useEffect, useState } from "react";
import { Form, Dropdown } from "react-bootstrap";
import "./style.scss";

function Index(props) {
  const [state, changeState] = useState('Time')
  const [cat, changeCat] = useState('All')
  useEffect( () => {
      props.onChange({state,cat})
  } ,[state,cat])

  return (
    <div className="filters">
      <div className="filter-item">
        <label>Sort By :</label>
        <Dropdown className="sort-btn">
          <Dropdown.Toggle id="dropdown-basic">
            {state}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { changeState('Time') }}>Time</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeState('Price (Low to High)') }}>Price (Low to High)</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeState('Price (High to Low)') }}>Price (High to Low)</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeState('Name') }}>Name</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="filter-item">
        <label>Category :</label>
        <Dropdown className="sort-btn">
          <Dropdown.Toggle id="dropdown-basic">
            {cat}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { changeCat('All') }}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeCat('Electronics') }}>Electronics</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeCat('Furniture') }}>Furniture</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeCat('Property') }}>Property</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeCat('Pets') }}>Pets</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeCat('Cars') }}>Cars</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeCat('Bikes') }}>Bikes</Dropdown.Item>
            <Dropdown.Item onClick={() => { changeCat('Others') }}>Others</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
     </div>
  );
}

export default Index;
