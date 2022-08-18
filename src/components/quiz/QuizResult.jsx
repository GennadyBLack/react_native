import React from "react";
import useStore from "../../hooks/useStore";

export default function QuizResult() {
  const [result] = useStore("result");
  console.log(result.result, "result");
  return <h1>HI THERE IT's a RESULT</h1>;
}
