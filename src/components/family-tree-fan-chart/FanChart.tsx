import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface FanChartProps {
  width: number;
  height: number;
  data: { name: string; birth: string }[][];
}

const FanChart: React.FC<FanChartProps> = ({ width, height, data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const radius = Math.min(width, height) / 2;
    const generations = data.length;

    const arc = d3.arc<d3.PieArcDatum<any>>()
      .innerRadius((d) => (d.data.generation - 1) * (radius / generations))
      .outerRadius((d) => d.data.generation * (radius / generations))
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    data.forEach((generationData, generationIndex) => {
      const pie = d3.pie<{ name: string; birth: string }>().value(() => 1).sort(null);

      const arcs = svg.selectAll(`.generation-${generationIndex}`)
        .data(pie(generationData.map((d) => ({ ...d, generation: generationIndex + 1 }))))
        .enter()
        .append("g")
        .attr("class", `generation-${generationIndex}`);

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
          return `translate(${x},${y}) rotate(${rotateAngle})`;
        })
        .attr("text-anchor", "start") // Anchor to start so text radiates outward
        .style("font-size", "15px")
        .style("alignment-baseline", "middle")
        .text((d) => d.data.name || "Unknown");
    });
  }, [data, width, height]);

  return <svg ref={svgRef} />;
};

export default FanChart;
