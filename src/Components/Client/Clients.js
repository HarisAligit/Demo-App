import Table from "react-bootstrap/Table";
import { useGetClientsQuery } from "../../Redux/ApiProvider/jarvisAPI";
import {useEffect, useState} from "react";
import JarvisNavbar from "../../Layout/JarvisNavbar";
import {Link, useNavigate} from "react-router-dom";
import {Button, Spinner} from "react-bootstrap";
import Filter from "../../Shared/Filter";
import {useDispatch} from "react-redux";

const Clients = () => {
  const options = [{type: "select", name: "client_types", key: "clients_type.id", url: "f[client_type.id][]=", options: []}, {type: "select", name: "product_categories", key: "product_categories.id",  url: "f[product_categories.id][]=", options: []}, {type: "select", name: "sales_channels", key: "sales_channel.id", url: "f[sales_channel.id][]=", options: []}, {type: "select", name: "classifications", key: "classification.id", url: "f[classification.id][]=", options: []}, {type: "input", key: "name", url: "s[name]="}];
  const [selected, setSelected] = useState({"clients_type.id": [], "product_categories.id": [], "sales_channel.id": [], "classification.id": []});
  const [args, setArgs] = useState('');
  const {data} = useGetClientsQuery(args);
  const [businessName, setBusinessName] = useState('');
  const [loaded, setLoaded] = useState([]);
  const [page, setPage] = useState(1)
  let navigate = useNavigate();

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

  const changePage = (val) => {
    if (val != 0)
    {
      setPage(val);
    }
  }

  useEffect(() => {
    let res = Object.keys(selected).every(function(key){
        return selected[key].length === 0
    });
    let newArgs = "?";
    if (res === true)
    {
      setArgs("false");
    }
    else {
      options.map((item) => {
        if (item.type === "select") {
          console.log(selected[item.key]);
          selected[item.key].forEach((val) => {
            newArgs += item.url + val + "&";
          })
        } else if (item.type === "input") {
          // if (selected[item.key] !== "") {
          //   newArgs += item.url + selected[item.key] + "&";
          // }
        }
      });
    }
      newArgs += "page=" + page;
      setArgs(newArgs);
      // console.log("\nNew Link", navigate(-1));
  }, [selected, page])

  useEffect(() => {
    if (data?.success === true) {
        if (loaded.length === 0) {
          options.forEach((item) => {
            if (item.type == "select") {
              item.options = pushOptions(data[item.name]);
            }
          })
          console.log('\nSetting Data: ');
          setLoaded(options);
        }
      }
  }, [data]);

  return (
    <>
      <JarvisNavbar />
      {/*<pre>{selected.map((item) => (*/}
      {/*  <p>*/}
      {/*    {item}*/}
      {/*  </p>*/}
      {/*))}</pre>*/}

      <Button variant="outline-secondary" onClick={() => resetFilter}>Reset Filters</Button>

    {!data?.success === true ? <><Spinner animation="border" role="status">
      </Spinner>
        <h5>Loading...</h5> </> : <>
      <Filter objArr={selected} list={loaded} func={setSelected} setName={setBusinessName} title={"Business Name"} Name={businessName}/>
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
      <Button variant="secondary" onClick={() => changePage(page - 1)}>Prev</Button>
      <Button variant="secondary" onClick={() => changePage(page + 1)}>Next</Button>
    </>}
    </>
  );
};

export default Clients;
