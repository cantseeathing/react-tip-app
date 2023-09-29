import { useState } from "react";

function App() {
  const [bill, setBill] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [friendsRating, setFriendsRating] = useState(0);
  const tip = parseInt(((friendsRating + myRating) / 2 / 100) * bill);

  return (
    <div>
      <BillCost bill={bill} billState={setBill} />
      <ServiceRating rating={myRating} onSelect={setMyRating}>
        {"How did you like the service?"}
      </ServiceRating>
      <ServiceRating rating={friendsRating} onSelect={setFriendsRating}>
        {"How did your friends the service?"}
      </ServiceRating>
      <TipCalculation bill={bill} tip={tip} />
      <Reset
        setBill={setBill}
        setMyRating={setMyRating}
        setFriendsRating={setFriendsRating}
      />
    </div>
  );
}

function BillCost({ bill, billState }) {
  function handleBillAmount(e) {
    billState(() => {
      let bill = parseFloat(e.target.value);
      if (isNaN(bill)) {
        return "";
      }
      return bill;
    });
  }
  return (
    <div>
      <p>How much was the bill?</p>
      <input
        value={bill}
        type="text"
        onChange={(e) => handleBillAmount(e)}
      ></input>
    </div>
  );
}

function ServiceRating({ rating, onSelect, children }) {
  return (
    <div>
      <p>{children}</p>
      <select value={rating} onChange={(e) => onSelect(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutley amazing! (20%)</option>
      </select>
    </div>
  );
}

function TipCalculation({ tip, bill }) {
  return (
    <div>
      {bill === 0 ? (
        <p>Please type in the bill amount in $</p>
      ) : (
        <p>
          You pay ${bill + tip} (${bill} + ${tip} tip).
        </p>
      )}
    </div>
  );
}

function Reset({ setBill, setMyRating, setFriendsRating }) {
  function handleClear() {
    setBill(0);
    setMyRating(0);
    setFriendsRating(0);
  }
  return (
    <div>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
export default App;
