import {MultiSelect} from "react-multi-select-component";
import {useEffect, useState} from "react";

const Filter = ({arr, arg, func, val}) => {

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected.length > 0)
    {
      func(val => [...val, selected.at(- 1)])
      console.log("\nSelected in Filter: ", selected);
    }
  }, [selected])

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