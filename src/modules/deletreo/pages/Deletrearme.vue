<template>
  <main class="sm:container sm:mx-auto sm:max-w-lg sm:mt-10">
    <div class="flex">
      <div class="w-full">
        <section
          class="
            flex flex-col
            break-words
            bg-white
            sm:border-1 sm:rounded-md sm:shadow-2xl
            p-8
          "
        >
          <h1 class="pt-8 text-center">{{ msg }}</h1>
          <ImagenDeletreo :show-deletreo="showDeletreo" />
        </section>
        <input type="text" class="bg-gray-500 rounded text-white" name="spellit" />
        <ToolsDeletrearme
          @deletrear-me="spellme"   
          @selection-speed="escogerTiempo"      
        />
      </div>
    </div> 
  </main>
</template>

<script>
import ImagenDeletreo from "@/components/ImagenDeletreo";
import ToolsDeletrearme from "@/components/ToolsDeletrearme";


var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();


function MostrarImagenNegra() {
  setTimeout(() => {
    document.images["AlfabetoLECO"].src = "https://asl.ms/()/images/blank.gif";
  }, 1000);
}

function ArrayLetra(array, defecto) {
  let delay = 0;
  let x = 1;

  let start = 1;

  let text = array.toString();
  let word = text.replace(/,/g, "");

  array.forEach(function (res, ind) {


    setTimeout(function () {
        
      if (word.match(normalize(res) + normalize(array[ind])) == null) {
        document.images["AlfabetoLECO"].src =
          "https://asl.ms/()/images/" + normalize(res) + ".gif";
      } else if (word.match(normalize(res) + normalize(array[ind])) != null) {
        let checkindoble = start - 1;

        if (checkindoble % 2 == 0) {
          
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + normalize(res) + ".gif";
        } else {
          
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + normalize(res) + normalize(array[ind]) + ".gif";
        }
        start++;
      }

      if (parseInt(x + 1) === parseInt(array.length + 1)) {
        MostrarImagenNegra();
      }

      x++;
    }, 1000 + delay);
    delay += defecto;
  });
}

function ArrayMaxLetra(nombres, maxlength, defecto) {
   
 
    let delay = 0;
    let x = 1;

    let start = 1;

   
    let word = nombres.name.replace(/,/g, "");
    
       
    document.querySelector('input[name="palabra"]').value = nombres.name;
  
     const letraArr = nombres.name.split("");



    letraArr.forEach(function (letra, ind) {
      setTimeout(function () {
        
     if (word.match(letra + letraArr[ind]) == null) {
        
        document.images["AlfabetoLECO"].src =
          "https://asl.ms/()/images/" + letra + ".gif";
      } else if (word.match(letra + letraArr[ind]) != null) {
        let checkindoble = start - 1;
          
        if (checkindoble % 2 == 0) {
          
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + letra + ".gif";
        } else {
          
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + letra + letraArr[ind] + ".gif";
        }
        start++;
      }

      

        if (parseInt(x + 1) === parseInt(letraArr.length + 1)) {
          MostrarImagenNegra();
        }

        x++;
      }, 1000 + delay);
      delay += defecto;
    });
  //}
}

export default {
  name: "Deletreo",
  data() {
    return {
      deletreoArr: [],
      LetraMaxArr: [],
    };
  },
  components: { ImagenDeletreo, ToolsDeletrearme },
  props: {
    msg: String,
  },
  methods: {
    spellme() {
      
       let palabra = document.querySelector('input[name="spellit"]').value    
        const letraArr = palabra.split("")
      if (document.querySelector('input[name="speed"]:checked') != null){      
         ArrayLetra(letraArr,  parseInt(document.querySelector('input[name="speed"]:checked').value))
      } else {
           ArrayLetra(letraArr, 666)
      }
        
    },
  }, 
 
};
</script>

<style>
</style>