import React, {useEffect, useState} from "react";

const DataTable = ({name, module, rowData, columnsDef, refresh}) => {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [filters, setFilters] = useState([
        {
            name: "Search",
            type: "search",
            value: null,
        },
        {
            name: "pageNumber",
            type: "pagination",
            value: 1,
        },
        {
            name: "pageSize",
            type: "pagination",
            value: 10,
        },
        {
            title: "نمایش فعال ها",
            name: "IsActive",
            type: "toggle",
            value: null,
        },
        {
            title: "نمایش غیر فعال ها",
            name: "IsDeActive",
            type: "toggle",
            value: null,
        },
        {
            title: "کشور",
            name: "CountryId",
            type: "selection",
            api: "/Countries/Selection",
            value: null
        }
    ]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        setColumns(columnsDef)
    }, [columnsDef]);

    const setPage = (page) => {
        setFilters(prev => Array.isArray(prev) ? prev.map(item => item.name === "pageNumber" ? {
            ...item,
            value: page
        } : item) : []);
    }

    const setPageSize = (size) => {
        const currentPageSize = filters.find(f => f.name === "pageSize")?.value;
        if (parseInt(size) === currentPageSize) return;

        setFilters(prev => Array.isArray(prev) ? prev.map(item => item.name === "pageSize" ? {
            ...item,
            value: size
        } : item) : []);
    }

    return (<>
        <div className="bg-white rounded-[14px] w-full p-4 mb-4">
            <TableHeader name={name} setFilters={setFilters} filters={filters}/>
            <div className="w-full mt-4 overflow-x-auto">
                <table
                    className="min-w-full table-fixed border border-gray-300 border-separate border-spacing-0 rounded-xl overflow-hidden">
                    <thead className="h-[36px] bg-[#f0f0f0] text-[#7f7f7f]">
                    <tr>
                        <th className="px-3 text-[15px] font-bold" style={{width: "60px"}}>ردیف</th>
                        {columns.map(column => (<th
                            key={column.field}
                            className="px-3 text-[15px] font-bold text-nowrap"
                            style={{width: column.width ? `${column.width}px` : "auto"}}
                        >
                            {column.title}
                        </th>))}
                    </tr>
                    </thead>
                    {/*ShowData*/}
                    {!isLoading && data !== null && (<>
                        <tbody>
                        {data?.items.map((item, index) => (<>
                            <tr key={item.id}
                                className="h-[48px] hover:bg-gray-50 shadow-[0px_-1px_0px_0px] first:shadow-[#cccccc] not-first:shadow-[#e6e6e6]"
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    setSelectedRow(item);
                                }}
                            >
                                <td className="px-3">
                                <span
                                    className="bg-[#F0F0F0] p-1 px-2 rounded-lg text-gray-500 text-[12px]">{index + 1}</span>
                                </td>
                                {columns.map(column => (<td
                                    key={column.field}
                                    className="px-3 text-[15px] text-nowrap text-gray-600"
                                    style={{width: column.width ? `${column.width}px` : "auto"}}
                                >
                                    <div className={"size-full h-[48px] flex justify-center items-center"}>
                                        {column.render ? column.render({...item, selectedRow}) : item[column.field]}
                                    </div>
                                </td>))}
                            </tr>
                        </>))}
                        </tbody>
                    </>)}
                    {/*Loading*/}
                    {isLoading && (<>
                        <TableLoading length={columns.length + 1}/>
                    </>)}
                </table>

                <Pagination
                    data={data}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    isLoading={isLoading}
                />
            </div>
        </div>

    </>);
};

export {DataTable};
