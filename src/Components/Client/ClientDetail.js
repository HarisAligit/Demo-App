import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Spinner, Card} from "react-bootstrap";
import {useGetClientDetailByIDQuery} from "../../Redux/ApiProvider/jarvisAPIAuth";
import JarvisNavbar from "../../Layout/JarvisNavbar";

const ClientDetail = () => {
  const { id } = useParams();
  const { data } = useGetClientDetailByIDQuery(id);

  useEffect(() => {
    if (data?.success === true) console.log("Data: ", data);
  }, [data]);
  return (
    <>
      {!data?.success === true ? <><Spinner animation="border" role="status">
        </Spinner>
        <h5>Loading...</h5> </>
        : <>
          <JarvisNavbar />
            <br />
              <Card style={{ width: '1800rem' }}>
                <Card.Body>
                  <Card.Title>{data?.client?.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{data?.client?.client_type?.name}{"   "}{data?.client?.status?.name}</Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Card.Text>Monthly Revenue: {data?.client?.monthly_revenue}</Card.Text>
                  <Card.Text>City: {data?.client?.city?.name}</Card.Text>
                  <Card.Text>Sales Channel: {data?.client?.sales_channel?.name}</Card.Text>
                  <Card.Text>Zone: {data?.client?.zone?.name}</Card.Text>
                  <Card.Text>Classification: {data?.client?.classification?.name}</Card.Text>
                  <Card.Text>Upcoming Payment: {data?.client?.next_due_payment === null ? '  ---- ' : data?.client?.next_due_payment}</Card.Text>
                  <Card.Text>Contract Expiry: {new Date(data?.client?.next_completing_contract?.end_date).getDate()}/{new Date(data?.client?.next_completing_contract?.end_date).getMonth()}/{new Date(data?.client?.next_completing_contract?.end_date).getFullYear()}</Card.Text>
                  <Card.Text>Active Contracts: {data?.client?.active_contracts_count}</Card.Text>
                  <Card.Text href="">Assignee: {data?.client?.assignee?.name}</Card.Text>
                </Card.Body>
              </Card>
          <h1>client detail</h1>
        </>}
    </>
  )

}

export default ClientDetail;