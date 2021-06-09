import React, { useContext, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { FcPrevious, FcNext } from "react-icons/fc";
import DateRangePicker from "./subcomponents/DateRangePicker/DateRangePicker";
import Card from "./subcomponents/Card/Card";
import { newsContext } from "../../Helper/Context";
import { url } from "../../Helper/API";
import "./sideStyle.css";

function SideNav() {
  const {
    news,
    setNews,
    setDateRange,
    dateRange,
    setSelectedIndex,
    queryObj,
    // next,
    setNext,
    setErr,
  } = useContext(newsContext);

  const onChange = (value, dateString) => {
    setDateRange({ start_date: dateString[0], end_date: dateString[1] });
  };

  useEffect(() => {
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

    setSelectedIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  // const paginate = () => {
  //   let URL = next + apiKey;

  //   fetch(URL)
  //     .then((response) => {
  //       if (response.status !== 200)
  //         throw new Error("Server responds with error");
  //       return response.json();
  //     })
  //     .then(
  //       (data) => {
  //         setNews(data.result.data);
  //         setNext(data.result.nextUrl);
  //       },
  //       (err) => setErr(err)
  //     );
  // };

  return (
    <div className="sideNav">
      <DateRangePicker onChange={onChange} />
      <Scrollbars style={{ width: "30vw", height: "70vw" }}>
        {news
          ? news.map((element, index) => {
              return <Card index={index} element={element} />;
            })
          : "Loading..."}
      </Scrollbars>
      <div className="paginateButtons">
        <FcPrevious />
        <FcNext />
      </div>
    </div>
  );
}

export default SideNav;
