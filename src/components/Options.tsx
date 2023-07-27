import React from "react";

interface Props {
  options: string[];
  handleCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    option: string
  ) => void;
  handleRadio: (selectedOption: string) => void;
  formType: string;
}

const Options = ({ options, handleCheck, handleRadio, formType }: Props) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option} className="flex">
          {formType === "checkbox" ? (
            <input
              onChange={(e) => handleCheck(e, option)}
              type="checkbox"
            ></input>
          ) : (
            <input
              onChange={() => handleRadio(option)}
              name="myRadio"
              value={option}
              type="radio"
            ></input>
          )}
          <p className="border text-red-500">{option}</p>
        </div>
      ))}
    </div>
  );
};

export default Options;
