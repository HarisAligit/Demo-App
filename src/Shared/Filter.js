import {MultiSelect} from "react-multi-select-component";
import {useState} from "react";

const Filter = (arr, arg) => {

  const [selected, setSelected] = useState([]);

  return (
    <div>
      <h2>{arg}</h2>
      <MultiSelect
        options={arr}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default Filter;