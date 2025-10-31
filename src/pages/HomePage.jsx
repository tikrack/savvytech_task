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
    handleSubmit,
    formData,
    handleValue,
  } = useHomePage();

  return (
    <>
      <div className="mx-auto w-full max-w-400 mt-10">
        <Button onClick={() => handleOpenModal(false)}>افزودن</Button>
        <Table columnsDef={columnsDef} data={data} />
      </div>

      <Modal show={openModal} onClose={handleCloseModal}>
        <h2 className="text-3xl font-bold text-center font-[rokh] mt-4">
          {isEdit ? "ویرایش کاربر" : "ایجاد کاربر"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full mt-6 flex flex-col gap-4"
        >
          <label htmlFor="name" className="flex flex-col gap-2">
            نام:
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleValue}
              value={formData.name}
              className="border-2 focus-visible:border-primary focus-visible:outline-0 px-2 py-3 rounded-xl w-full border-gray-200"
              placeholder="نام خود را وارد کنید"
              autoFocus
            />
          </label>

          <label htmlFor="description" className="flex flex-col gap-2">
            توضیحات:
            <input
              type="text"
              name="description"
              id="description"
              onChange={handleValue}
              value={formData.description}
              className="border-2 focus-visible:border-primary focus-visible:outline-0 px-2 py-3 rounded-xl w-full border-gray-200"
              placeholder="توضیحات خود را وارد کنید"
            />
          </label>

          <button
            type="submit"
            className="bg-primary px-4 py-2.5 cursor-pointer active:opacity-80 transition-all duration-100 rounded-xl text-white mt-4"
          >
            {isEdit ? "ویرایش" : "ایجاد"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default HomePage;
