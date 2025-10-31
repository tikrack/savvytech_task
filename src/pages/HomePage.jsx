import Table from "../components/tables/Table.jsx";
import { useHomePage } from "./hooks/useHomePage.jsx";

const HomePage = () => {
  const { setData, data, columnsDef } = useHomePage();

  const handleClick = () => {

  }

  return (
    <>
      <Table columnsDef={columnsDef} data={data} />
      <button onClick={handleClick}>click Me</button>
    </>
  );
};

export default HomePage;
