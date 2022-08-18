import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useGetClientDetailByIDMutation} from "../../Redux/Slice/authSlice";

const ClientDetail = () => {
  const [getClientDetailByID, { data }] = useGetClientDetailByIDMutation();

  const { id } = useParams();

  const getData = async () => {
    try {
      await getClientDetailByID(id).unwrap();
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
      {!data?.success === true ? <h2>Loading...</h2> : <><h1>client detail</h1></>}
    </>
  )

}

export default ClientDetail;