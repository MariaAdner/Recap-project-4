import React from "react";
import { useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

export default function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
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

  const isGoodWeather = true;
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );
  //console.log(filteredActivities);

  return (
    <div>
      <Form onAddActivity={handleAddActivity} />
      <List filteredActivities={filteredActivities} isGoodWeather />
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

function List({ filteredActivities, isGoodWeather }) {
  return (
    isGoodWeather && <p>"The weather is awesome! Go outside and:"</p>,
    // (
    // <p>"Bad weather outside! Here's what you can do now:"</p>
    filteredActivities.map((activity) => {
      return <li key={activity.id}>{activity.name}</li>;
    })
  );
}
