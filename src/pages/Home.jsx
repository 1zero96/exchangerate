import React, { useEffect, useState } from "react";
import { conversion, exchange } from "../api/exchange";

export default function Home() {
  useEffect(() => {
    conversion().then((data) => SetRegion(data));
    setFromSelected("KRW");
    setToSelected("USD");
  }, []);
  const [region, SetRegion] = useState([]);
  const [fromSelected, setFromSelected] = useState("");
  const [toSelected, setToSelected] = useState("");
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [selectText, setSelectText] = useState(false);

  const handleFromSelected = (e) => {
    const target = e.target.value;
    setFromSelected(target);
    exchange(target, toSelected, fromInput).then((data) => setToInput(data));
    setSelectText(false);
  };
  const handleToSelected = (e) => {
    const target = e.target.value;
    setToSelected(target);
    exchange(target, fromSelected, toInput).then((data) => setFromInput(data));
    setSelectText(true);
  };
  const handleFromInput = (e) => {
    const target = e.target.value;
    setFromInput(target);
    if (target === "") {
      setToInput("");
    } else {
      exchange(fromSelected, toSelected, target).then((data) => setToInput(data));
    }
    setSelectText(false);
  };
  const handleToInput = (e) => {
    const target = e.target.value;
    setToInput(target);
    console.log(target);
    if (target === "") {
      setFromInput("");
    } else {
      exchange(toSelected, fromSelected, target).then((data) => setFromInput(data));
      setSelectText(true);
    }
  };
  return (
    <>
      <section className="h-full">
        <div className="flex justify-center items-center h-1/6 font-bold text-2xl text-gray-200  bg-lightBlue">
          <h2>Exchange API</h2>
        </div>
        <div className="flex flex-col justify-center items-center h-5/6 bg-lightBrown">
          {fromInput && toInput !== "0" && (
            <p className="w-full text-center text-xl font-bold pb-4 text-gray-800">
              {selectText ? toInput : fromInput}
              <span className="text-lightBlue">{selectText ? toSelected : fromSelected}</span> = {selectText ? fromInput : toInput}
              <span className="text-lightBlue">{selectText ? fromSelected : toSelected}</span>
            </p>
          )}
          <form className="w-full max-w-fit">
            <div className="flex border bg-white rounded-md h-10 p-2 mb-2">
              <input type="text" className="bg-inherit mr-2" placeholder="금액을 입력하세요." onChange={handleFromInput} value={fromInput} />
              <div className="border-l-2 border-r-amber-100">
                <select value={fromSelected} onChange={handleFromSelected} className="bg-inherit ml-2">
                  {region.map((data, index) => (
                    <option key={index} value={data.currency}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex border bg-white rounded-md h-10 p-2">
              <input type="text" className="bg-inherit mr-2" placeholder="금액을 입력하세요." onChange={handleToInput} value={toInput} />
              <div className="border-l-2 border-r-amber-100">
                <select value={toSelected} onChange={handleToSelected} className="bg-inherit ml-2">
                  {region.map((data, index) => (
                    <option key={index} value={data.currency}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
