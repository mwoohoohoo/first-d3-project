import React, { useEffect, useState } from "react";
import { scaleBand, scaleLinear } from "d3-scale";

const Barplot = ({ data, width = 800, height = 500 }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showBars, setShowBars] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 200);
    const t2 = setTimeout(() => setShowBars(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const margin = {
    top: 60,
    right: 40,
    bottom: 40,
    left: 140,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const yScale = scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.1);

  const maxValue = Math.max(...data.map((d) => d.students));

  const xScale = scaleLinear().domain([0, maxValue]).range([0, innerWidth]);

  const xTicks = xScale.ticks(5);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* Title */}
        <text
          x={innerWidth / 2}
          y={-30}
          textAnchor="middle"
          fontSize={20}
          fontWeight={600}
          fontFamily="Bitter"
          style={{
            opacity: showTitle ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          Number of Students per Country on d3-React Course
        </text>

        {/* X Axis */}
        <g
          transform={`translate(0, ${innerHeight})`}
          style={{
            opacity: showBars ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {xTicks.map((tick) => (
            <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
              <line y2="6" stroke="black" />
              <text
                y="20"
                textAnchor="middle"
                fontSize={12}
                fontFamily="Roboto"
                fontWeight={500}
              >
                {tick}
              </text>
            </g>
          ))}
          <line x1={0} x2={innerWidth} stroke="black" />
        </g>

        {/* Y Axis labels */}
        <g
          style={{
            opacity: showBars ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {data.map((d, i) => (
            <text
              key={d.country}
              x={-10}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              alignmentBaseline="middle"
              fontSize={12}
              fontFamily="Roboto"
              fontWeight={500}
              style={{
                opacity: showBars ? 1 : 0,
                transform: showBars ? "translateX(0px)" : "translateX(-10px)",
                transition: `all 0.6s ease ${i * 0.05 + 0.2}s`,
              }}
            >
              {d.country}
            </text>
          ))}
        </g>

        {/* Bars */}
        {data.map((d, i) => (
          <g key={d.country}>
            <rect
              x={0}
              y={yScale(d.country)}
              width={showBars ? xScale(d.students) : 0}
              height={yScale.bandwidth()}
              fill="#69b3a2"
              style={{
                transition: `width 0.8s ease ${i * 0.05}s`,
              }}
            />

            <text
              x={showBars ? xScale(d.students) + 5 : 5}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              alignmentBaseline="middle"
              fontSize={12}
              fontFamily="Roboto"
              fontWeight={500}
              style={{
                opacity: showBars ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.05 + 0.4}s`,
              }}
            >
              {d.students}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default Barplot;
