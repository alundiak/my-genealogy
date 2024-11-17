import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

interface FanChartProps {
  width: number;
  height: number;
  data: { name: string; birth: string }[][];
}

const FanChart: React.FC<FanChartProps> = ({ width, height, data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [chartData, setChartData] = useState(data);

  const radius = Math.min(width, height) / 2;
  const generations = chartData.length;

  const arc = d3.arc<d3.PieArcDatum<any>>()
    .innerRadius((d) => (d.data.generation - 1) * (radius / generations))
    .outerRadius((d) => d.data.generation * (radius / generations))
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle);

  // Handle drill down by setting the clicked person's parents as the new root
  const handleClick = (person: any) => {
    console.log(person);

    if (person.parents && person.parents.length > 0) {
      // Prepare the new data to show the clicked person's parents
      const newData = person.parents.map((parent: any) => [parent]);

      // Only update the state if the new data is different from the current data
      if (JSON.stringify(newData) !== JSON.stringify(chartData)) {
        setChartData(newData); // Update the chart data and trigger a re-render
      }
    }
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<{ name: string; birth: string }>().value(() => 1).sort(null);

    // Clear the svg content and redraw each time the data changes
    svg.selectAll("*").remove();

    chartData.forEach((generationData, generationIndex) => {
      const arcs = svg.selectAll(`.generation-${generationIndex}`)
        .data(pie(generationData.map((d) => ({ ...d, generation: generationIndex + 1 }))))
        .enter()
        .append("g")
        .attr("class", `generation-${generationIndex}`)
        .on("click", (event, d) => handleClick(d.data)); // Add click event listener

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
        .style("stroke", "#fff")
        .style("stroke-width", "1px");

      arcs
        .append("text")
        .attr("transform", (d) => {
          const angle = (d.startAngle + d.endAngle) / 2;
          const r = (d.data.generation - 0.5) * (radius / generations); // Position text between arcs
          const x = r * Math.cos(angle - Math.PI / 2);
          const y = r * Math.sin(angle - Math.PI / 2);
          const rotateAngle = (angle * 180) / Math.PI - 90;

          // Adjust text rotation so it doesn't flip
          const adjustRotation = rotateAngle > 90 || rotateAngle < -90 ? rotateAngle + 180 : rotateAngle;

          return `translate(${x},${y}) rotate(${adjustRotation})`;
        })
        .attr("text-anchor", "middle") // Anchor to center so text is oriented properly
        .style("font-size", "15px")
        .style("alignment-baseline", "middle")
        .text((d) => d.data.name || "Unknown");
    });
  }, [chartData, width, height]);  // Re-render chart when `chartData` changes

  return <svg ref={svgRef} />;
};

export default FanChart;
