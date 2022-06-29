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
        <ToolsOpciones
          @nueva-palabra="nuevaPalabra"
          @selection-speed="escogerTiempo"
          @repetir-palabra="otravezDeletreo"
          @selection-letters="seleccionarLetra"
          @verificar-palabra="verificarPalabra"
        />
      </div>
    </div>
    <input type="hidden" name="palabra" />
    <input type="text" class="bg-gray-500 rounded text-white" name="acertado" />
  </main>
</template>

<script>
import ImagenDeletreo from "@/components/ImagenDeletreo";
import ToolsOpciones from "@/components/ToolsOpciones";
import getDeletreoTodo from "@/helpers/getDeletreoTodo";

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
      if (word.match(res + array[ind]) == null) {
        document.images["AlfabetoLECO"].src =
          "https://asl.ms/()/images/" + res + ".gif";
      } else if (word.match(res + array[ind]) != null) {
        let checkindoble = start - 1;

        if (checkindoble % 2 == 0) {
          
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + res + ".gif";
        } else {
          
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + res + array[ind] + ".gif";
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
  components: { ImagenDeletreo, ToolsOpciones },
  props: {
    msg: String,
  },
  methods: {
    async palabraArray(defecto) {
      this.deletreoArr = await getDeletreoTodo();
      document.querySelector('input[name="palabra"]').value =
        this.deletreoArr[0].name;
      const letraArr = this.deletreoArr[0].name.split("");
     ArrayLetra(letraArr, defecto);
    },
    nuevaPalabra() {
      this.deletreoArr = [];
      if (document.querySelector('input[name="speed"]:checked') == null) {
        this.palabraArray(333);
        false;
      } else {
        switch (document.querySelector('input[name="speed"]:checked').value) {
          case "1000":
            this.palabraArray(1000);
            break;
          case "666":
            this.palabraArray(666);
            break;
          case "333":
            this.palabraArray(333);
            break;
          default:
            this.palabraArray(200);
        }
      }
    },
    escogerTiempo() {
      switch (document.querySelector('input[name="speed"]:checked').value) {
        case "1000":
          this.RepetirpalabraArray(1000);
          break;
        case "666":
          this.RepetirpalabraArray(666);
          break;
        case "333":
          this.RepetirpalabraArray(333);
          break;
        default:
          this.RepetirpalabraArray(200);
      }
    },
    RepetirpalabraArray(defecto) {
      this.deletreoArr = [];
      const letraArr = document
        .querySelector('input[name="palabra"]')
        .value.split("");
      ArrayLetra(letraArr, defecto);
    },
    otravezDeletreo() {
      if (document.querySelector('input[name="speed"]:checked') == null) {
        this.RepetirpalabraArray(333);
      } else {
        this.escogerTiempo();
      }
    },
    async seleccionarLetra() {
      //revisar
      this.deletreoArr = [];
      let maxlength = document.querySelector(
        'input[name="letras"]:checked'
      ).value;

      this.getDeletreoTodo = await getDeletreoTodo();

      this.LetraMaxArr = this.getDeletreoTodo;

      this.LetraMaxArr.forEach(function (nombres) {
        if (document.querySelector('input[name="speed"]:checked') == null) {
          ArrayMaxLetra(nombres, maxlength, 333);
        } else {
          ArrayMaxLetra(
            nombres,
            maxlength,
            parseInt(
              document.querySelector('input[name="speed"]:checked').value
            )
          );
        }
      });
    },
    verificarPalabra() {
      if (
        document.querySelector('input[name="acertado"]').value ==
        document.querySelector('input[name="palabra"]').value
      ) {
        alert("CORRECTO!");
      } else {
        alert("INCORRECTO");
      }
    },
  },

  mounted() {
    this.palabraArray(666);
  },
};
</script>

<style>
</style>