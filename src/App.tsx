import React, { useState } from "react";
import "./styles/style.scss";
import { Female, Male, Chart } from "./assets/images/index";

interface IState {
  userInput: {
    age: number | undefined;
    weight: number | undefined;
    height: number | undefined;
  };
  result: {
    index: number;
    status: string;
  };
}

function App() {
  const [selected, setSelected] = useState("Male");
  const [result, setResult] = useState({ index: 0, status: "" });

  const [userInput, setUserInput] = useState<IState["userInput"]>({
    age: undefined,
    weight: undefined,
    height: undefined,
  });

  const handleInputChange = (e: any): void => {
    setUserInput({
      ...userInput,
      [e.target.name]: Math.abs(e.target.value) || undefined,
    });
  };

  const isRadioSelected = (value: string): boolean => selected === value;

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setSelected(e.currentTarget.value);

  const calculateBMI = (): void => {
    const { weight, height } = userInput;
    console.log("weight: " + weight, "height: " + height);

    if (weight && height) {
      let status = "";
      let res = (weight / (height * height)) * 10000;
      res = Number(res.toFixed(2));
      if (res <= 18.4) {
        status = "Underweight";
      } else if (res >= 18.5 && res <= 24.9) {
        status = "Normal";
      } else if (res >= 25.0 && res <= 39.9) {
        status = "Overweight";
      } else {
        status = "Obese";
      }
      setResult({ index: res, status: status });
    }
  };

  return (
    <div className="App">
      <div className="container-left">
        <img className="chart-img" src={Chart} alt="chart"></img>
        <img
          className="body-img"
          src={selected === "Male" ? Male : Female}
          style={{
            scale: `clamp(0,${(userInput.height || 250) / 250},1)`,
          }}
          alt="male/female"
        ></img>
      </div>
      <div className="container-right">
        <h1 className="heading">Body Mass Index(BMI) Calculator</h1>

        <div className="options">
          <div className="option_gender">
            <div className="selector-item">
              <input
                className="selector-item_radio"
                type="radio"
                id="html"
                name="selector"
                value="Male"
                checked={isRadioSelected("Male")}
                onChange={handleGenderChange}
              />
              <label className="selector-item_label" htmlFor="html">
                Male
              </label>
            </div>

            <div className="selector-item">
              <input
                className="selector-item_radio"
                type="radio"
                id="css"
                name="selector"
                value="Female"
                checked={isRadioSelected("Female")}
                onChange={handleGenderChange}
              />
              <label className="selector-item_label" htmlFor="css">
                Female
              </label>
            </div>
          </div>
          <div className="option_others">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              name="age"
              value={userInput.age || ""}
              onChange={handleInputChange}
            />
            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              placeholder="Enter your weight"
              name="weight"
              value={userInput.weight || ""}
              onChange={handleInputChange}
            />
            <label htmlFor="height">Height (cm)</label>
            <input
              id="height"
              type="number"
              placeholder="Enter your height"
              name="height"
              value={userInput.height || ""}
              onChange={handleInputChange}
            />
          </div>
          <button className="button" onClick={calculateBMI}>
            Calculate
          </button>
          {result.status && (
            <div className="result">
              <p className="result-index">BMI: {result.index}</p>
              <p className="result">Status: {result.status}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
