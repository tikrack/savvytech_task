import { useState } from "react";
import Button from "../../components/uiparts/Button.jsx";

const useHomePage = () => {
  const defaultValue = {
    id: null,
    name: "",
    description: "",
  };

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(defaultValue);

  const [data, setData] = useState([
    {
      id: 0,
      name: "محمدرضا نصراله‌زاده",
      description: "برنامه‌نویس",
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

  const handleOpenModal = (edit = false) => {
    setOpenModal(true);
    setIsEdit(edit);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEdit(false);
    setFormData(defaultValue);
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
    });
    handleOpenModal(true);
  };

  const handleDelete = (item) => {
    if (!confirm("آیا مطمئن هستید؟")) return;
    setData((prev) => prev.filter((it) => it.id !== item.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) return;

    if (isEdit) {
      const updated = data.map((it) =>
        it.id === formData.id
          ? {
              ...it,
              name: formData.name,
              description: formData.description,
            }
          : it,
      );
      setData(updated);
    } else {
      const newItem = {
        id: data.length ? data[data.length - 1].id + 1 : 0,
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toLocaleDateString("fa-IR"),
        profile: "https://cdn-chat.sstatic.net/chat/img/anon.png",
      };

      setData([...data, newItem]);
    }

    handleCloseModal();
  };

  const columnsDef = [
    { title: "نام", field: "name" },
    { title: "توضیحات", field: "description" },
    { title: "ایجاد شده در", field: "createdAt" },
    {
      title: "تصویر پروفایل",
      render: (props) => (
        <img
          src={props.profile}
          alt={props.name}
          className="size-[38px] border border-gray-300 object-cover rounded-full"
        />
      ),
    },
    {
      title: "عملیات",
      width: 10,
      render: (props) => (
        <>
          <Button
            className="!bg-green-500 !py-2"
            onClick={() => handleEdit(props)}
          >
            ویرایش
          </Button>
          <Button
            className="!bg-red-500 mr-2 !py-2"
            onClick={() => handleDelete(props)}
          >
            حذف
          </Button>
        </>
      ),
    },
  ];

  return {
    data,
    columnsDef,
    openModal,
    handleCloseModal,
    handleOpenModal,
    isEdit,
    handleSubmit,
    formData,
    handleValue,
  };
};

export { useHomePage };
