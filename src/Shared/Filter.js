import {MultiSelect} from "react-multi-select-component";
import {useEffect, useState} from "react";

const Multi = ({name, options}) => {
  const [selected, setSelected] = useState([]);
  return (
    <div>
      <h2>{name}</h2>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
}

const Filter = ({list}) => {

  // useEffect(() => {
  //   if (selected.length > 0)
  //   {
  //     func(val => [...val, selected.at(- 1)])
  //     console.log("\nSelected in Filter: ", selected);
  //   }
  // }, [selected])
  return(
    <div>
      {list.map((item) => {
          return (item.type === "select" ? <Multi name={item.name} options={item.options}/> : <p>Input Component</p>)
        }
      )}
    </div>
  )

};

export default Filter;