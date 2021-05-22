<template>
    <div><h1>emulator</h1></div>
    <button v-on:click="start()">Start</button>
    <div class="pixels">
        <canvas width="240" height="160"></canvas>
    </div>

    <!-- <teleport to="#modals">
        <Modal></Modal>
    </teleport> -->
</template>


<script>
/* eslint-disable no-undef */

import axios from "axios";
// import Modal from "./Modal.vue";

export default {
    // components: { Modal },
    data() {
        return {
            emulatorReady: false,
            hasEmuModule: () => {
                return !!gbaninja.HEAP8;
            },
        };
    },
    async created() {
        window.emulator = this;
        window.gbaninja = {
            onRuntimeInitialized: function () {
                this.emulatorReady = true;
                console.log("emu ready");
                const script = document.createElement("script");
                script.src = "app.js";
                document.head.appendChild(script);
            },
        };
        this.loadScript("emu.js");
    },
    mounted() {},
    methods: {
        loadScript(url) {
            return new Promise((resolve, reject) => {
                axios({
                    url: url,
                    responseType: "text",
                    onDownloadProgress: (progressEvent) => {
                        console.log(progressEvent);
                    },
                })
                    .then((res) => {
                        const script = document.createElement("script");
                        script.text = res.data;
                        document.head.appendChild(script);
                        resolve();
                    })
                    .catch((err) => reject(err));
            });
        },

        // rom loading
        start: function () {
            axios({
                url: "emerald.gba",
                responseType: "arraybuffer",
                onDownloadProgress: (progressEvent) => {
                    console.log(progressEvent);
                },
            }).then((res) => {
                const _romBuffer8 = new Uint8Array(res.data);
                this.loadRomFromBuffer(_romBuffer8);
            });
        },

        loadRomFromBuffer: function (_romBuffer8) {
            var romCode = String.fromCharCode(
                _romBuffer8[0xac],
                _romBuffer8[0xad],
                _romBuffer8[0xae],
                _romBuffer8[0xaf]
            );
            // romBuffer8 = _romBuffer8;
            console.log(romCode);
            this.loadScript("gbaninja.js");
        },
    },
};
</script>

<style>
</style>