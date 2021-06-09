import React from "react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import "./dateStyle.css";

const { RangePicker } = DatePicker;

function DateRangePicker(props) {
  const { onChange } = props;

  return (
    <>
      <RangePicker onChange={onChange} className="datePicker" />
    </>
  );
}

export default DateRangePicker;
