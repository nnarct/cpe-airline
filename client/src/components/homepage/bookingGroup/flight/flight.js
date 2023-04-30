import { useState } from "react";
import { Type } from "./type";

export const Flight = () => {
  const [isReturn, setIsReturn] = useState(1);
  return (
    <>
      <form action="">
        <Type isReturn={isReturn} setIsReturn={setIsReturn} />
      </form>
    </>
  );
};
