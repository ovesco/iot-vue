<template>
    <div>
        <div class="multiline" ref="cover"></div>
    </div>
</template>

<script>
import {
    scaleLinear,
    select,
    bisect,
    axisLeft,
    min,
    line as d3line,
    max,
    extent,
    mouse,
    axisBottom,
} from 'd3';

export default {
    props: {
        data: { type: Array, required: true },
        category: { type: String, required: true },
        axis: { type: Object, required: true },
        color: { type: Function, default: () => 'blue' },
    },
    mounted() {
        const { data, axis, category } = this;
        const { cover } = this.$refs;
        const { offsetWidth } = cover;
        const margin = {
            top: 10,
            right: 30,
            bottom: 50,
            left: 60,
        };
        const offsetHeight = offsetWidth;
        const width = offsetWidth - (margin.left + margin.right);
        const height = offsetHeight - (margin.top + margin.bottom);
        const categories = select(cover).append('div').attr('class', 'categories d-flex');
        const svg = select(cover)
            .append('svg')
            .attr('class', 'line-chart')
            .style('width', `${offsetWidth}px`)
            .style('height', `${offsetHeight}px`)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        const xScale = scaleLinear().range([0, width])
            .domain(extent(data, d => d[axis.x.key]));
        const yScale = scaleLinear().range([height, 0])
            .domain([min(data, d => d[axis.y.key]), max(data, d => d[axis.y.key])]);

        const pathGroup = svg.append('g');
        const formatted = this.categories.map(c => data.filter(i => i[this.category] === c));
        const line = d3line()
            .x(item => xScale(item[axis.x.key]))
            .y(item => yScale(item[axis.y.key]));

        const paths = pathGroup.selectAll('path')
            .data(formatted)
            .enter()
            .append('path')
            .classed('graph-line', true)
            .attr('d', d => line(d))
            .style('stroke', d => this.color(d[0][this.category]));
        svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(0, ${height})`)
            .call(axisBottom(xScale))
            .append('text')
            .attr('transform', `translate(${(width / 2)}, ${margin.bottom * (2 / 3)})`)
            .text(axis.x.name);
        svg.append('g')
            .attr('class', 'axis axis-y')
            .call(axisLeft(yScale))
            .append('text')
            .attr('transform', `rotate(-90), translate(${-(height / 2) + margin.top}, ${-margin.left * (2 / 3)})`)
            .text(axis.y.name);

        const focus = svg.append('g')
            .attr('class', 'focus')
            .style('display', 'none');
        focus.append('line').attr('class', 'focus-line').attr('y1', 0).attr('y2', height);
        focus.append('rect').attr('class', 'focus-rect');
        const focusTspans = [];
        const focusText = focus.append('text').attr('class', 'focus-text');
        const tooltips = [];
        formatted.forEach((dataset) => {
            focusTspans.push(focusText.append('tspan').attr('class', 'tooltip-tspan')
                .attr('x', 0).attr('dy', '20px'));
            const c = dataset[0][this.category];
            const tooltip = focus.append('g')
                .attr('class', 'tooltip');
            tooltip.append('circle')
                .attr('r', 3)
                .attr('fill', () => this.color(c));
            tooltips.push(tooltip);
        });

        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', () => focus.style('display', null))
            .on('mouseout', () => {
                focus.style('display', 'none');
            })
            .on('mousemove', (x, g, nodes) => {
                const m = mouse(nodes[g]);
                const x0 = xScale.invert(m[0]);
                let d = null;
                let minY = height;
                formatted.forEach((dataset, i) => {
                    const tooltip = tooltips[i];
                    const index = bisect(dataset.map(t => t[this.axis.x.key]), x0);
                    const d0 = dataset[index - 1];
                    const d1 = dataset[index];
                    d = d0;
                    focusTspans[i].text(JSON.stringify(d));
                    if (d1) d = x0 - d0[this.axis.x.key] > d1[this.axis.x.key] ? d1 : d0;
                    minY = Math.min(minY, yScale(d[this.axis.y.key]));
                    tooltip.transition()
                        .duration(50)
                        .attr('transform', `translate(${xScale(d[this.axis.x.key])}, ${yScale(d[this.axis.y.key])})`);
                });

                focus.select('line.focus-line')
                    .transition()
                    .duration(50)
                    .attr('y1', minY)
                    .attr('transform', `translate(${xScale(d[this.axis.x.key])})`);
                focusText.transition()
                    .duration(50)
                    .attr('transform', `translate(${xScale(d[this.axis.x.key]) + 20}, ${minY})`);
                const bbox = focusText.node().getBBox();
                focus.select('rect.focus-rect')
                    .transition()
                    .duration(50)
                    .attr('transform', `translate(${xScale(d[this.axis.x.key]) + 10}, ${minY})`)
                    .attr('width', bbox.width + 20)
                    .attr('height', bbox.height + 20);
            });

        categories.selectAll('div.category')
            .data(this.categories)
            .enter()
            .append('div')
            .attr('class', 'category')
            .style('border-top', c => `3px solid ${this.color(c)}`)
            .on('mouseover', (c) => {
                paths.classed('hidden', p => p[0][category] !== c);
            })
            .on('mouseout', () => {
                paths.classed('hidden', false);
            })
            .append('div')
            .text(c => c);
    },
    computed: {
        categories() {
            const ttt = this.data.map(v => v[this.category]);
            return ttt.filter((x, i) => ttt.indexOf(x) === i);
        },
    },
};
</script>

<style lang="scss">
    .multiline {

        svg {
            overflow: visible !important;
        }

        .graph-line {
            stroke-width: 1;
            fill: none;
            transition: opacity .2s;

            &.hidden {
                opacity: 0.2;
            }
        }

        .overlay {
            fill: none;
            pointer-events: all;
        }

        .focus-line {
            stroke: #a9a9a9;
            stroke-dasharray: 1, 4;
        }

        .tooltip-tspan {
            font-size:12px;
        }

        .focus-rect {
            fill: white;
            filter: drop-shadow(0 0 2px rgba(0, 0, 0, .2));
        }

        .axis {

            line, path {
                stroke: #a9a9a9 !important;
            }

            > text {
                stroke-width: 1;
                fill: #a9a9a9;
            }

            .tick {

                text {
                    stroke-width: 0;
                    fill: #a9a9a9;
                }
            }
        }

        .categories {

            opacity: 0;
            transition:opacity .2s;
        }
        .category {

            cursor:pointer;
            flex-grow:1;
            font-size: 0.8rem;

            div {

                opacity:0;
                transition: opacity .2s;
                text-align:center;
            }

            &:first-child, &:last-child {

                div {
                    opacity:0.5;
                }
            }

            &:hover {
                div {
                    opacity:1;
                }
            }
        }

        &:hover {

            .categories {

                opacity: 1;
            }
        }
    }
</style>
