import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const STATUS = {
  LOADING: "LOADING",
  FAILURE: "FAILURE",
  SUCCESS: "SUCCESS",
};

export default (props: any) => {
  const { apiKey, children } = props;

  const [status, setStatus] = useState(STATUS.LOADING);

  useEffect(() => {
    const loader = new Loader({ libraries: ["places"], apiKey });
    const setStatusAndExecuteCallback = (newStatus: any) => {
      setStatus(newStatus);
    };
    loader.load().then(
      () => setStatusAndExecuteCallback(STATUS.SUCCESS),
      () => setStatusAndExecuteCallback(STATUS.FAILURE)
    );
  }, []);

  if (status === STATUS.SUCCESS && children) {
    return React.createElement(React.Fragment, null, children);
  }
  return React.createElement(React.Fragment, null);
};
