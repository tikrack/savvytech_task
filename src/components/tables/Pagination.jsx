import {ArrowDown2, ArrowLeft2, ArrowRight2} from "iconsax-reactjs";
import React from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner} from "@heroui/react";

const Pagination = ({data, setPage, isLoading, setPageSize}) => {
    if (!data) return null;

    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["10"]))
    const {page, totalPages, hasNextPage, hasPreviousPage, pageSize} = data;

    const handlePrev = () => {
        if (hasPreviousPage && !isLoading) setPage(page - 1);
    };

    const handleNext = () => {
        if (hasNextPage && !isLoading) setPage(page + 1);
    };

    const handleLast = () => {
        if (hasNextPage && !isLoading) setPage(totalPages);
    };

    const handleFirst = () => {
        if (hasPreviousPage && !isLoading) setPage(1);
    };

    const handlePageSizeChange = (size) => {
        if (!isLoading) setPageSize(size);
    }

    const selectedValue = React.useMemo(() => {
        const value = Array.from(selectedKeys).join(", ").replace(/_/g, "")
        handlePageSizeChange(value)
        return value
    }, [selectedKeys]);


    return (<>
        <div className="w-full h-[45px] flex justify-end items-center mt-2 gap-3">
            <Dropdown classNames={{
                content: "min-w-[130px]"
            }}
                      isDisabled={isLoading}
            >
                <DropdownTrigger>
                    <Button variant="bordered" className={"border-1 h-full w-[130px] flex justify-between"}>
                        <ArrowDown2 size={15}/>
                        {selectedValue} آیتم
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    onSelectionChange={setSelectedKeys}
                >
                    <DropdownItem key="10">10 آیتم</DropdownItem>
                    <DropdownItem key="15">15 آیتم</DropdownItem>
                    <DropdownItem key="20">20 آیتم</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <div className="w-[130px] border flex gap-[5px] p-1 h-full border-gray-300 rounded-[14px]">
                {!isLoading && (<>
                    {/*<div*/}
                    {/*    onClick={handleLast}*/}
                    {/*    className={`w-[40px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200 ${*/}
                    {/*        hasNextPage ? "hover:bg-gray-100" : "opacity-40 cursor-not-allowed"*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*    <ArrowRight2 size={20} />*/}
                    {/*</div>*/}
                    <div
                        onClick={handleNext}
                        className={`w-[40px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200 ${hasNextPage ? "hover:bg-gray-100" : "opacity-40 cursor-not-allowed"}`}
                    >
                        <ArrowRight2 size={20}/>
                    </div>
                    <div
                        className="w-[40px] rounded-lg flex justify-center items-center bg-primary text-white text-[14px]">
                        {page}
                    </div>
                    <div
                        onClick={handlePrev}
                        className={`w-[40px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200 ${hasPreviousPage ? "hover:bg-gray-100" : "opacity-40 cursor-not-allowed"}`}
                    >
                        <ArrowLeft2 size={20}/>
                    </div>
                    {/*<div*/}
                    {/*    onClick={handleFirst}*/}
                    {/*    className={`w-[40px] rounded-lg flex justify-center items-center cursor-pointer transition-all duration-200 ${*/}
                    {/*        hasPreviousPage ? "hover:bg-gray-100" : "opacity-40 cursor-not-allowed"*/}
                    {/*    }`}*/}
                    {/*>*/}
                    {/*    <ArrowLeft2 size={20} />*/}
                    {/*</div>*/}
                </>)}
                {isLoading && (<>
                    <div className="size-full flex justify-center items-center">
                        <Spinner size={"sm"} variant={"default"}/>
                    </div>
                </>)}
            </div>
        </div>
    </>);
};

export default Pagination;
