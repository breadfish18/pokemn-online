<template>
  <div>
    <h1>Emulator</h1>
    <button :enabled="emuLoaded" @click="loadRom()">Start</button>
    <!-- <Modal v-if="!loaded" :progress="emuScriptProgress"></Modal> -->
    <div class="pixels"></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import app from "@/emulator/appEntry.js";
import axios from "axios";
import { auth, db } from "@/firebase";
// import Modal from "@/components/Modal.vue";

export default {
  name: "Emulator",
  components: {
    // Modal,
  },
  data() {
    return {
      loggedIn: !!auth.currentUser,
      emuLoaded: false,
      emuScriptProgress: 0,
    };
  },
  mounted: async function () {
    console.log(this.$route.query);
    if (this.loggedIn) {
      const snapshot = await db
        .collection("saves")
        .doc(auth.currentUser.uid)
        .get();
      localStorage["VBAsave_BPEE"] = snapshot.data().data;
    }
    window.gbaninja = {
      onRuntimeInitialized: function () {
        console.log("emu ready");
      },
    };

    this.loadEmuModule();
    window.romBuffer8 = null;
    window.hasEmuModule = function () {
      return !!gbaninja.HEAP8;
    };

    window.VBAInterface = {};

    VBAInterface.VBA_get_emulating = function () {
      return gbaninja.ccall("VBA_get_emulating", "int", [], []);
    };

    VBAInterface.VBA_start = function () {
      return gbaninja.ccall("VBA_start", "int", [], []);
    };

    VBAInterface.VBA_do_cycles = function (cycles) {
      return gbaninja.ccall("VBA_do_cycles", "int", ["int"], [cycles]);
    };

    VBAInterface.VBA_stop = function () {
      return gbaninja.ccall("VBA_stop", "int", [], []);
    };

    VBAInterface.VBA_get_bios = function () {
      return gbaninja.ccall("VBA_get_bios", "int", [], []);
    };

    VBAInterface.VBA_get_rom = function () {
      return gbaninja.ccall("VBA_get_rom", "int", [], []);
    };

    VBAInterface.VBA_get_internalRAM = function () {
      return gbaninja.ccall("VBA_get_internalRAM", "int", [], []);
    };

    VBAInterface.VBA_get_workRAM = function () {
      return gbaninja.ccall("VBA_get_workRAM", "int", [], []);
    };

    VBAInterface.VBA_get_paletteRAM = function () {
      return gbaninja.ccall("VBA_get_paletteRAM", "int", [], []);
    };

    VBAInterface.VBA_get_vram = function () {
      return gbaninja.ccall("VBA_get_vram", "int", [], []);
    };

    VBAInterface.VBA_get_pix = function () {
      return gbaninja.ccall("VBA_get_pix", "int", [], []);
    };

    VBAInterface.VBA_get_oam = function () {
      return gbaninja.ccall("VBA_get_oam", "int", [], []);
    };

    VBAInterface.VBA_get_ioMem = function () {
      return gbaninja.ccall("VBA_get_ioMem", "int", [], []);
    };

    VBAInterface.VBA_get_systemColorMap16 = function () {
      return gbaninja.ccall("VBA_get_systemColorMap16", "int", [], []);
    };

    VBAInterface.VBA_get_systemColorMap32 = function () {
      return gbaninja.ccall("VBA_get_systemColorMap32", "int", [], []);
    };

    VBAInterface.VBA_get_systemFrameSkip = function () {
      return gbaninja.ccall("VBA_get_systemFrameSkip", "int", [], []);
    };

    VBAInterface.VBA_set_systemFrameSkip = function (n) {
      return gbaninja.ccall("VBA_set_systemFrameSkip", "int", ["int"], [n]);
    };

    VBAInterface.VBA_get_systemSaveUpdateCounter = function () {
      return gbaninja.ccall("VBA_get_systemSaveUpdateCounter", "int", [], []);
    };

    VBAInterface.VBA_reset_systemSaveUpdateCounter = function () {
      return gbaninja.ccall("VBA_reset_systemSaveUpdateCounter", "int", [], []);
    };

    VBAInterface.VBA_emuWriteBattery = function () {
      return gbaninja.ccall("VBA_emuWriteBattery", "int", [], []);
    };

    VBAInterface.VBA_agbPrintFlush = function () {
      return gbaninja.ccall("VBA_agbPrintFlush", "int", [], []);
    };

    // ------- VBA EXIT POINTS --------

    VBAInterface.NYI = function (feature) {
      console.log("Feature is NYI: ", feature);
    };

    VBAInterface.getAudioSampleRate = function () {
      return window.vbaSound.getSampleRate();
    };

    VBAInterface.getRomSize = function (startPointer8) {
      return romBuffer8.byteLength;
    };

    VBAInterface.copyRomToMemory = function (startPointer8) {
      var gbaHeap8 = gbaninja.HEAP8;
      var byteLength = romBuffer8.byteLength;
      for (var i = 0; i < byteLength; i++) {
        gbaHeap8[startPointer8 + i] = romBuffer8[i];
      }
    };

    VBAInterface.renderFrame = function (pixPointer8) {
      window.vbaGraphics.drawGBAFrame(pixPointer8);
    };

    VBAInterface.initSound = function () {};

    VBAInterface.pauseSound = function () {};

    VBAInterface.resetSound = function () {
      window.vbaSound.resetSound();
    };

    VBAInterface.resumeSound = function () {};

    VBAInterface.writeSound = function (pointer8, length16) {
      return window.vbaSound.writeSound(pointer8, length16);
    };

    VBAInterface.setThrottleSound = function (pointer8, length16) {};

    VBAInterface.getSaveSize = function () {
      return vbaSaves.getSaveSize();
    };

    VBAInterface.commitFlash = VBAInterface.commitEeprom = function (
      pointer8,
      size
    ) {
      return vbaSaves.softCommit(pointer8, size);
    };

    VBAInterface.restoreSaveMemory = function (pointer8, targetBufferSize) {
      return vbaSaves.restoreSaveMemory(pointer8, targetBufferSize);
    };

    VBAInterface.getJoypad = function (joypadNum) {
      return vbaInput.getJoypad(joypadNum);
    };

    VBAInterface.dbgOutput = function (textPointer8, unknownPointer8) {
      return console.log("dbgOutput", textPointer8, unknownPointer8);
    };
  },
  methods: {
    loadEmuModule: function () {
      this.loaded = false;
      axios({
        url: "/emu.js",
        responseType: "text",
        onDownloadProgress: (progress) => {
          console.log(progress);
          this.emuScriptProgress = (progress.loaded / progress.total) * 100;
          if (progress.loaded === progress.total) this.emuLoaded = true;
        },
      }).then((res) => {
        const script = document.createElement("script");
        script.text = res.data;
        document.head.appendChild(script);
      });
    },
    loadRom: function () {
      this.loaded = false;
      axios({
        url: "/emerald.gba",
        responseType: "arraybuffer",
        onDownloadProgress: (progress) => {
          console.log(progress);
        },
      }).then((res) => {
        const _romBuffer8 = new Uint8Array(res.data);
        this.loadRomFromBuffer(_romBuffer8);
        window.start()
      });
    },
    loadRomFromBuffer: function (_romBuffer8) {
      var romCode = String.fromCharCode(
        _romBuffer8[0xac],
        _romBuffer8[0xad],
        _romBuffer8[0xae],
        _romBuffer8[0xaf]
      );
      romBuffer8 = _romBuffer8;
      init();

      console.log(romCode);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
