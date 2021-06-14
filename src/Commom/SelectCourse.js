import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { CourseAPI } from '../Service';

const SelectCourseComp = React.forwardRef(({
    onSelected = () => { },
    items = 0,
    Disabled = false,
    font = "font-20",
    title = "Khoá học(*)"
}, ref) => {

    const [data, setData] = useState([])
    const [valueS, setValueS] = useState()

    const onSelecteItem = (item) => {
        onSelected(item)
        setValueS(item);
    }
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                //const params = { _page: 1, _limit: 10 };
                const response = await CourseAPI.getAll();
                
                const FirstData = {value:0, label: title}
                let dataSelect = [];
                dataSelect.push(FirstData);
                response.forEach((element,index) => {
                    dataSelect.push({value:element.courseId,label:element.name});
                });
                setData(dataSelect);
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchProductList();
    }, []);



    useEffect(() => {
        if (items != 0) {
            setValueS(data.filter(a => a.value === items));
        } else {
            setValueS({ value: 0, label: title});
        }
    }, [items]);
    return (

        <Select
            className={`SelectMeno ${font}`}
            styles={{ color: '#c7c3c3' }}
            value={valueS}
            onChange={onSelecteItem}
            options={data}
            isDisabled={Disabled}
            ref={ref}
        />
    )
}
);
export const SelectCourse = React.memo(SelectCourseComp)