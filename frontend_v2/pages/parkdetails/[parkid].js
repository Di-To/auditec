import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Treedetails.module.css";
import trees_data from "../../MockDataFirst";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStaticProps({ params }) {
  const uniquePark = await prisma.greenArea.findUnique({
    where: {
      id: Number(params.parkid),
    },
    include: {
      cleaning: {
        include: {
          cleaningEval: true,
        },
      },
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
      seasonFlowers: {
        include: {
          seasonalFlowersEval: true,
        },
      },
    },
  });

  return {
    props: {
      parkDetails: JSON.parse(JSON.stringify(uniquePark)),
    },
  };
}

export async function getStaticPaths() {
  const res = await prisma.greenArea.findMany();

  return {
    paths: res.map((unique) => ({
      params: {
        parkid: unique.id.toString(),
      },
    })),
    fallback: false,
  };
}

export default function TreeDetails({ parkDetails }) {
  const router = useRouter();

  const { parkid } = router.query;

  // if(!router.isReady) {
  //     return <></>;
  // }
  // option 2. Tree id is not set. tips:

  useEffect(() => {
    console.log(parkDetails);
    if (parkDetails) {
      setCurrent(parkDetails);
    }
    console.log(current);
  }, [parkDetails]);

  const [allQualifications, setallQualifications] = useState(parkDetails);

  const dataLength = allQualifications.length + 1;
  const cleaningLastEntry = parkDetails.cleaning.length - 1;
  const grassLastEntry = parkDetails.grass.length - 1;
  const treesLastEntry = parkDetails.trees.length - 1;
  const infrastructureLastEntry = parkDetails.infrastructure.length - 1;
  const sideWalksLastEntry = parkDetails.sideWalks.length - 1;
  const floorCoversLastEntry = parkDetails.floorCovers.length - 1;
  const [current, setCurrent] = useState(null);
  const [myMonth, setNewMonth] = useState("Jan");
  const [myYear, setNewYear] = useState(2022);

  const handleMonthChange = (event) => {
    setNewMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setNewYear(event.target.value);
  };

  //   useEffect(() => {
  //     console.log(lastEntry);
  //   }, []);

  //   useEffect(() => {
  //     if (current) {
  //       evaluateContract(current.grade);
  //     }
  //   }, [current]);

  if (current == null) {
    return <></>;
  }

  const cleaningGrade =
    current.cleaning[cleaningLastEntry].cleaningEval[cleaningLastEntry].grade;
  const grassGrade =
    current.grass[grassLastEntry].grassEval[grassLastEntry].grade;
  const treesGrade =
    current.trees[treesLastEntry].treesEval[treesLastEntry].grade;
  const floorCoversGrade =
    current.floorCovers[floorCoversLastEntry].floorCoversEval[
      floorCoversLastEntry
    ].grade;
  const infrastructureGrade =
    current.infrastructure[infrastructureLastEntry].infrastructureEval[
      infrastructureLastEntry
    ].grade;
  const sideWalksGrade =
    current.sideWalks[sideWalksLastEntry].sideWalksEval[sideWalksLastEntry]
      .grade;

  const finalGrade =
    grassGrade * 0.3 +
    cleaningGrade * 0.3 +
    treesGrade * 0.1 +
    floorCoversGrade * 0.1 +
    infrastructureGrade * 0.1 +
    sideWalksGrade * 0.1;

  return (
    <div className={styles.treeDetailContainer}>
      <div className="flex w-2/3 justify-around">
        <div>Filter by date:</div>
        <form className="">
          <select value={myMonth} onChange={handleMonthChange}>
            <option value="Jan">Jan</option>
            <option value="Feb">Feb</option>
            <option value="Mar">Mar</option>
            <option value="Apr">Apr</option>
            <option value="Jun">Jun</option>
            <option value="Jul">Jul</option>
            <option value="Aug">Aug</option>
            <option value="Sep">Sep</option>
            <option value="Oct">Oct</option>
            <option value="Nov">Nov</option>
            <option value="Dec">Dec</option>
          </select>
        </form>
        <form>
          <select value={myYear} onChange={handleYearChange}>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
        </form>
      </div>
      <div className={styles.infoContainer}>
        {/* <img src={allQualifications[treeid][dataLength].src} style={{width:"300px", height:"400px"}}></img> */}
        <p>Park located in: Zone {current.location}</p>
        <p>Id: {current.id}</p>
        <p>Latitude: {current.latitude}</p>
        <p>Longitude: {current.longitude}</p>
        <p>Cleaning: {cleaningGrade}</p>
        <p>Grass: {grassGrade}</p>
        <p>Trees: {treesGrade}</p>
        <p>FloorCovers: {floorCoversGrade}</p>
        <p>Infrastructure: {infrastructureGrade}</p>
        <p>Side Walks: {sideWalksGrade}</p>

        <p>Current grade: {finalGrade} </p>
        {/*
                        
                         avidingByContract ? (
                             <p>Does it comply: YES</p>
                         ) : (
                             <p>Does it comply: NO</p>
                         )
                        
                         */}
      </div>
      <button
        onClick={() => {
          router.reload();
        }}
      >
        refresh
      </button>
      <button className="rounded bg-sky-600 w-36 h-10 text-white font-bold">
        NEW REPORT
      </button>
      <Link href={"/reactmap"}>
        <button className={styles.backButton}> BACK </button>
      </Link>
    </div>
  );
}
