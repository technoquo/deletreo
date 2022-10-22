<template>
  <div class="flex justify-center">
    <button
      class="
        bg-red-500
        hover:bg-red-700
        text-white
        py-2
        px-4
        rounded-2xl
        text-sm
        p-4
      "
      @click="$emit('nuevaPalabra')"
    >
      Nueva palabra
    </button>
    <button
      class="
        ml-5
        bg-red-500
        hover:bg-red-700
        text-white
        py-2
        px-4
        rounded-2xl
        text-sm
        p-4
      "
      @click="$emit('repetirPalabra')"
    >
      Repetir palabra
    </button>
  </div>
  <hr class="mt-10 border-cyan-500" />
  <div class="flex justify-center mt-16 font-bold text-cyan-500 text-[24px]">
    Niveles
  </div>
  <div class="flex flex-row justify-center">
    <div class="flex-initial m-4">
      <input
        type="radio"
        name="speed"
        id="speed"
        value="1000"
        @click="$emit('selectionSpeed')"
        class="space-x-2"
      /><span id="despacio" class="ml-4">Despacio</span>
    </div>
    <div class="flex-initial m-4">
      <input
        type="radio"
        name="speed"
        id="speed"
        value="666"
        @click="$emit('selectionSpeed')"
      /><span id="medio" class="ml-4">Medio</span>
    </div>
    <div class="flex-initial m-4">
      <input
        type="radio"
        name="speed"
        id="speed"
        value="333"
        @click="$emit('selectionSpeed')"
      /><span id="rapido" class="ml-4">Rápido</span>
    </div>
    <div class="m-4">
      <input
        type="radio"
        name="speed"
        id="speed"
        value="200"
        @click="$emit('selectionSpeed')"
      /><span id="sordo" class="ml-4">Sordo</span>
    </div>
  </div>
  <hr class="mt-10 border-cyan-500" />
  <div class="flex justify-center mt-16 font-bold text-cyan-500 text-[24px]">
    Cantidad de letras
  </div>
  <div class="flex flex-row justify-center">
    <div class="flex-initial m-4">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="3"
        @click="$emit('selectionLetters')"
      /><span id="3" class="ml-4">3</span>
    </div>
    <div class="flex-initial m-4">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="4"
        @click="$emit('selectionLetters')"
      /><span id="4" class="ml-4">4</span>
    </div>
    <div class="flex-initial m-4">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="5"
        @click="$emit('selectionLetters')"
      /><span id="5" class="ml-4">5</span>
    </div>
    <div class="m-4">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="6"
        @click="$emit('selectionLetters')"
      /><span id="6" class="ml-4">6</span>
    </div>
    <div class="m-4">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="10"
        @click="$emit('selectionLetters')"
      /><span id="10" class="ml-4">10</span>
    </div>
  </div>
  <hr class="mt-10 border-cyan-500" />
  <div class="flex justify-center mt-16">
    <input
      type="text"
      class="border-cyan-700 rounded-lg w-full lowercase"
      name="acertado"
      autocomplete="off"
    />
    <button
      class="
        ml-5
        bg-green-400
        hover:bg-green-500
        text-white
        rounded-2xl
        text-sm
        p-4
      "
      @click="$emit('verificarPalabra')"
    >
      Verificar
    </button>
  </div>
  <div class="p-16">
    <div class="flex justify-center mt-16 font-bold text-cyan-500 text-[24px]">
      Tu Puntuación:
    </div>
    <div id="reset">
      <div id="correcto" class="reset hidden">
        <div class="flex justify-center text-green-400 font-bold mt-7">
          ¡Muy bien!
        </div>
        <div class="flex justify-center">
          <div class="flex-auto">
            <img src="/img/Cali-MuyBien.png" alt="Muy bien" />
          </div>
          <div class="flex-auto">
            <div
              class="
                radial-progress
                bg-green-600
                text-primary-content
                border-2 border-green-600
              "
              style="--value: 15; --size: 9rem; --thickness: 2rem"
            >
              15%
            </div>
          </div>
        </div>
      </div>

      <div id="incorrecto" class="reset hidden">
        <div class="flex justify-center text-red-500 font-bold mt-7">
          Lo siento...¡Intentá de nuevo!
        </div>
        <div class="flex justify-center">
          <div class="flex-auto">
            <img src="/img/Malis-Repetir.png" alt="Lo siento" />
          </div>
          <div class="flex-auto">
            <div
              class="
                radial-progress
                bg-red-600
                text-primary-content
                border-2 border-red-600
              "
              style="--value: 15; --size: 9rem; --thickness: 2rem"
            >
              15%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

