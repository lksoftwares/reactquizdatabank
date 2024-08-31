import "./InputQues.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import data from "/src/data.json";
import axios from "axios";
function InputQues() {
  //For type
  const [selectedOption, setSelectedOption] = useState("");
  const handleDropdownChange = (data) => {
    setSelectedOption(data);
  };
  //for topic
  const [selectOptions, setSelectOptions] = useState("");
  function handleChoose(data) {
    setSelectOptions(data);
  }

  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await axios({
          method: "get",
          url: "http://192.168.1.63:7241/Topic/AllTopic",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userOptions = response.data.map((user) => ({
          value: user.topic_ID,
          label: user.topic_Name,
        }));
        setOptions(userOptions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div className="App">
      <form>
        <fieldset>
          <h1>Knowledge Test Quiz</h1>
          <br />
          <div className="drop">
            <label htmlFor=""> Select Topic: </label>

            <Select
              options={options}
              placeholder="Select Topic"
              isSearchable={true}
              value={selectOptions}
              onChange={handleChoose}
              className="dropdown"
            />
          </div>
          <br />
          <div className="drop">
            <label htmlFor=""> Select Typee:</label>
            <Select
              options={data.type}
              placeholder="Select Type"
              value={selectedOption}
              onChange={handleDropdownChange}
              isSearchable={true}
              className="dropdown"
            />
          </div>
          <br />
          <h3>Question Description : </h3>
          <input type="text" placeholder="Enter Question here" />
          <h3>Answer Option</h3>
          {selectedOption.value === "mcq" && (
            <div>
              <input type="text " className="short" placeholder="A" />
              <input type="text" className="option" placeholder="Option A" />
              <span>
                <input
                  type="text "
                  className="short short-box"
                  placeholder="B"
                />
                <input type="text" className="option" placeholder="Option B" />
              </span>

              <input type="text " className="short" placeholder="C" />
              <input type="text" className="option" placeholder="Option C" />
              <span>
                <input
                  type="text "
                  className="short short-box"
                  placeholder="D"
                />
                <input type="text" className="option" placeholder="Option D" />
              </span>
            </div>
          )}

          {selectedOption.value === "fillups" && (
            <div>
              <p>Please fill the correct Answer:</p>
              <input type="text" placeholder="Your answer" />
            </div>
          )}
          {selectedOption.value === "oword" && (
            <div>
              <p>Please fill the correct One Word Answer:</p>
              <input type="text" placeholder="Your answer" />
            </div>
          )}

          <label htmlFor="">Correct Answer: </label>
          <input
            type="dropdown"
            className=" long"
            placeholder="Enter Correct Answer"
          />

          <label htmlFor=""> Remarks: </label>
          <input
            type="dropdown"
            className=" long"
            placeholder="Enter Remarks"
          />
          <span>
            <button className="justify">Submit</button>
            <button type="reset" value="Reset Form">
              Reset
            </button>
          </span>
        </fieldset>
      </form>
    </div>
  );
}
export default InputQues;
