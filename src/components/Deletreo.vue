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
        />
      </div>
    </div>
    <input type="text" name="palabra" />
  </main>
</template>

<script>
import ImagenDeletreo from "@/components/ImagenDeletreo";
import ToolsOpciones from "@/components/ToolsOpciones";
import getDeletreoTodo from "@/helpers/getDeletreoTodo";

function MostrarImagenNegra() {
  console.log('fadsf');
  setTimeout(() => {
    document.images["AlfabetoLECO"].src = "https://asl.ms/()/images/blank.gif";
  }, 1000);
}

export default {
  name: "Deletreo",
  data() {
    return {
      deletreoArr: [],
      LetraMaxArr: []
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
      let delay = 0;
      let x = 1;
      letraArr.forEach(function (res, ind) {
        setTimeout(function () {
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + res + ".gif";

          if (parseInt(x + 1) === parseInt(letraArr.length + 1)) {
            MostrarImagenNegra();
          }

          x++;
        }, 1000 + delay);
        delay += defecto;
      });
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
      // revisar eso 
      this.deletreoArr = [];
      const letraArr = document
        .querySelector('input[name="palabra"]')
        .value.split("");
      let delay = 0;
      let x = 1;
      letraArr.forEach(function (res) {
        setTimeout(function () {
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + res + ".gif";

            if (parseInt(x + 1) === parseInt(letraArr.length + 1)) {
          MostrarImagenNegra()
        }

        x++;
        }, 1000 + delay);
        delay += defecto;        
      });
    },
    otravezDeletreo() {
      if (document.querySelector('input[name="speed"]:checked') == null) {
        this.RepetirpalabraArray(333);
      } else {
        this.escogerTiempo();
      }
    },
    async seleccionarLetra() {
      this.deletreoArr = [];
      let maxlength = document.querySelector(
        'input[name="letras"]:checked'
      ).value;

      this.getDeletreoTodo = await getDeletreoTodo();

      this.LetraMaxArr = this.getDeletreoTodo;

      this.LetraMaxArr.forEach(function (res) {
        if (res.name.length <= parseInt(maxlength)) {
          let delay = 0;
          let x = 1;
          document.querySelector('input[name="palabra"]').value = res.name;
          console.log(res.name);
          const letraArr = res.name.split("");
          letraArr.forEach(function (res) {
            setTimeout(function () {
              document.images["AlfabetoLECO"].src =
                "https://asl.ms/()/images/" + res + ".gif";

              if (parseInt(x + 1) === parseInt(letraArr.length + 1)) {
                MostrarImagenNegra();
              }

              x++;
            }, 1000 + delay);
            delay += 333;
          });
        } else {
          console.log("no hay");
        }
      });
    },
  },

  mounted() {
    this.palabraArray(333);
  },
};
</script>

<style>
</style>