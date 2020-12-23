import React, { useState, useContext } from "react";

const EventContext = React.createContext();
const EventUpdateContext = React.createContext();


export const useEventContext = () =>{
    return useContext(EventContext);
}

export const useEventUpdateContext = () => {
    return useContext(EventUpdateContext);
}


export function EventProvider({ childs }) {
  const [animation, setAnimation] = useState("");
  const [finished, setFinished] = useState(false);

  function toggleAnimation() {
    setAnimation("fade-out");
  }

  function toggleFiniched(val) {
    setFinished(val);
  }

  return (
    <EventContext.Provider value={(finished, animation)}>
      <EventUpdateContext value={(toggleAnimation, toggleFiniched)}>
        {childs}
      </EventUpdateContext>
    </EventContext.Provider>
  );
}
