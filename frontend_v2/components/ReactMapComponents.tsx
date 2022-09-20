import React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import styles from "../styles/Reactmap.module.css";


export function MarkerTreeCoponent({
  id,
  latitude,
  longitude,
  onClick,
}: {
  id: number;
  latitude: number;
  longitude: number;
  onClick?: () => void;
}) {
  return (
    <Marker key={id} latitude={latitude} longitude={longitude}>
      <button
        className={`${styles.button} ${
          tree.details[treeDetails].grade > 3
            ? styles.greenButton
            : tree.details[treeDetails].grade === 3
            ? styles.yellowButton
            : styles.redButton
        }`}
        onClick={(e) => {
          e.preventDefault();
          setSelectedTree(tree);
          console.log(tree.details);
          // sendIdToAppJs(tree.id)
        }}
      >
        {" "}
      </button>
    </Marker>
  );
}
