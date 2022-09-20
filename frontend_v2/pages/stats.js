import { PrismaClient } from "@prisma/client";
import React, { useState, useEffect } from "react";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  // find all the trees
  const trees = await prisma.tree.findMany({
    include: {
      details: true,
    },
  });

  // find all and filter by the ones that have a good grade
  const bestTrees = await prisma.tree.findMany({
    where: {
      details: {
        every: {
          grade: {
            gt: 3,
          },
        },
      },
    },
    include: {
      details: true,
    },
  });

  // filter by the ones with a bad grade
  const worstTrees = await prisma.tree.findMany({
    where: {
      details: {
        some: {
          grade: {
            lte: 3,
          },
        },
      },
    },
    include: {
      details: true,
    },
  });

  return {
    props: {
      everyTree: JSON.parse(JSON.stringify(trees)),
      goodOnes: JSON.parse(JSON.stringify(bestTrees)),
      badOnes: JSON.parse(JSON.stringify(worstTrees)),
    },
  };
}

export default function stats({ everyTree, goodOnes, badOnes }) {
  const [filteredList, setFilteredList] = useState(everyTree);
  const [selectedMunicipality, setSelectedMunicipality] = useState(" ");
  const [myDate, setNewDate] = useState("Jan");
  const [goodTrees, setGoodTrees] = useState(0);
  const [badTrees, setBadTrees] = useState(0);
  const [totalTreesInArea, setTotalTreesInArea] = useState(0);

  const handleMunicipalityChange = (event) => {
    setSelectedMunicipality(event.target.value);
  };

  const handleYearChange = (event) => {
    setNewDate(event.target.value);
  };

  const filterByMunicipality = (filteredData) => {
    if (!selectedMunicipality) {
      return filteredData;
    }

    const filteredTrees = filteredData.filter(
      (tree) =>
        tree.municipality.split(" ").indexOf(selectedMunicipality) !== -1
    );

    const filterGoodOnes = (something) => {
      let goods = something.filter((tree) => {
        const treeDetails = tree.details.length - 1;
        if (tree.details[treeDetails].grade > 3) {
          return tree;
        }
      });
      return goods.length;
    };

    const filterBadOnes = (something) => {
      let bads = something.filter((tree) => {
        const treeDetails = tree.details.length - 1;
        if (tree.details[treeDetails].grade <= 3) {
          return tree;
        }
      });
      return bads.length;
    };

    // return filterGoodOnes(filteredTrees);
    return [
      filteredTrees,
      filterGoodOnes(filteredTrees),
      filterBadOnes(filteredTrees),
    ];
  };

  useEffect(() => {
    let filteredData = filterByMunicipality(everyTree);
    setFilteredList(filteredData[0]);
    setTotalTreesInArea(filterByMunicipality(everyTree)[0].length);
    setGoodTrees(filteredData[1]);
    setBadTrees(filteredData[2]);
    console.log(filterByMunicipality(everyTree));
  }, [selectedMunicipality]);

  useEffect(() => {
    // console.log(`the amount of good ones are: ${goodOnes.length}`);
    // console.log(goodOnes);
    // console.log(`the amount of bad ones are: ${badOnes.length}`);
    // console.log(badOnes);
    console.log(filterByMunicipality(everyTree));
    console.log(typeof (goodTrees / totalTreesInArea));
  });

  return (
    <div className="w-3/4 h-96 border-2 border-black flex flex-col">
      <div>stats</div>
      <div className="flex justify-around">
        <form>
          <div>Filter by Muni:</div>
          <select
            value={selectedMunicipality}
            onChange={handleMunicipalityChange}
          >
            <option value="Select">Select</option>
            <option value="Providencia">Providencia</option>
            <option value="Recoleta">Recoleta</option>
            <option value="Ñuñoa">Ñuñoa</option>
          </select>
        </form>

        <form>
          <div>Filter by year:</div>
          <select value={myDate} onChange={handleYearChange}>
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
      </div>

      <div className="h-3/4 ">
        {filteredList.map((item, index) => {
          const treeDetails = item.details.length - 1;
          return (
            <div className="w-10/12 h-20 m-5" key={index}>
              <div className="">{`Id: ${item.id}`}</div>
              <div>{`Grade: ${item.details[treeDetails].grade}`}</div>
              <div>{`Municipality: ${item.municipality}`}</div>
              <div>{`evaluation: ${item.details[treeDetails].time}`}</div>
            </div>
          );
        })}

        {/* {filteredList.map((item) => {
          const treeDetails = item.details.length - 1;
          let goodTrees = 0;

          if (item.details[treeDetails].grade > 3) {
            console.log(item.details[treeDetails].grade);
            console.log(`for tree ${item.id} works? Yes`);
          } else {
            console.log(`for tree ${item.id} works? No`);
          }
          console.log(`this area has ${goodTrees} in well enough`);
        })} */}

        <div>
          <div>{`total trees in the area: ${totalTreesInArea} `}</div>
          <div>{`The ones that are good are: ${
            totalTreesInArea != 0
              ? (goodTrees / totalTreesInArea).toFixed(2) + "%"
              : 0
          }`}</div>
          <div>{`The ones that are bad are: ${
            totalTreesInArea != 0
              ? (badTrees / totalTreesInArea).toFixed(2) + "%"
              : 0
          }`}</div>
        </div>
      </div>
    </div>
  );
}
