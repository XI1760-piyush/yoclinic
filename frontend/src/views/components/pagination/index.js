import React, {useEffect, useState} from "react";
import { Pagination, Dropdown } from "react-bootstrap";
import "./style.scss";

function Index(props) {

  let prevPage= []
  let nextPage = []
  let lastPage = props.lastPage ? props.lastPage+1 : 1
  let currPage = props.pageNumber ? props.pageNumber+1 : 1
  let [countN, setCount] = useState(10)
  let [page, changePage] = useState(currPage)

  for(let i = 1 ; i <3 ; i++ ) {
     if(currPage-i>0) {
       prevPage.push(currPage-i)
     }
  }

  for(let i = 1 ; i <3 ; i++ ) {
    if(currPage+i<=lastPage) {
      nextPage.push(currPage+i)
    }
 }
 let changeSize = (count) => {
  setCount(count)
  props.onChange(count)
 }
 
 useEffect(()=>{
   props.onChange({count:countN, page})
 } ,[countN,page])

  return (
    <div className="pagination">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {countN}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>{ changeSize(10)}}>10</Dropdown.Item>
          <Dropdown.Item onClick={()=>{ changeSize(20)}}>20</Dropdown.Item>
          <Dropdown.Item onClick={()=>{ changeSize(50)}}>50</Dropdown.Item>
          <Dropdown.Item onClick={()=>{ changeSize(100)}}>100</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Pagination>
        <Pagination.Prev className="nav-move" onClick={currPage-2 >-1 ? ()=> changePage(currPage-2): null } />
        {
          prevPage.reverse().map((item,index)=>{
            return <Pagination.Item key={index} onClick={()=>{ changePage(item-1)}}>{item}</Pagination.Item>
          })
        }
        
        <Pagination.Item active>{currPage}</Pagination.Item>
        {
          nextPage.map((item,index)=>{
            return <Pagination.Item key={index} onClick={()=>{ changePage(item-1)}} >{item}</Pagination.Item>
          })
        }
        <Pagination.Next className="nav-move" onClick={currPage<=(lastPage-1) ? () => changePage(currPage) : null } />
      </Pagination>
    </div>
  );
}

export default Index;
