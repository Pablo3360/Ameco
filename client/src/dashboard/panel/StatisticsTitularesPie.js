import React from "react";
import { ResponsivePie } from "@nivo/pie";

const statisticsTitularesPie = ({ data }) => {
  return (
      <ResponsivePie
        data={data}
        sortByValue={true}
        margin={{ top: 10, right: 100, bottom: 10, left: 10 }}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "category10" }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsStraightLength={5}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "Varones",
            },
            id: "dots",
          },
          {
            match: {
              id: "Mujeres",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 15,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 0,
            itemHeight: 25,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
  );
};

export default statisticsTitularesPie;