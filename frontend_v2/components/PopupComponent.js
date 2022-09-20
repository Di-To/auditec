import React, { useContext } from "react";
import styles from "../styles/Reactmap.module.css";
import Map, { Marker, Popup } from "react-map-gl";
import Link from "next/link";

export default function PopupComponent({ selectedPark }) {
  //   const parkSelected = useContext(ParkContext);
  return (
    <Popup
      className={styles.popup}
      key={selectedPark.id}
      latitude={selectedPark.latitude}
      longitude={selectedPark.longitude}
      anchor="bottom"
      closeOnClick={false}
      closeOnMove={true}
    >
      <div>
        <h2>{selectedPark.parkName}</h2>
        {/* <img src={selectedTree.src}></img> */}
        {/* <p>Grade: {selectedTree.zone}</p> */}
        <p>Location: {selectedPark.location}</p>
        <p>id: {selectedPark.id}</p>

        <Link href={`/parkdetails/${selectedPark.id}`} key={selectedPark.id}>
          <button className={styles.popupButton}>see more</button>
        </Link>
      </div>
    </Popup>
  );
}
