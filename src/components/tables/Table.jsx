import React from "react";

const Table = ({ data, columnsDef }) => {
  return (
    <>
      <div className="bg-white rounded-[14px] w-full p-4 mb-4">
        <div className="w-full mt-4 overflow-x-auto">
          <table className="min-w-full table-fixed border border-gray-300 border-separate border-spacing-0 rounded-xl overflow-hidden">
            <thead className="h-[36px] bg-[#f0f0f0] text-[#7f7f7f]">
              <tr>
                <th
                  className="px-3 text-[15px] font-bold"
                  style={{ width: "60px" }}
                >
                  ردیف
                </th>
                {columnsDef?.map((column) => (
                  <th
                    key={column.field}
                    className="px-3 text-[15px] font-bold text-nowrap"
                    style={{
                      width: column.width ? `${column.width}px` : "auto",
                    }}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            {data !== null && (
              <>
                <tbody>
                  {data?.map((item, index) => (
                    <>
                      <tr
                        key={item.id}
                        className="h-[48px] hover:bg-gray-50 shadow-[0px_-1px_0px_0px] first:shadow-[#cccccc] not-first:shadow-[#e6e6e6]"
                      >
                        <td className="px-3">
                          <span className="bg-[#F0F0F0] p-1 px-2 rounded-lg text-gray-500 text-[12px]">
                            {index + 1}
                          </span>
                        </td>
                        {columnsDef?.map((column) => (
                          <td
                            key={column.field}
                            className="px-3 text-[15px] text-nowrap text-gray-600"
                            style={{
                              width: column.width
                                ? `${column.width}px`
                                : "auto",
                            }}
                          >
                            <div
                              className={
                                "size-full h-[48px] flex justify-center items-center"
                              }
                            >
                              {column.render
                                ? column.render(item)
                                : item[column.field]}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
