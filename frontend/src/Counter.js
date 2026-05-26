// import { useState } from "react";

// const Counter = () => {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>Counter: {count}</h1>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>

//       <button onClick={() => setCount(count - 1)}>
//         Decrement
//       </button>

//       <button onClick={() => setCount(0)}>
//         Reset
//       </button>
//     </div>
//   );
// };

// export default Counter;

import React, { useState } from "react";

const Counter = () => {
  const [name, setname] = useState("");

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setname(e.target.value);
        }}
      ></input>
      

      <h1>welcome,{name}</h1>
    </>
  );
};

export default Counter;
