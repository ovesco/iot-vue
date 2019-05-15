import TemperatureNode from './views/Nodes/Details/TemperatureNode.vue';
import VideoNode from './views/Nodes/Details/VideoNode.vue';

export const Types = [
    'temperature',
    'video',
    'geolocation',
    'noise',
    'humidity',
    'airQuality',
    'light',
];

export const getComponent = type => ({
    temperature: TemperatureNode,
    video: VideoNode,
}[type]);
