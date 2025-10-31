import React from "react";
import {Spinner} from "@heroui/react";

const TableLoading = ({length}) => {
    return (
        <>
            <tbody>
            <tr className={"shadow-[0px_-1px_0px_0px] first:shadow-[#cccccc]"}>
                <td colSpan={length}>
                    <div className="min-h-[300px] w-full flex justify-center flex-col gap-[25px] items-center">
                        <Spinner size={"lg"} className={"scale-[1.2]"} />
                        <span className={"font-[rokh] text-[18px] text-primary font-bold"}>درحال بارگزاری...</span>
                    </div>
                </td>
            </tr>
            </tbody>
        </>
    )
}

export default TableLoading;