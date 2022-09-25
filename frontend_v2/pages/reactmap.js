import React, { useState, useEffect, createContext } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import styles from "../styles/Reactmap.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import MarkerComponent from "../components/MarkerComponent";
import PopupComponent from "../components/PopupComponent";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  // all the trees
  const trees = await prisma.tree.findMany({
    include: {
      details: true,
    },
  });

  const municipality = await prisma.municipality.findMany({
    include: {
      zone: {
        include: {
          zoneEvaluation: {
            include: {
              greenArea: {
                include: {
                  grass: {
                    include: {
                      grassEval: true,
                    },
                  },
                  trees: {
                    include: {
                      treesEval: true,
                    },
                  },
                  infrastructure: {
                    include: {
                      infrastructureEval: true,
                    },
                  },
                  floorCovers: {
                    include: {
                      floorCoversEval: true,
                    },
                  },
                  sideWalks: {
                    include: {
                      sideWalksEval: true,
                    },
                  },
                  cleaning: {
                    include: {
                      cleaningEval: true,
                    },
                  },
                  seasonFlowers: {
                    include: {
                      seasonalFlowersEval: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return {
    props: {
      initialTrees: JSON.parse(JSON.stringify(trees)),
      testMuni: JSON.parse(JSON.stringify(municipality)),
    },
  };
}

export default function ReactMap({ initialTrees, testMuni }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const onlyParks = testMuni[0].zone[0].zoneEvaluation[0].greenArea;
  const ParkContext = createContext();

  useEffect(() => {
    // console.log(initialTrees);
    console.log(testMuni);
    console.log(onlyParks);
  });
  // useEffect(() => {
  //   console.log("this are the details");
  //   console.log(testMuni);
  // });

  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZGl0b2xlZG9yIiwiYSI6ImNsM3E1OHR5ZjA5NTYzY21zaG8xeGJxMHgifQ.quteS-bAH31Y61dhDnnClw";

  const [viewport, setViewport] = useState({
    latitude: -33.44056603180975,
    longitude: -70.61151939629589,
    zoom: 12,
  });

  const [fetchedData, setFetchedData] = useState([]);

  const [selectedPark, setSelectedPark] = useState(fetchedData[0]);

  return (
    <>
      {loading && <h1>loading...</h1>}
      {session && (
        <div className={styles.mapPage}>
          <div className={styles.mapContainer}>
            <Map
              {...viewport}
              mapboxAccessToken={MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              onMove={(evt) => setViewport(evt.viewport)}
            >
              {/* getting data from database and displaying it on the map */}

              <ParkContext.Provider value={selectedPark}>
                {onlyParks.map((park) => {
                  return (
                    <MarkerComponent
                      key={park.id}
                      park={park}
                      setSelectedPark={setSelectedPark}
                    />
                  );
                  // return MarkerComponent(park);
                })}

                {onlyParks.map((cleaningPoint) => {
                  cleaningPoint.cleaning.map(() => {
                    <MarkerComponent key={cleaningPoint.id} />;
                  });
                })}

                {/* Popup showin info from the provided trees */}
                {selectedPark ? (
                  <PopupComponent selectedPark={selectedPark} />
                ) : null}
              </ParkContext.Provider>
            </Map>
            <Link href={"/newpark"}>
              <button
                className={styles.popupButton}
                style={{ color: "black", marginTop: "20px" }}
              >
                New Entry
              </button>
            </Link>
          </div>
        </div>
      )}
      {!session && (
        <>
          <p className={{}}>Please Sign in</p>
          <img
            src="https://cdn.dribbble.com/userupload/2741522/file/original-635a5a001334ce8936501c5006fcbdcb.mp4"
            alt=""
            className={styles.avatar}
          />
          <p className={{}}>
            GIF by{" "}
            <a href="https://cdn.dribbble.com/userupload/2741522/file/original-635a5a001334ce8936501c5006fcbdcb.mp4">
              Another man
            </a>{" "}
          </p>
        </>
      )}
    </>
  );
}
