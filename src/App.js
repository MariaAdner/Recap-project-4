import React from "react";
import { useState } from "react";
import { uid } from "uid";

export default function App() {
  const [activities, setActivities] = useState([]);
  const [goodWeather, setGoodWeather] = useState(false);
  function handleAddActivity(newActivity) {
    setActivities([
      ...activities,

      {
        ...newActivity,
        id: uid(),
      },
    ]);
  }
  console.log(activities);
  return (
    <div>
      <Form onAddActivity={handleAddActivity} />
    </div>
  );
}

function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newActivity = {
      name: form.elements.name.value,
      isForGoodWeather: form.elements.isGoodWeather.checked,
    };
    onAddActivity(newActivity);
    form.reset();
    form.elements.name.focus();
  }

  return (
    <div>
      <h1>Plan your Activities</h1>
      <h3>Add new Activity: </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity">Name:</label>
        <input type="text" name="name" id="activity"></input>
        <br></br>
        <label htmlFor="checkbox">Good weather activity:</label>
        <input name="isGoodWeather" type="checkbox" id="checkbox"></input>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
