import Table from 'react-bootstrap/Table';
import {useGetClientsQuery} from "../../Redux/Slice/authSlice"
import {useEffect} from "react";

const Clients = () => {
  const { data, error, isLoading } = useGetClientsQuery();

  // const getData = async () => {
  //   try {
  //     await getClients().unwrap();
  //     console.log(response.data)
  //   }
  //   catch (err) {
  //     console.log(`Error: ${err}`)
  //   }
  // }

  useEffect(() => {

  }, [])

  return (
    <Table striped bordered hover>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <> data </>
      ) : null}
      <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td colSpan={2}>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </Table>
  );
}

export default Clients;