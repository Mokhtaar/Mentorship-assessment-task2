"use client";
import Options from "@/components/Options";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Form {
  title: string;
  options: string[];
  indices: number[] | number;
}

export default function Home() {
  const [formType, setFormType] = useState<string>();
  const [addedForms, setAddedForms] = useState<Form[]>([]);
  const [titleInputValue, setTitleInputValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [correctAnswerIndices, setCorrectAnswerIndices] = useState<number[]>(
    []
  );
  const [radioCorrectAnswerIndex, setRadioCorrectAnswerIndex] =
    useState<number>(0);

  const addOption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOptions([...options, inputValue]);
    setInputValue("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheck = async (
    event: ChangeEvent<HTMLInputElement>,
    option: string
  ) => {
    if (event.target.checked) {
      setCorrectAnswers([...correctAnswers, option]);
    } else {
      setCorrectAnswers((prevCorrectAnswers) =>
        prevCorrectAnswers.filter((correctAnswer) => correctAnswer !== option)
      );
    }
  };

  const getCorrectAnswerIndices = (
    options: string[],
    correctAnswers: string[]
  ): number[] => {
    const uniqueIndices = new Set<number>();
    correctAnswers.forEach((correctAnswer) => {
      const index = options.indexOf(correctAnswer);
      if (index !== -1) {
        uniqueIndices.add(index);
      }
    });
    const uniqueIndicesArray = Array.from(uniqueIndices);
    return uniqueIndicesArray;
  };

  useEffect(() => {
    const indices = getCorrectAnswerIndices(options, correctAnswers);
    setCorrectAnswerIndices(indices);
  }, [correctAnswers]);

  const handleRadio = (option: string) => {
    const index = options.indexOf(option);
    if (index !== -1) {
      setRadioCorrectAnswerIndex(index);
    }
  };

  useEffect(() => {
    console.log(addedForms);
  }, [addedForms]);

  const addForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const answers =
      formType === "checkbox" ? correctAnswerIndices : radioCorrectAnswerIndex;

    const newForm: Form = {
      title: titleInputValue,
      options,
      indices: answers,
    };

    setAddedForms((prevAddedForms) => [...prevAddedForms, newForm]);

    setTitleInputValue("");
    setOptions([]);
  };

  return (
    <div className="pt-28 flex flex-col justify-center items-center">
      <select
        defaultValue="choose"
        onChange={(e) => {
          setFormType(e.target.value),
            setTitleInputValue(""),
            setInputValue(""),
            setOptions([]);
        }}
        className="absolute bg-green-500 p-2 rounded top-10"
      >
        <option value="choose" disabled>
          Choose option
        </option>
        <option value="checkbox">checkbox</option>
        <option value="radio">radio</option>
      </select>
      {formType && (
        <form
          onSubmit={addForm}
          className="flex flex-col space-y-8 border w-96 "
        >
          <input
            className="border p-2 text-center"
            type="text"
            value={titleInputValue}
            onChange={(e) => setTitleInputValue(e.target.value)}
            placeholder="Input field for question title"
          />
          <div>
            <input
              className="border p-2 w-full text-center"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Input field for answer choices"
            />
            <button
              onClick={(e) => addOption(e)}
              className="absolute bg-green-500 p-2"
            >
              Add option
            </button>
          </div>
          <Options
            options={options}
            handleCheck={handleCheck}
            handleRadio={handleRadio}
            formType={formType}
          />
          <button type="submit" className="bg-green-500 p-2">
            sumbit
          </button>
        </form>
      )}
      {/* <div>
        {addedForms.map((form) => (
          <div key={form.title}>
            <h1>{form.title}</h1>
            {form.options.map((option) => (
              <p key={option}>{option}</p>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
}
