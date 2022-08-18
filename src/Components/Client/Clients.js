import Table from "react-bootstrap/Table";
import { useGetClientsMutation } from "../../Redux/Slice/authSlice";
import {useEffect, useState} from "react";
import JarvisNavbar from "../../Layout/JarvisNavbar";
import {Link} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";

const Clients = () => {
  const [getClients, { data }] = useGetClientsMutation();
  const [clientType, setClientType] = useState([]);
  const [classification, setClassification] = useState([]);
  const [salesChannel, setSalesChannel] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [selected, setSelected] = useState([]);


  const pushClientType = (params, arr) => {
    params.map((item) => {
      arr.push({value: item.id, label: item.name})
    });
    return arr;
  }

  const getData = async () => {
    try {
      await getClients().unwrap();
    }
    catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  const DisplayMultiSelect = (arr, arg) => {
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
    )
  }

  useEffect(() => {
    if (!data?.success === true) getData();
    else {
      console.log("\nData: ", data)
      if (clientType.length === 0) {
        pushClientType(data.client_types, clientType, setClientType);
        pushClientType(data.classifications, classification, setClassification);
        pushClientType(data.sales_channels, salesChannel, setSalesChannel);
        pushClientType(data.product_categories, productCategory, setProductCategory);
        console.log("\nOwn Client: ", clientType);
        console.log("\nOwn Classification: ", classification);
        console.log("\nOwn Sales Channel: ", salesChannel);
      }console.log("\nOwn Prod Cats: ", productCategory);
    }
  }, [data]);

  return (
    <>
      <JarvisNavbar />
      <pre>{selected.map((item) => (
        <p>
          {item.label}
        </p>
      ))}</pre>
      {DisplayMultiSelect(clientType, "Client Type")}
      {DisplayMultiSelect(classification, "Classification")}
      {DisplayMultiSelect(salesChannel, "Sales Channel")}
      {DisplayMultiSelect(productCategory, "Product Categories")}
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
