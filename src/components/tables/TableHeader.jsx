import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Input,
    Select,
    SelectItem,
    Switch,
    useDisclosure
} from "@heroui/react";
import {Add, Filter, SearchNormal1} from "iconsax-reactjs";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {GET} from "@components/Services/Axios/Methods.js";
import {Alert} from "@components/Globals/Functions/Alert.js";
import {useNavigate} from "react-router";

const TableHeader = ({name, setFilters, filters}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {t} = useTranslation();
    const [selectionData, setSelectionData] = useState();
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    const fetchSelectionOptions = async () => {
        const selectionFilters = filters.filter(f => f.type === "selection");
        const results = {};

        await Promise.all(selectionFilters.map(async filter => {
            try {
                results[filter.name] = await GET(filter.api);
            } catch (error) {
                console.error(`خطا در واکشی ${filter.name}:`, error);
                Alert("خطا در بارگزاری اطلاعات", error, "danger")
                results[filter.name] = [];
            }
        }));

        setSelectionData(results);
    };

    useEffect(() => {
        fetchSelectionOptions();
    }, []);

    const handleAdd = () => {
        navigate("add")
    }

    const filterToggleChange = (e) => {
        const {name, checked} = e.target;

        setFilters(prev => Array.isArray(prev) ? prev.map(item => item.name === name ? {
            ...item, value: checked
        } : item) : []);
    }

    const filterSelectChange = (e, name) => {
        const uniqueArray = [...new Set(e)];
        setValues(prev => ({...prev, [name]: new Set([uniqueArray[0]])}));

        setFilters(prev => Array.isArray(prev) ? prev.map(item => item.name === name ? {
            ...item, value: uniqueArray[0] ?? null
        } : item) : []);
    }

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    function setSearch(value) {
        setFilters(prev => Array.isArray(prev) ? prev.map(item => item.name === "Search" ? {
            ...item, value: value
        } : item) : []);
    }

    const processChange = debounce(setSearch, 800);

    const handleSearch = (e) => {
        const {value} = e.target;
        processChange(value);
    };


    return (<>
        <div className="flex justify-between items-center w-full">
            <div className="gap-4 flex items-center justify-center">
                <Input
                    isClearable
                    name="username"
                    placeholder={`جستجوی ${name}`}
                    type="text"
                    classNames={{base: "w-[330px]", inputWrapper: "border-1"}}
                    variant="bordered"
                    startContent={<SearchNormal1 className="track-2 text-gray-500" size={25}/>}
                    onChange={handleSearch}
                />
                <Button variant="bordered" onPress={onOpen} className="gap-2 font-bold text-gray-800">
                    <Filter size={22}/>
                    <span>فیلتر پیشرفته</span>
                </Button>
            </div>
            <Button color="primary" className="gap-1 font-bold" onPress={handleAdd}>
                <Add size={28}/>
                {!name ? <span>افزودن</span> : <span>{name} جدید</span>}
            </Button>
        </div>

        <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent>
                {(onClose) => (<>
                    <DrawerHeader className="flex flex-col gap-1">{t("ActionFilter")}</DrawerHeader>
                    <DrawerBody className={"flex flex-col gap-5"}>
                        <Divider className={"mb-2"}/>
                        {filters.map((filter) => {
                            return filter.type === "toggle" && (<div className={"flex flex-col gap-2"}>
                                <h3>{filter.title}</h3>
                                <Switch name={filter.name} isSelected={filter.value} onChange={filterToggleChange}/>
                            </div>)
                        })}
                        {filters.map((filter) => {
                            return filter.type === "selection" && (<div className={"flex flex-col gap-2"}>
                                <h3>{filter.title}</h3>
                                <Select
                                    className="max-w-xs"
                                    variant={"bordered"}
                                    selectedKeys={values[filter.name]}
                                    onSelectionChange={(e) => filterSelectChange(e, filter.name)}
                                >
                                    {selectionData?.[filter?.name]?.map((item, index) => (
                                        <SelectItem key={item?.key}>{item?.value}</SelectItem>))}
                                </Select>
                            </div>)
                        })}
                    </DrawerBody>
                    <DrawerFooter className="flex justify-center items-center">
                        <Button color="danger" className="font-bold basis-1/2" variant="light" onPress={onClose}>
                            {t("Close")}
                        </Button>
                        <Button color="primary" className="font-bold basis-1/2" onPress={onClose}>
                            {t("Actions")}
                        </Button>
                    </DrawerFooter>
                </>)}
            </DrawerContent>
        </Drawer>
    </>)
}

export default TableHeader;