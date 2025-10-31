import { useState } from "react";
import Button from "../../components/uiparts/Button.jsx";

const useHomePage = () => {
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
      render: (props) => <>
        <Button className={"!bg-green-500 !py-2"} onClick={() => handleEdit(props)}>ویرایش</Button>
        <Button className={"!bg-red-500 mr-2 !py-2"} onClick={() => handleDelete(props)}>حذف</Button>
      </>
    },
  ];

  const [data, setData] = useState([
    {
      name: "محمد رضا نصراله زاده",
      description: "برنامه نویس",
      createdAt: new Date().toLocaleDateString('fa-IR'),
      profile: "https://cdn-chat.sstatic.net/chat/img/anon.png",
    },
  ]);

  const handleEdit = (item) => {
    console.log(item);
  }

  const handleDelete = (item) => {
    console.log(item);
  }

  return { data, setData, columnsDef };
};

export { useHomePage };
