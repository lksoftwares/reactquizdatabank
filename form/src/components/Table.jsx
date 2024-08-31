import React, { useEffect, useState } from "react";
import axios from "axios";
import "/src/components/Table.css";
export default function GetData() {
  const [myData, setmyData] = useState([]);

  const Data = async () => {
    const res = await axios({
      method: "GET",
      url: "http://192.168.1.63:7241/Question/AllQuestions",
      data: myData,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setmyData(response.data);
    });
  };
  useEffect(() => {
    Data();
  }, []);
  return (
    <>
      <div className="card-body">
        <h1>Question Bank</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ques_Desc</th>
              <th>opt_A</th>
              <th>opt_B</th>
              <th>opt_C</th>
              <th>opt_D</th>
            </tr>
          </thead>
          <tbody>
            {myData.map((row) => (
              <tr key={row.ques_ID}>
                <td>{row.ques_Desc}</td>
                <td>{row.opt_A}</td>
                <td>{row.opt_B}</td>
                <td>{row.opt_C}</td>
                <td>{row.opt_D}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
