import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useOutputs() {
  const [values, setvalues] = useState({
    fetched: [],
    key: "",
    value: "",
    init: "",
  });

  const [value, setValue] = useState(0); // integer state

  const getter = () => {
    axios({
      method: "get",
      withCredentials: true,
      data: { key: values.key, onEdit: values.onEdit },
      url: "http://localhost:9000/record",
    }).then((resp) => {
      setvalues({ ...values, fetched: resp.data }); //
      console.log(resp.data);
    });
  };

  useEffect(() => {
    getter();
  }, []);

  return (
    <div>
      {"<?php"}
      <br />
      {"// this is alltrans.php"}
      <br />
      return[
      <div style={{ marginLeft: "4em" }}>
        {values.fetched.map((item) => (
          <span key={item.key}>
            "{item.key}"{"=>"}"{item.English}",
            <br />
          </span>
        ))}
      </div>
      ];
    </div>
  );
}
