import {MultiSelect} from "react-multi-select-component";
import {useEffect, useState} from "react";

const Multi = ({name, options, func, nameid, objArr}) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    func({...objArr, [nameid]: selected.map(s => s.value)});

  }, [selected])

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

const Filter = ({list, func, objArr}) => {

  return(
    <div>
      {list.map((item) => {
          return (item.type === "select" ? <Multi name={item.name} options={item.options} nameid={item.key} func={func} objArr={objArr}/> : <p>Input Component</p>)
        }
      )}
    </div>
  )

};

export default Filter;