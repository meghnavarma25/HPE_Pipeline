"use client";
import { useState } from "react";

export default function home(){
  const [text,setText]=useState("");
  const [model,setModel]=useState("default");
  const [prediction,setPrediction]=useState("");
  
  const handlechange=(e)=>{
    e.preventDefault();
    setModel(e.target.value);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const result = await fetch("http://127.0.0.1:8000/classify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      text:text,
      type:model
      }),
    });
    const data = await result.json(); 
    if (data.prediction!=prediction){
      setPrediction(data.prediction)
    }
}
  return (
    <div className="w-full h-screen flex-col">
      <div className=" w-full h-[20%]">
        <select className="modeloption absolute top-20 right-35" value={model} onChange={handlechange}>
          <option value="default">Default</option>
          <option value="Ensemble">Ensemble model</option>
          <option value="Roberta">Roberta</option>
          <option value="Chatgpt">Chatgpt</option>
      </select>
      </div>
    <div className="h-[60%] w-full flex justify-center items-center">
    <div className="w-full flex flex-col justify-center items-center">
      <label>Enter Query</label><br/>
      <input value={text} onChange={(e) => setText((e.target.value))} className="w-[40%] box-border border border-gray-400 p-2 rounded" type="text" />
      <br/>
      <button className="w-[20%] box-border border border-white-400" onClick={handleSubmit}>Predict Class</button><br/><br/>
      {prediction && (
        <>
        <label>Prediction: </label>
        <p>{prediction}</p>
        </>
      )}
    </div>
    </div>
    </div>
  );
}
