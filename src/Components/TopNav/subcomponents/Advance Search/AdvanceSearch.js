import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, Grid, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DropDownRow from "./dropdown/DropDownRow";
import { newsContext } from "../../../../Helper/Context";
import { url, categoryURL, sourcesURL } from "../../../../Helper/API";
import "./advanceSearchStyle.css";

function AdvanceSearch() {
  const { setNews, dateRange, queryObj, setQueryObj, setNext, setErr } =
    useContext(newsContext);

  const [openDialog, setOpenDialog] = useState(false);
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);

  const queryObjFn = (params) => {
    setQueryObj(params);
  };

  useEffect(() => {
    fetch(sourcesURL)
      .then((response) => {
        if (response.status !== 200)
          throw new Error("Server responds with error");
        return response.json();
      })
      .then(
        (data) =>
          data.sources.map((m) => ({
            label: m.name,
            value: m.id,
          })),
        (err) => setErr(err)
      )
      .then(setSources);

    fetch(categoryURL)
      .then((response) => {
        if (response.status !== 200)
          throw new Error("Server responds with error");
        return response.json();
      })
      .then(
        (data) =>
          data.map((m) => ({
            label: m.category,
            value: m.iptc_code,
          })),
        (err) => setErr(err)
      )
      .then(setCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showResult = () => {
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

    setOpenDialog(!openDialog);
  };

  return (
    <>
      <button
        className="searchButton"
        onClick={() => setOpenDialog(!openDialog)}
      >
        Advance Search
      </button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(!openDialog)}>
        <DialogContent className="dialogContent">
          <Grid className="title">
            Advanced Search
            <IconButton
              className="close"
              onClick={() => setOpenDialog(!openDialog)}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid className="body">
            <button className="button">Add New Filter</button>
            <DropDownRow
              sources={sources}
              categories={categories}
              queryObjFn={queryObjFn}
            />
            {/* <DropDownRow />
            <DropDownRow /> */}
          </Grid>
          <Grid className="endButtons">
            <button
              className="cancel"
              onClick={() => setOpenDialog(!openDialog)}
            >
              Cancel
            </button>
            <button className="result" onClick={showResult}>
              Show Results
            </button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdvanceSearch;
