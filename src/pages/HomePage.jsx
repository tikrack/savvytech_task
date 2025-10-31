import Table from "../components/tables/Table.jsx";
import { useHomePage } from "./hooks/useHomePage.jsx";
import Button from "../components/uiparts/Button.jsx";

const HomePage = () => {
  const { data, columnsDef } = useHomePage();

  return (
    <>
      <div className="mx-auto w-full max-w-400 mt-10">
        <Button>افزودن</Button>
        <Table columnsDef={columnsDef} data={data} />
      </div>
    </>
  );
};

export default HomePage;
