import Table from "../components/tables/Table.jsx";
import { useHomePage } from "./hooks/useHomePage.jsx";
import Button from "../components/uiparts/Button.jsx";
import Modal from "../components/uiparts/Modal.jsx";

const HomePage = () => {
  const {
    data,
    columnsDef,
    openModal,
    handleCloseModal,
    handleOpenModal,
    isEdit,
  } = useHomePage();

  return (
    <>
      <div className="mx-auto w-full max-w-400 mt-10">
        <Button onClick={handleOpenModal}>افزودن</Button>
        <Table columnsDef={columnsDef} data={data} />
      </div>
      <Modal show={openModal} onClose={handleCloseModal}>
        <h2>
          {isEdit ? " ویرایش " : " ایجاد "}
          کاربر
        </h2>
      </Modal>
    </>
  );
};

export default HomePage;
