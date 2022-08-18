import {useParams} from "react-router-dom";

const ClientDetail = () => {
  const { id } = useParams();

  return (
    <>
      <h1>client detail</h1>
    </>
  )

}

export default ClientDetail;