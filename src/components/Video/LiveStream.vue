<template>
    <div>
        <div class="player">
            <video ref="player" class="video-player" controls></video>
            <div class="overlay d-flex justify-content-center align-items-center" v-if="!playing">
                <a-spin v-if="loading" />
                <div class="d-flex flex-column align-items-center" v-if="!playing">
                    <a-icon type="disconnect" class="text-muted" />
                    <span class="text-muted" v-if="!playing">Live streaming disabled</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Spin, Icon } from 'ant-design-vue';
import { MediaPlayer } from 'dashjs';

export default {
    components: {
        aIcon: Icon,
        aSpin: Spin,
    },
    props: ['url', 'playing'],
    data() {
        return {
            loading: false,
            player: null,
        };
    },
    watch: {
        playing(v) {
            if (v) this.init();
            else this.stop();
        },
    },
    methods: {
        init() {
            this.player = MediaPlayer().create();
            this.player.initialize(this.$refs.player, this.url, true);
            this.player.on(MediaPlayer.events.BUFFER_LOADED, () => {
                this.loading = false;
            });
            this.player.on(MediaPlayer.events.BUFFER_EMPTY, () => {
                this.loading = true;
            });
        },
        stop() {
            this.player.reset();
            this.player = null;
        },
    },
};
</script>

<style scoped lang="scss">
    .player {

        position: relative;
        border-radius:7px;
        overflow:hidden;

        .video-player {

            width:100%;
        }

        .overlay {

            position: absolute;
            width:100%;
            height:100%;
            top:0;
            background:#eee;

            i {
                font-size: 2rem;
                opacity:0.7;
            }
        }
    }
</style>
