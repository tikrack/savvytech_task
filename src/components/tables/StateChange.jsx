import {Spinner, Switch} from "@heroui/react";
import {useEffect, useState} from "react";
import {PUT} from "@components/Services/Axios/Methods.js";

const StateChange = ({selected, fetch, isChangeable = true}) => {
    const [loading, setLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(selected)
    }, [selected]);

    const handleChange = async () => {
        if (!isChangeable) return

        setLoading(true);

        try {
            const res = await PUT(fetch?.url, {[fetch.field]: fetch.id})

            if (res.status === 200) {
                console.log("ok")
                setIsSelected(prev => !prev);
                fetch?.refresh?.()
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    return (<>
        <div className={"w-14 flex justify-center items-center"}>
            {!loading && (
                <Switch isSelected={isSelected} size={"sm"} isReadOnly={!isChangeable} onChange={handleChange}/>)}

            {loading && (<>
                <Spinner size={"sm"}/>
            </>)}
        </div>
    </>)
}

export default StateChange;