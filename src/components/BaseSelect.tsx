import { useEffect, useState } from "react";
import "./BaseUI.css";
interface ISelectProps {
  data: IData[];
  onHandleSelectedValue: (value: string | number) => void;
}

interface IData {
  id: string;
  title: string;
}

const BaseSelect = ({ data, onHandleSelectedValue }: ISelectProps) => {
  const [selectedValue, setValue] = useState<string | number>("");
  const handleSelectValue = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    setValue(value);
  };

  useEffect(() => {
    onHandleSelectedValue(selectedValue);
  }, [onHandleSelectedValue, selectedValue]);
  return (
    <select onChange={(e) => handleSelectValue(e)}>
      {data.map((item: IData, index: number) => {
        return (
          <option value={item.id} key={`options_${index}`}>
            {item.title}
          </option>
        );
      })}
    </select>
  );
};

export default BaseSelect;
