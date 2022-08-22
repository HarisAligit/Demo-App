import Table from "react-bootstrap/Table";
import { useGetClientsMutation } from "../../Redux/Slice/authSlice";
import {useEffect, useState} from "react";
import JarvisNavbar from "../../Layout/JarvisNavbar";
import {Link} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import Filter from "../../Shared/Filter";

const Clients = () => {
  const options = [{type: "select", name: "client_types", key: "client_type.id", url: "f[client_type.id][]=", options: []}, {type: "select", name: "product_categories", key: "product_categories.id",  url: "f[product_categories.id][]=", options: []}, {type: "select", name: "sales_channels", key: "sales_channel.id", url: "f[sales_channel.id][]=", options: []}, {type: "select", name: "classifications", key: "classification.id", url: "f[classification.id][]=", options: []}, {type: "input", value: "", key: "s[name]="}];
  const [getClients, { data }] = useGetClientsMutation();
  const [selected, setSelected] = useState({"client_type.id": [], "product_categories.id": [], "sales_channel.id": [], "classification.id": []});
  const [args, setArgs] = useState("false");
  const [businessName, setBusinessName] = useState('');
  const [loaded, setLoaded] = useState([]);

  const pushOptions = (params) => {
    const arr = [];
    params.map((item) => {
      arr.push({value: item.id, label: item.name})
    });
    return arr;
  }

  const resetFilter = () => {
    setSelected([])
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
    // if (selected.length === 0)
    // {
    //   setArgs("false");
    // }
    // else {
    //    let newArgs = "?";
    //    loaded.map((item) => {
    //      if (item.inputType === "select") {
    //        selected[item.key].map(() => {
    //          newArgs += item.url + "&";
    //        })
    //      }
    //      else if (item.inputType === "input") {
    //        // newArgs += "s" + "[" + item.arg + "]=" + item.value + "&";
    //      }
    //    });
    //    setArgs(newArgs.slice(0, -1));
    // }
    console.log("\nSelection made: ", selected);
  }, [selected])

  useEffect(() => {
    if (!data?.success === true) {
      getData();
    }
    else {
      options.forEach((item) => {
        if (item.type == "select") {
          item.options = pushOptions(data[item.name]);
        }
      })
      setLoaded(options);
    }
  }, [data, args]);

  const handleBusiness = (e) => {
     if (e.key === 'Enter') {
       console.log("\nEnter Business Name: ", businessName);
       // setSelected(selected => [...selected, {value: businessName, arg: "name", inputType: "input"}]);
       console.log("new SElect", selected);
     }
     else {
       setBusinessName(e.target.value)
     }
  }

  // f[product_categories.id][]=5&f[sales_channel.id][]=2&f[client_type.id][]=4&f[classification.id][]=4
  return (
    <>
      {/*<JarvisNavbar />*/}
      {/*<pre>{selected.map((item) => (*/}
      {/*  <p>*/}
      {/*    {item}*/}
      {/*  </p>*/}
      {/*))}</pre>*/}

      <Button variant="outline-secondary" onClick={resetFilter}>Reset Filters</Button>

      <h3>Business Name</h3>
      <input type="text" onKeyDown={handleBusiness}></input>
      <br /><br />

    {!data?.success === true ? <><Spinner animation="border" role="status">
      </Spinner>
        <h5>Loading...</h5> </> : <>
      <Filter objArr={selected} list={loaded} func={setSelected} />
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
    </Table>
    </>}
    </>
  );
};

export default Clients;
