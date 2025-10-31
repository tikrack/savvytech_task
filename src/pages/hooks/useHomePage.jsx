import { useState } from "react";

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
      render: () => <>hello</>
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

  return { data, setData, columnsDef };
};

export { useHomePage };
