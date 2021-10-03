import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-edit-text/dist/index.css";

export default function useTranslate(props) {
  const Language = props.match.params.language;
  const [values, setvalues] = useState({
    onEdit: "",
    id: "",
    fetched: [],
    key: "",
    value: "",
    init: "",
    lang: "",
  });
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      data: { key: values.key, onEdit: values.onEdit },
      url: "https://langtransapi.herokuapp.com/record",
    }).then((resp) => {
      setvalues({ ...values, fetched: resp.data, onEdit: "" }); //
    });
  }, []);

  const handleChange = (e) => {
    setvalues({ ...values, onEdit: e.target.value });
  };

  const blur = () => {
    axios({
      method: "post",
      withCredentials: true,
      data: { key: values.id, language: Language, onEdit: values.onEdit },
      url: "https://langtransapi.herokuapp.com/save",
    }).then((resp) => {
      setvalues({ ...values, fetched: resp.data, onEdit: "", id: "" }); //
    });
  };

  return (
    <div style={{ maxWidth: "900px", width: "auto" }}>
      <table style={{ overflowX: "hidden" }}>
        <tr>
          <th>English</th>
          <th>{Language}</th>
        </tr>
        {values.fetched.map((item) => (
          <tr key={item.key}>
            <td tyle={{ overflowWrap: "break-word", wordBreak: "break-all" }}>
              {item.English}
            </td>
            <td
              style={{
                overflowWrap: "break-word",
                wordBreak: "break-all",
                borderLeft: "1px solid #c1c1c1",
                minWidth: "30vw",
              }}
            >
              {values.id === item.key ? (
                <textarea
                  style={{
                    wordBreak: "break-all",
                    maxWidth: "30vw",
                    overflowWrap: "break-word",
                  }}
                  name="current"
                  placeholder="Type here..."
                  value={values.onEdit}
                  id={item.key}
                  onChange={handleChange}
                  //   onFocusCapture={() => handleFocus(item.key)}
                  onBlur={blur}
                />
              ) : (
                <span
                  onClick={() =>
                    setvalues({
                      ...values,
                      id: item.key,
                      onEdit:
                        Language === "French"
                          ? item.French
                          : Language === "Kiswahili"
                          ? item.Kiswahili
                          : item.Indonesia,
                    })
                  }
                >
                  {item[Language] !== "" ? (
                    Language === "French" ? (
                      item.French
                    ) : Language === "Kiswahili" ? (
                      item.Kiswahili
                    ) : (
                      item.Indonesia
                    )
                  ) : (
                    <span style={{ color: "#cccccc" }}>Type here...</span>
                  )}
                </span>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
