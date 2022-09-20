import React, { useContext, useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import styles from "../styles/Reactmap.module.css";
import ParkContext from "../pages/reactmap";

export default function MarkerComponent({ park, setSelectedPark }) {
  const parkDetails = park.length - 1;
  // const parkSelected = useContext(ParkContext);

  return (
    <Marker key={park.id} latitude={park.latitude} longitude={park.longitude}>
      <button
        className={`${styles.button} ${styles.greenButton}`}
        onClick={(e) => {
          e.preventDefault();
          setSelectedPark(park);
          // console.log(park.cleaning);
          // sendIdToAppJs(tree.id)
        }}
      >
        {" "}
      </button>
    </Marker>
  );
}
