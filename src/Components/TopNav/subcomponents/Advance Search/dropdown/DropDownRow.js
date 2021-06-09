import React, { useState } from "react";
import Select from "react-select";
import { filterOptions, sentimentOptions } from "./constants";
import "../advanceSearchStyle.css";

function DropDownRow(props) {
  const { sources, categories, queryObjFn } = props;
  const [subOptions, setSubOptions] = useState([]);

  let filterObj = {};

  const settingSubOption = (params) => {
    if (params.value === 1) setSubOptions(categories);
    if (params.value === 2) setSubOptions(sentimentOptions);
    if (params.value === 3) setSubOptions(sources);
  };

  const selectedOption = (params) => {
    if (subOptions.length === categories.length)
      filterObj.category_id = params.value;
    if (subOptions.length === sentimentOptions.length)
      filterObj.sentiment = params.label;
    if (subOptions.length === sources.length)
      filterObj.source_id = params.value;

    queryObjFn(filterObj);
  };

  return (
    <div className="row2">
      <div className="dropdown">
        <Select
          onChange={settingSubOption}
          placeholder="Select Filter"
          options={filterOptions}
        />
      </div>
      <p className="is">Is</p>
      <div className="dropdown">
        <Select onChange={selectedOption} options={subOptions} />
      </div>
    </div>
  );
}

export default DropDownRow;
