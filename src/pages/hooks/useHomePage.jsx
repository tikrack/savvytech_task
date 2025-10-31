import { useState } from "react";
import Button from "../../components/uiparts/Button.jsx";

const useHomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columnsDef = [
    {
      title: "نام",
      field: "name",
    },
    {
      title: "توضیحات",
      field: "description",
    },
    {
      title: "ایجاد شده در",
      field: "createdAt",
    },
    {
      title: "تصویر پروفایل",
      render: (props) => (
        <img
          src={props.profile}
          alt={""}
          className={
            "size-[38px] border border-gray-300 object-cover overflow-hidden rounded-full"
          }
        />
      ),
    },
    {
      title: "عملیات",
      width: 10,
      render: (props) => (
        <>
          <Button
            className={"!bg-green-500 !py-2"}
            onClick={() => handleEdit(props)}
          >
            ویرایش
          </Button>
          <Button
            className={"!bg-red-500 mr-2 !py-2"}
            onClick={() => handleDelete(props)}
          >
            حذف
          </Button>
        </>
      ),
    },
  ];

  const [data, setData] = useState([
    {
      id: 0,
      name: "محمد رضا نصراله زاده",
      description: "برنامه نویس",
      createdAt: new Date().toLocaleDateString("fa-IR"),
      profile: "https://cdn-chat.sstatic.net/chat/img/anon.png",
    },
    {
      id: 1,
      name: "علی گیاهی",
      description: "طراح",
      createdAt: new Date().toLocaleDateString("fa-IR"),
      profile: "https://cdn-chat.sstatic.net/chat/img/anon.png",
    },
  ]);

  const handleEdit = (item) => {
    handleOpenModal(true);
  };

  const handleDelete = (item) => {
    if (!confirm("ایا مطمئن هستید؟")) return;

    const result = data.filter(it => item.id !== it.id);

    setData(result)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEdit(false);
  };

  const handleOpenModal = (edit) => {
    setOpenModal(true);
    if (edit === true) {
      setIsEdit(true);
    }
  };

  return {
    data,
    setData,
    columnsDef,
    openModal,
    handleCloseModal,
    handleOpenModal,
    isEdit,
  };
};

export { useHomePage };
