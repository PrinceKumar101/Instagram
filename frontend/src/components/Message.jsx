import axios_setup from "@/assets/Axios";
import React, { useEffect, useState } from "react";

const Message = () => {
  const [data, setdata] = useState();
  const [error, seterror] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios_setup.get("/message");
        setdata(res.data);
        console.log("Data fetched:", res.data);
      } catch (error) {
        seterror(error);
        console.error("Error fetching data:", error);
      }
      console.log("Fetch completed");
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>{data ? data.message : "loading"}</div>
      <div>{error}</div>
    </>
  );
};

export default Message;
