import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import moment from "moment";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import { newsContext } from "../../Helper/Context";
import "./pageStyle.css";

function Page() {
  const { selectedIndex, news } = useContext(newsContext);

  let idx = 0;
  if (selectedIndex) idx = selectedIndex;

  const date = moment(news[idx].date).format("MMMM Do, YYYY");

  return (
    <div className="page">
      <div className="pageHead">
        <h1>{news[idx].title}</h1>
      </div>
      <div className="pageSubhead">
        <div className="pageAuthor">
          <MenuBookRoundedIcon style={{ color: "#2196f3" }} />
          {news[idx].publication}
        </div>
        <div className="pageDate">{date}</div>
      </div>
      <Scrollbars style={{ width: "65vw", height: "67vh" }}>
        <div className="pageContent">
          <p>{news[idx].content}</p>
        </div>
      </Scrollbars>
    </div>
  );
}

export default Page;
