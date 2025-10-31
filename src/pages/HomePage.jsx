import Table from "../components/tables/Table.jsx";
import { useHomePage } from "./hooks/useHomePage.jsx";

const HomePage = () => {
  const { setData, data, columnsDef } = useHomePage();

  const handleClick = () => {

  }

  return (
    <>
      <div className="mx-auto w-full max-w-400">
        
        <Table columnsDef={columnsDef} data={data} />
      </div>
    </>
  );
};

export default HomePage;
