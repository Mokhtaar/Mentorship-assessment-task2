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
        <div
          key={option}
          className="flex justify-center items-center mt-5 mb-5"
        >
          {formType === "checkbox" ? (
            <input
              className="w-5 h-5"
              onChange={(e) => handleCheck(e, option)}
              type="checkbox"
            ></input>
          ) : (
            <input
              className="w-5 h-5"
              onChange={() => handleRadio(option)}
              name="myRadio"
              value={option}
              type="radio"
            ></input>
          )}
          <p className="border bg-green-200 ml-2 text-center w-full">
            {option}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Options;
