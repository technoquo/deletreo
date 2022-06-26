<template>
 <div class="flex justify-center mt-10">
    <img 
      :src="imgSrc"
      class=""
      alt="Deletreo Manual"
      name="AlfabetoLECO"
      width="254"
      height="254"
    />
 
  </div>
</template>

<script>
export default {

//   props:{
//      pokemonId: {
//         type: Number,
//         required: true
//      },
//      showPokemon: {
//        type: Boolean,
//        required: true,
//        default: false
//      }
//   },
    computed: {
       imgSrc() {
            return `https://asl.ms/()/images/blank.gif`
       }
    }

};
</script>