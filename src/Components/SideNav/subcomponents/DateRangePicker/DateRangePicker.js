import React from "react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import style from "./dateStyle.module.css";

const { RangePicker } = DatePicker;

function DateRangePicker(props) {
  const { onChange } = props;

  return (
    <>
      <RangePicker onChange={onChange} className={style.datePicker} />
    </>
  );
}

export default DateRangePicker;
