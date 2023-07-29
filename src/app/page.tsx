"use client";
import Options from "@/components/Options";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Form {
  title: string;
  options: string[];
  indices: number[];
  index: number | null;
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

  const getCorrectAnswerIndices = (): number[] => {
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
    const indices = getCorrectAnswerIndices();
    setCorrectAnswerIndices(indices);
  }, [correctAnswers]);

  const handleRadio = (option: string) => {
    const index = options.indexOf(option);
    if (index !== -1) {
      setRadioCorrectAnswerIndex(index);
    }
  };

  const addForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const answers = formType === "checkbox" ? correctAnswerIndices : [];
    const answer = formType === "radio" ? radioCorrectAnswerIndex : null;

    const newForm: Form = {
      title: titleInputValue,
      options,
      indices: answers,
      index: answer,
    };

    setAddedForms((prevAddedForms) => [...prevAddedForms, newForm]);
    setTitleInputValue("");
    setOptions([]);
  };

  useEffect(() => {
    console.log(addedForms);
  }, [addedForms]);

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
          <div className="space-y-6">
            <input
              className="border w-full p-2 text-center placeholder:text-black bg-blue-300"
              type="text"
              value={titleInputValue}
              onChange={(e) => setTitleInputValue(e.target.value)}
              placeholder="Input field for question title"
            />
            <input
              className="border placeholder:text-black bg-blue-300 text-center p-2 w-full"
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
            <Options
              options={options}
              handleCheck={handleCheck}
              handleRadio={handleRadio}
              formType={formType}
            />
          </div>
          <button type="submit" className="bg-green-500 w-[%] mx-auto p-2">
            Sumbit button
          </button>
        </form>
      )}
      <div className="absolute right-[20%]">
        {addedForms.map((form) => (
          <div className="space-y-10" key={form.title}>
            <h1>{form.title}</h1>
            <div>
              {form.options.map((option) => (
                <p key={option}>{option}</p>
              ))}
            </div>
            <div>
              <p className={`${form.indices?.length === 0 ? "hidden" : "block"}`}>
                Correct answer indices:
                {form.indices!.map((index) => (
                  <p key={index}>{index}</p>
                ))}
              </p>
              <p className={`${form.index === null ? "hidden" : "block"}`}>Correct answer index: {form.index}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
