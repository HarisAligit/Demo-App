import Table from "react-bootstrap/Table";
import { useGetClientsMutation } from "../../Redux/Slice/authSlice";
import {useEffect, useState} from "react";
import JarvisNavbar from "../../Layout/JarvisNavbar";
import {Link} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import Filter from "../../Shared/Filter";

const Clients = () => {
  const clientType = [], classification = [], salesChannel = [], productCategory = [];
  const [getClients, { data }] = useGetClientsMutation();
  const [selected, setSelected] = useState([]);
  const [args, setArgs] = useState("false");
  const [referenceNumberInput, setReferenceNumberInput] = useState(null);
  const [businessName, setBusinessName] = useState('');

  const pushFilterType = (params, arr, arg) => {
    params.map((item) => {
      arr.push({value: item.id, label: item.name, arg: arg, inputType: "select"})
    });
    return arr;
  }

  const getData = async () => {
    try {
      if (args === "false") {
        await getClients().unwrap();
      }
      else {
        await getClients(args).unwrap();
      }
    }
    catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  useEffect(() => {
    getData();
  }, [args])

  useEffect(() => {
    if (selected.length === 0)
    {
      setArgs("false");
    }
    else {
       let newArgs = "?";
       console.log("\nSelected in arguments", selected);
       selected.map((item) => {
         if (item.inputType === "select") {
           newArgs += "f" + "[" + item.arg + ".id]" + "[]=" + item.value + "&";
         }
         else if (item.inputType === "input") {
           newArgs += "s" + "[" + item.arg + "]=" + item.value + "&";
         }
       });
       setArgs(newArgs.slice(0, -1));
    }
  }, [selected])

  useEffect(() => {
    if (!data?.success === true) {
      getData();
    }
    else {
      if (clientType.length === 0) {
        pushFilterType(data.client_types, clientType, "client_type");
        pushFilterType(data.classifications, classification, "classification");
        pushFilterType(data.sales_channels, salesChannel, "sales_channel");
        pushFilterType(data.product_categories, productCategory, "product_categories");
      }
    }
  }, [data, args]);

  const handleBusiness = (e) => {
     if (e.key === 'Enter') {
       console.log("\nEnter Business Name: ", businessName);
       setSelected(selected => [...selected, {value: businessName, arg: "name", inputType: "input"}]);
       console.log("new SElect", selected);
     }
     else {
       setBusinessName(e.target.value)
     }
  }

  // f[product_categories.id][]=5&f[sales_channel.id][]=2&f[client_type.id][]=4&f[classification.id][]=4
  return (
    <>
      <JarvisNavbar />
      <pre>{selected.map((item) => (
        <p>
          {item.label}
        </p>
      ))}</pre>

      <Button>Reset Filters</Button>

      <h3>Business Name</h3>
      <input type="text" onKeyDown={handleBusiness}></input>
      <Filter arr={clientType} arg={"Client Type"} func={setSelected} val={selected}/>
      <Filter arr={classification} arg={"Classification"} func={setSelected} val={selected}/>
      <Filter arr={salesChannel} arg={"Sales Channel"} func={setSelected} val={selected}/>
      <Filter arr={productCategory} arg={"Product Categories"} func={setSelected} val={selected}/>
      <br /><br />

    {!data?.success === true ? <><Spinner animation="border" role="status">
      </Spinner>
        <h5>Loading...</h5> </> :
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>Ref#</th>
        <th>Business Name</th>
        <th>Client Type</th>
        <th>Status</th>
        <th>Classification</th>
        <th>Sales Channel</th>
        <th>Contact Name</th>
        <th>Contact Phone</th>
        <th>Actions</th>
      </tr>
      </thead>
          {data.clients.map((item ) => (
            <>
              <tbody>
              <tr>
              <td>{item.reference_number}</td>
                <td>{item.name}</td>
                <td>{item.client_type.name}</td>
                <td>{item.status.name}</td>
                <td>{item.classification.name}</td>
                <td>{item.sales_channel.name}</td>
                <td>{item.contacts[0].name}</td>
                <td>{item.contacts[0].phone}</td>
                <td><Link to={`/clients/${item.id}`}>View Details</Link></td>
              </tr>
            </tbody>
            </>
          ))}
    </Table>}
    </>
  );
};

export default Clients;
