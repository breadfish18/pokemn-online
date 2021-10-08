<template>
  <div class="flex flex-wrap justify-start">
    <div class="p-4 m-4 xl:w-1/4 md:w-1/4 w-7/12 mb-12 shadow-xl">
      <div class="h-full rounded-lg mb-6 flex flex-col relative">
        <h1 class="text-xl font-bold">Pokemon Emerald</h1>
        <h1 class="text-base">GameBoy Advance</h1>

        <router-link
          to="/play?game=emerald"
          class="group relative mt-6 w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Play
        </router-link>
      </div>
    </div>
    <div class="p-4 xl:w-1/4 md:w-1/4 w-7/12 mb-12 shadow-xl">
      <div class="h-full rounded-lg mb-6 flex flex-col relative">
        <h1 class="text-xl font-bold">Pokemon FireRed</h1>
        <h1 class="text-base">GameBoy Advance</h1>

        <!-- <router-link
          class="group relative mt-6 w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Play
        </router-link> -->
      </div>
    </div>
    <div class="p-4 xl:w-1/4 md:w-1/4 w-7/12 mb-12 shadow-xl">
      <div class="h-full rounded-lg mb-6 flex flex-col relative">
        <h1 class="text-xl font-bold">Pokemon LeafGreen</h1>
        <h1 class="text-base">GameBoy Advance</h1>

        <!-- <router-link
          class="group relative mt-6 w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Play
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>