import React, { useEffect, useState } from "react";
import Page from "../Pages/Page";
import SideNav from "../SideNav/SideNav";
import TopNav from "../TopNav/TopNav";
import { newsContext } from "../../Helper/Context";
import { url } from "../../Helper/API";
import "./homeStyle.css";

function Home() {
  const { Provider } = newsContext;

  const [news, setNews] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [dateRange, setDateRange] = useState({});
  const [queryObj, setQueryObj] = useState({});
  const [next, setNext] = useState("");
  const [err, setErr] = useState(null);

  const contextValues = {
    selectedIndex,
    setSelectedIndex,
    news,
    setNews,
    dateRange,
    setDateRange,
    queryObj,
    setQueryObj,
    next,
    setNext,
    err,
    setErr,
  };

  useEffect(() => {
    fetch(url)
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
  }, []);

  return (
    <Provider value={contextValues}>
      <TopNav />
      <div className="contents">
        <SideNav />
        {news.length ? <Page /> : "Loading..."}
      </div>
      {err ? <p>{err}</p>:''}
    </Provider>
  );
}

export default Home;
