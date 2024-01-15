import React from "react";
import { useState } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

export default function App() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: [],
  });
  const [goodWeather, setGoodWeather] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather/europe"
      );
      const goodWeather = await response.json();
      console.log(goodWeather);
      setGoodWeather(goodWeather);
    }
    fetchWeather();
  }, []);

  function handleAddActivity(newActivity) {
    setActivities([
      ...activities,

      {
        ...newActivity,
        id: uid(),
      },
    ]);
  }

  let isGoodWeather = goodWeather.isGoodWeather;
  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );
  //console.log(filteredActivities);

  return (
    <div>
      <Weather goodWeather />
      <Form onAddActivity={handleAddActivity} />
      <List filteredActivities={filteredActivities} isGoodWeather />
    </div>
  );
}

function Weather({ goodWeather }) {
  return (
    <div>
      <h1>{goodWeather.condition}</h1>
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
    <>
      <h2>{isGoodWeather ? "good" : "bad"} Weather Activities</h2>
      <ul>
        {filteredActivities.map((activity) => {
          return <li key={activity.id}>{activity.name}</li>;
        })}
      </ul>
    </>
  );
}
