import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useAddItems() {
  const [values, setvalues] = useState({
    onEdit: "",
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
      url: "https://langtransapi.herokuapp.com/record",
    }).then((resp) => {
      setvalues({ ...values, fetched: resp.data, onEdit: "" }); //
      console.log(values);
    });
  };

  const useUpdate = (e) => {
    setValue((value) => value + 1); // update the state to force render
    // send for record http://localhost:9000/
    if (values.key !== "") {
      axios({
        method: "post",
        withCredentials: true,
        data: { key: values.key, onEdit: values.onEdit },
        url: "https://langtransapi.herokuapp.com/record",
      }).then((resp) => {
        setvalues({ ...values, fetched: resp.data, onEdit: "" }); //
        getter(); // update the state to force render
      });
    }
    getter();
    setvalues({ ...values, onEdit: "" });
  };
  const onChange = (e) => {
    var str = e.target.value;
    var key_ = str.split(" ").join("_").toLowerCase();
    var m_key = key_.replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "");
    setvalues({ ...values, key: m_key, onEdit: e.target.value });
    setValue((value) => value + 1); // update the state to force render
  };

  return (
    <div>
      <table style={{ minWidth: "50vw", maxWidth: "50vw" }}>
        <tbody>
          <tr>
            <th>English</th>
            <th>Key</th>
            <th>French</th>
          </tr>
          <tr>
            <td>
              <textarea
                onBlur={useUpdate}
                placeholder="Paste Text"
                value={values.onEdit}
                onChange={onChange}
                style={{ borderWidth: "0px", border: "none" }}
              ></textarea>
            </td>
            <td>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    "{{__('alltrans." + values.key + "')}}"
                  )
                }
              >
                Copy
              </button>
            </td>
            {values.key !== "" ? (
              <td style={{ maxWidth: "200px", overflowWrap: "break-word" }}>
                {"{{__('alltrans."}
                {values.key}
                {"')}}"}
              </td>
            ) : (
              <td></td>
            )}
          </tr>

          {values.fetched.map((item) => (
            <tr key={item._id}>
              <td>{item.English}</td>
              <td style={{ maxWidth: "200px", overflowWrap: "break-word" }}>
                {"{{__('alltrans."}
                {item.key}
                {"')}}"}
              </td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
