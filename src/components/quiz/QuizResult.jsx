import React, { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";

export default function QuizResult() {
  const [result] = useStore("result");
  const [fullResult, setFullResult] = useState(null);
  useEffect(() => {
    const getResult = async () => {
      const res = await result.get(result?.result?.id);
      console.log(res, "RES");
      setFullResult(res.data);
    };
    getResult();
  }, []);
  console.log(fullResult);

  return <h1>HI THERE IT's a RESULT</h1>;
}
