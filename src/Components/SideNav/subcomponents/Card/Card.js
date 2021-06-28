import React, { useContext } from "react";
import moment from "moment";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { newsContext } from "../../../../Helper/Context";
import style from "./card.module.css";

function Card(props) {
  const { setSelectedIndex } = useContext(newsContext);

  const { index, element } = props;

  const date = moment(element.date).format("MMMM Do, YYYY");

  let sentiment = false;
  let status = true;
  if (element.sentiment !== "Neutral") sentiment = true;
  if (element.sentiment === "Positive") status = true;
  if (element.sentiment === "Negative") status = false;

  return (
    <div className={style.card} onClick={() => setSelectedIndex(index)}>
      <p className={style.dateHeading}>{date}</p>
      <h4>{element.title}</h4>
      <div className={style.author}>
        <FiberManualRecordIcon
          style={{ color: sentiment ? (status ? "#8bc34a" : "#ff1744") : "" }}
        />
        <p className={style.authorName}>{element.publication}</p>
      </div>
      <hr color="whitesmoke" />
    </div>
  );
}

export default Card;
