<template>
    <div>
        <div ref="toolbar" class="activity-toolbar"></div>
    </div>
</template>

<script>
import {
    scaleLinear,
    scaleTime,
    select,
    brushX,
    line as d3line,
    max,
    extent,
    event,
    curveCatmullRom,
} from 'd3';

export default {
    props: ['data'],
    mounted() {
        const { toolbar } = this.$refs;
        const { data } = this;
        const width = toolbar.offsetWidth;
        const height = 40;
        const svg = select(toolbar).append('svg')
            .attr('width', width + 5)
            .attr('height', height + 5)
            .append('g')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', 'translate(2, 2)');
        const xScale = scaleTime()
            .domain(extent(data, i => i.date))
            .range([0, width]);
        const yScale = scaleLinear()
            .domain([0, max(data, i => +i.value) + 10])
            .range([height, 0]);
        const brush = brushX()
            .extent([[0, 0], [width, height]])
            .on('brush end', () => {
                const { selection } = event || xScale.range();
                this.$emit('brushed', {
                    area: selection.map(xScale.invert, xScale),
                    selection,
                });
            });
        const pathDef = d3line()
            .curve(curveCatmullRom)
            .x(d => xScale(d.date))
            .y(d => yScale(d.value));
        const line = svg.append('g')
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('d', pathDef);
        const brushG = svg.append('g')
            .attr('class', 'brush')
            .call(brush)
            .call(brush.move, xScale.range());

        this.$parent.$on('redraw', () => {
            xScale.domain(extent(data, i => i.date));
            yScale.domain([0, max(data, i => +i.value) + 10]);
            line.transition()
                .duration(300)
                .attr('d', pathDef(data));
            brushG.call(brush.move, xScale.range());
        });
    },
};
</script>

<style lang="scss">
    @import "../../../assets/scss/variables";

    .activity-toolbar {

        path {

            transition: stroke .2s;
            stroke: lighten($primary, 30);
        }

        .brush {

            .selection {

                fill-opacity: 0.1;
                stroke-opacity: 0.2;
                stroke-dasharray: 5, 2;
                stroke-width: 1;
                transition: fill-opacity .2s, stroke-opacity .2s;
                fill: $gray-400;
                stroke: $gray-500;

                &:active {

                    stroke-opacity: 0.8;
                    fill-opacity: 0.6;
                }
            }
        }

        &:hover {

            path {
                stroke: $primary;
            }

            .brush {

                .selection {

                    stroke-opacity: 0.3;
                    fill-opacity: 0.2;


                    &:hover {

                        stroke-opacity: 0.5;
                        fill-opacity: 0.3;

                    }

                    &:active {
                        stroke-opacity: 0.8;
                        fill-opacity: 0.6;
                    }
                }
            }
        }
    }
</style>
