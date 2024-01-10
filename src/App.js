import React from "react";
import { useState } from "react";

export default function App() {
  return <Form />;
}

function Form() {
  const [activities, setActivies] = useState("");
  const [goodWeather, setGoodWeather] = useState(false);

  function handleAddActivity(event) {
    event.preventDefault();
    const newActivity = {id:...} 

    
  }

  return (
    <div>
      <h1>Plan your Activities</h1>
      <h3>Add new Activity: </h3>
      <form onSubmit={handleAddActivity}>
        <label>Name:</label>
        <input
          type="text"
          value={activities}
          onChange={(event) => setActivies(event.target.value)}
        ></input>
        <br></br>
        <label>Good weather activity:</label>
        <input
          type="checkbox"
          checked={goodWeather}
          onChange={(event) => setGoodWeather(event.target.checked)}
        ></input>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
