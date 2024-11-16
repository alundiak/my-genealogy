import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { NickNamesDataForTagCloud } from "../common/models";

interface TagCloudProps {
  cloudData: NickNamesDataForTagCloud[];
}

const TagCloud: React.FC<TagCloudProps> = ({ cloudData }) => {
  const cloudRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!cloudRef.current) return;

    const width = 500;
    const height = 500;

    const svg = d3
      .select(cloudRef.current)
      .attr("width", width)
      .attr("height", height);

    const domainData = [
      d3.min(cloudData, (d) => d.count) || 1,
      d3.max(cloudData, (d) => d.count) || 100
    ];

    const fontSizeScale = d3
      .scaleLinear()
      .domain(domainData)
      .range([10, 90]);

    const wordsData = cloudData.map((d) => {
      const size = fontSizeScale(d.count);
      console.log(`Count: ${d.count}, Size: ${size}`);
      return {
        text: d.name,
        size: size || 10,
      };
    });

    // Create the D3-cloud layout
    const layout = cloud()
      .size([width, height])
      .words(wordsData)
      .padding(5)
      .rotate(0) // No rotation for horizontal alignment
      .fontSize((d) => {
        // console.log(d.size);
        return d.size;
      }) // Set font size
      .on("end", draw); // Call the draw function when layout finishes

    layout.start();

    function draw(words: any[]) {
      // Remove old groups to prevent duplicates
      svg.selectAll("g").remove();

      // Append new words in cloud form, but with horizontal randomization
      svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d: any) => `${d.size}px`)
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr("text-anchor", "middle")
        .attr("x", (d: any) => d.x) // Use the calculated x position from the cloud layout
        .attr("y", (d: any) => d.y) // Use the calculated y position (still random)
        .text((d: any) => d.text);
    }
  }, [cloudData]);

  return <svg ref={cloudRef}></svg>;
};

export default TagCloud;
