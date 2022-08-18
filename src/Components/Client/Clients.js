import Table from "react-bootstrap/Table";
import { useGetClientsMutation } from "../../Redux/Slice/authSlice";
import {useEffect, useState} from "react";
import JarvisNavbar from "../../Layout/JarvisNavbar";
import {Link} from "react-router-dom";

const Clients = () => {
  const [getClients, { data }] = useGetClientsMutation();

  const getData = async () => {
    try {
      await getClients().unwrap();
    }
    catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  useEffect(() => {
    if (!data?.success === true) getData();
    else {
      console.log(data)
    }
  }, [data]);

  return (
    <>
      <JarvisNavbar />
    {!data?.success === true ? <h2>Loading....</h2> :
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
                <Link to={`/clients/${item.id}`}><td>View Details</td></Link>
              </tr>
            </tbody>
            </>
          ))}
    </Table>}
    </>
  );
};

export default Clients;
