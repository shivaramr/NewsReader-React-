import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import moment from "moment";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import { newsContext } from "../../Helper/Context";
import style from "./pageStyle.module.css";

function Page() {
  const { selectedIndex, news } = useContext(newsContext);

  let idx = 0;
  if (selectedIndex) idx = selectedIndex;

  const date = moment(news[idx].date).format("MMMM Do, YYYY");

  return (
    <div className={style.page}>
      <div className={style.pageHead}>
        <h1>{news[idx].title}</h1>
      </div>
      <div className={style.pageSubhead}>
        <div className={style.pageAuthor}>
          <MenuBookRoundedIcon style={{ color: "#2196f3" }} />
          {news[idx].publication}
        </div>
        <div className={style.pageDate}>{date}</div>
      </div>
      <Scrollbars style={{ width: "65vw", height: "67vh" }}>
        <div className={style.pageContent}>
          <p>{news[idx].content}</p>
        </div>
      </Scrollbars>
    </div>
  );
}

export default Page;
