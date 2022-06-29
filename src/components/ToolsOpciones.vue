<template>
  <button
    class="
      bg-blue-500
      hover:bg-blue-700
      text-white
      font-bold
      py-2
      px-4
      rounded
      p-4
    "
    @click="$emit('nuevaPalabra')"
  >
    Nueva palabra
  </button>
  <button
    class="
      ml-5
      bg-blue-500
      hover:bg-blue-700
      text-white
      font-bold
      py-2
      px-4
      rounded
      p-4
    "
    @click="$emit('repetirPalabra')"
  >
    Repetir palabra
  </button>
    <button
    class="
      ml-5
      bg-blue-500
      hover:bg-blue-700
      text-white
      font-bold
      py-2
      px-4
      rounded
      p-4
    "
    @click="$emit('verificarPalabra')"
  >
   Verificar
  </button>

  <ul>
    <li>
      <input
        type="radio"
        name="speed"
        id="speed"
        value="1000"
        @click="$emit('selectionSpeed')"
      />Despacio
    </li>
    <li>
      <input
        type="radio"
        name="speed"
        id="speed"
        value="666"
        @click="$emit('selectionSpeed')"
      />Medio
    </li>
    <li>
      <input
        type="radio"
        name="speed"
        id="speed"
        value="333"
        @click="$emit('selectionSpeed')"
      />Rápido
    </li>
    <li>
      <input
        type="radio"
        name="speed"
        id="speed"
        value="200"
        @click="$emit('selectionSpeed')"
      />Sordo
    </li>
  </ul>

 <div class="p-5">
   <label for="">Escoger cantidad de letras</label> 
  <ul class="flex mt-6">
    <li class="p-2">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="3"
        @click="$emit('selectionLetters')"
      />3
    </li>
    <li class="p-2">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="4"
        @click="$emit('selectionLetters')"
      />4
    </li>
    <li class="p-2">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="5"
        @click="$emit('selectionLetters')"
      />5
    </li>
    <li class="p-2">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="6"
        @click="$emit('selectionLetters')"
      />6
    </li>
      <li class="p-2">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="10"
        @click="$emit('selectionLetters')"
      />10
    </li>
    <li class="p-2">
      <input
        type="radio"
        name="letras"
        id="letras"
        value="7"
        @click="$emit('selectionLetters')"
      />Cualquiera
    </li>
  </ul>
</div>
</template>

<script>
export default {};
</script>