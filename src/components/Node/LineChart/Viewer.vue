<template>
    <div class="activity-chart">
        <div ref="container"></div>
    </div>
</template>

<script>
import {
    scaleLinear,
    scaleTime,
    select,
    axisLeft,
    bisect,
    line as d3line,
    max,
    extent,
    mouse,
    axisBottom,
    curveCatmullRom,
} from 'd3';

export default {
    props: ['data'],
    mounted() {
        let redrawFlag = true;
        const { container } = this.$refs;
        const { data } = this;
        const width = container.offsetWidth;
        const height = 300;
        const decalageX = 27;
        const decalageY = 30;
        const margin = 0;
        const svg = select(container).append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('width', width - margin)
            .attr('height', height - margin)
            .attr('transform', `translate(${margin / 2}, ${margin / 2})`);
        const xScale = scaleTime()
            .domain(extent(data, i => i.date))
            .range([0, width - margin - decalageX]);
        const yScale = scaleLinear()
            .domain([0, max(data, i => +i.value) + 10])
            .range([height - margin - 50, 0]);
        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${decalageX}, 0)`)
            .call(axisLeft(yScale)
                .ticks(5)
                .tickSize(-(width - decalageX - margin)));
        const pathDef = d3line()
            .curve(curveCatmullRom)
            .x(d => xScale(d.date))
            .y(d => yScale(d.value));

        const line = svg.append('g')
            .append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('transform', `translate(${decalageX}, 0)`)
            .attr('stroke-width', 2)
            .attr('d', pathDef);

        const focus = svg.append('g')
            .style('display', 'none')
            .attr('width', width - margin - decalageX)
            .attr('height', height - margin - decalageY)
            .attr('transform', `translate(${decalageX}, 0)`);
        const focusLine = focus.append('line')
            .attr('class', 'focus-line')
            .attr('y1', 0)
            .attr('y2', height - margin - decalageY - 20);
        const focusDot = focus.append('circle')
            .attr('class', 'focus-circle')
            .attr('r', 4);
        const focusRect = focus.append('rect')
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('class', 'focus-rect');
        const focusText = focus.append('text')
            .attr('class', 'focus-text');

        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', width - margin - decalageX)
            .attr('height', height - margin - decalageY)
            .attr('transform', `translate(${decalageX}, 0)`)
            .on('mousemove', (x, g, nodes) => {
                focus.style('display', null);
                const m = mouse(nodes[g]);
                const x0 = xScale.invert(m[0]);
                const i = bisect(data.map(y => y.date), x0);
                const d0 = data[i - 1];
                const d1 = data[i];
                const d = x0 - xScale(d0) > xScale(d1) - x0 ? d1 : d0;
                focusLine
                    .attr('y1', yScale(d.value))
                    .attr('transform', `translate(${xScale(d.date)})`);
                focusDot.attr('transform', `translate(${xScale(d.date)}, ${yScale(d.value)})`);
                focusText.text(d.value)
                    .attr('transform', `translate(${xScale(d.date) + 15}, ${yScale(d.value)})`);
                const bbox = focusText.node().getBBox();
                focusRect.attr('transform', `translate(${xScale(d.date) + 10}, ${yScale(d.value) - bbox.height})`)
                    .attr('width', bbox.width + 8)
                    .attr('height', bbox.height + 6);
            })
            .on('mouseout', () => {
                focus.style('display', 'none');
            });

        const xAxis = svg.append('g')
            .attr('transform', `translate(50, ${height - margin - decalageY})`)
            .attr('class', 'axis x-axis')
            .call(axisBottom(xScale));
        const yAxis = svg.append('g')
            .attr('class', 'axis y-axis')
            .attr('transform', `translate(${decalageX}, 0)`)
            .call(axisLeft(yScale));

        this.$parent.$on('pre-redraw', () => {
            redrawFlag = false;
        });

        this.$parent.$on('brushing', ({ area }) => {
            if (!redrawFlag) return;
            xScale.domain(area);
            line.attr('d', pathDef);
            xAxis.call(axisBottom(xScale));
        });

        this.$parent.$on('redraw', () => {
            redrawFlag = true;
            xScale.domain(extent(data, i => i.date));
            yScale.domain([0, max(data, i => +i.value) + 10]);
            xAxis.transition()
                .duration(200)
                .call(axisBottom(xScale));
            yAxis.transition()
                .duration(200)
                .call(axisLeft(yScale));
            line.transition()
                .duration(200)
                .attr('d', pathDef(data));
        });
    },
};
</script>

<style lang="scss">
    @import "../../../assets/scss/variables";

    .activity-chart {

        .line {
            stroke: $primary;
        }

        .focus-line {
            stroke: #a9a9a9;
            stroke-dasharray: 1, 4;
        }

        .focus-rect {
            fill: white;
            filter: drop-shadow(0 0 10px rgba(0, 0, 0, .1));
        }

        .focus-circle {
            fill: $primary;
        }

        .focus-text {
            font-size:11px;
            fill: $gray-600;
        }

        .overlay {
            fill: none;
            pointer-events: all;
        }

        i {
            color: $gray-400;
        }

        .zoom {
            cursor: move;
            fill: none;
            pointer-events: all;
        }

        .grid line {
            stroke: $gray-300;
            stroke-opacity: 0.4;
            stroke-width: 1 !important;
        }

        .grid text {
            display: none;
        }

        .grid path {
            stroke-width: 0;
        }

        .axis {
            path, line {
                fill: none;
                stroke-width: 0;
            }

            text {
                fill: $gray-500;
                stroke-width: 1;
            }
        }
    }
</style>
