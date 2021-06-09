import React, { useContext } from "react";
// import Select from 'react-dropdown-select';
import AdvanceSearch from "./subcomponents/Advance Search/AdvanceSearch";
import { FaUser } from "react-icons/fa";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import { newsContext } from "../../Helper/Context";
import "./topStyle.css";

function TopNav() {
  const { setQueryObj } = useContext(newsContext);

  const searchChange = (e) => {
    let obj = { q: e.target.value };
    setQueryObj(obj);
    console.log('shiv', obj);
  };

  return (
    <div className="topNav">
      <h1 className="news">News</h1>
      <h1 className="reader">Reader</h1>
      <div className="dropDown">
        {/* <Select placeholder='Search here...' /> */}
        <TextField
          size="small"
          placeholder="Search here..."
          className="searchField"
          variant="outlined"
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          onChange={searchChange}
        />
      </div>
      <AdvanceSearch />
      <FaUser className="user" />
    </div>
  );
}

export default TopNav;
