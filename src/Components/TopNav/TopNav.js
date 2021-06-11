import React, { useContext } from "react";
// import Select from 'react-dropdown-select';
import AdvanceSearch from "./subcomponents/Advance Search/AdvanceSearch";
import { FaUser } from "react-icons/fa";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import { newsContext } from "../../Helper/Context";
import "./topStyle.css";
import { url } from "../../Helper/API";

function TopNav() {
  const { dateRange, queryObj, setQueryObj, setNews, setNext, setErr } = useContext(newsContext);

  const searchChange = (e) => {
    let obj = { q: e.target.value };
    setQueryObj(obj);
  };

  const searchResult = () => {
    let resultURL = url;

    if (dateRange.start_date && dateRange.start_date.length) {
      resultURL =
        resultURL +
        `&start_date=${dateRange.start_date}&end_date=${dateRange.end_date}`;
    }
    if (queryObj.q) resultURL = resultURL + `&q=${queryObj.q}`;
    if (queryObj.category_id)
      resultURL = resultURL + `&category_id=${queryObj.category_id}`;
    if (queryObj.sentiment)
      resultURL = resultURL + `&sentiment=${queryObj.sentiment}`;
    if (queryObj.source_id)
      resultURL = resultURL + `&source_id=${queryObj.source_id}`;

      fetch(resultURL)
      .then((response) => {
        if (response.status !== 200)
          throw new Error("Server responds with error");
        return response.json();
      })
      .then(
        (data) => {
          setNews(data.result.data);
          setNext(data.result.nextUrl);
        },
        (err) => setErr(err)
      );

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
            startAdornment: <SearchIcon onClick={searchResult} className="search" />,
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
