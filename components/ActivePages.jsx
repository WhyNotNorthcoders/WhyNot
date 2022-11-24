import Tabbar from "./Tabbar";
import { userContext } from "../context";
import { useContext } from "react";

const ActivePages = () => {
  const { userData } = useContext(userContext);
  return (
    <>
      <Tabbar userData={userData} />
    </>
  );
};

export default ActivePages;
