<template>
  <div :style="image" class="image">
    <main class="sm:container sm:mx-auto sm:max-w-lg sm:mt-0">
      <div class="flex">
        <div class="w-full">
          <section class="flex flex-col break-words p-8 mt-80">
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
    </main>
  </div>
</template>

<script>
import ImagenDeletreo from "@/components/ImagenDeletreo";
import ToolsOpciones from "@/components/ToolsOpciones";
import getDeletreoTodo from "@/helpers/getDeletreoTodo";

var normalize = (function () {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function (str) {
    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join("");
  };
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
          "img/deletreolesco/" + normalize(res) + ".jpg";
      } else if (word.match(normalize(res) + normalize(array[ind])) != null) {
        let checkindoble = start - 1;

        if (checkindoble % 2 == 0) {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" + normalize(res) + ".jpg";
        } else {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" +
            normalize(res) +
            normalize(array[ind]) +
            ".jpg";
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
          "img/deletreolesco/" + letra + ".jpg";
      } else if (word.match(letra + letraArr[ind]) != null) {
        let checkindoble = start - 1;

        if (checkindoble % 2 == 0) {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" + letra + ".jpg";
        } else {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" + letra + letraArr[ind] + ".jpg";
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
      image: { backgroundImage: "url(/img/Header-banner.jpg)" },
      activeColor: "red",
      fontSize: 30,
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

      // let palabratemporal = 'lleno'
      // const letraArr = palabratemporal.split("");

      ArrayLetra(letraArr, defecto);
    },
    nuevaPalabra() {
      document.querySelector('input[name="acertado"]').value = '';
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
          document.getElementById("medio").classList.remove("text-cyan-500");
          document.getElementById("rapido").classList.remove("text-cyan-500");
          document.getElementById("sordo").classList.remove("text-cyan-500");
          var d = document.getElementById("despacio");
          d.className += " text-cyan-500";
          this.RepetirpalabraArray(1000);
          break;
        case "666":
          document.getElementById("despacio").classList.remove("text-cyan-500");
          document.getElementById("rapido").classList.remove("text-cyan-500");
          document.getElementById("sordo").classList.remove("text-cyan-500");
          var d = document.getElementById("medio");
          d.className += " text-cyan-500";
          this.RepetirpalabraArray(666);
          break;
        case "333":
          document.getElementById("despacio").classList.remove("text-cyan-500");
          document.getElementById("medio").classList.remove("text-cyan-500");
          document.getElementById("sordo").classList.remove("text-cyan-500");
          var d = document.getElementById("rapido");
          d.className += " text-cyan-500";
          this.RepetirpalabraArray(333);
          break;
        default:
          document.getElementById("despacio").classList.remove("text-cyan-500");
          document.getElementById("medio").classList.remove("text-cyan-500");
          document.getElementById("rapido").classList.remove("text-cyan-500");
          var d = document.getElementById("sordo");
          d.className += " text-cyan-500";
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
      console.log(document.querySelector('input[name="letras"]:checked').value);
      switch (document.querySelector('input[name="letras"]:checked').value) {
        
        case "3":
          document.getElementById("4").classList.remove("text-cyan-500");
          document.getElementById("5").classList.remove("text-cyan-500");
          document.getElementById("6").classList.remove("text-cyan-500");
          document.getElementById("10").classList.remove("text-cyan-500");
          var d = document.getElementById(3);
          d.className += " text-cyan-500";

          break;
        case "4":
          document.getElementById("3").classList.remove("text-cyan-500");
          document.getElementById("5").classList.remove("text-cyan-500");
          document.getElementById("6").classList.remove("text-cyan-500");
          document.getElementById("10").classList.remove("text-cyan-500");
          var d = document.getElementById(4);
          d.className += " text-cyan-500";

          break;
        case "5":
          document.getElementById("3").classList.remove("text-cyan-500");
          document.getElementById("4").classList.remove("text-cyan-500");
          document.getElementById("6").classList.remove("text-cyan-500");
          document.getElementById("10").classList.remove("text-cyan-500");
          var d = document.getElementById(5);
          d.className += " text-cyan-500";

          break;
        case "6":
          document.getElementById("3").classList.remove("text-cyan-500");
          document.getElementById("4").classList.remove("text-cyan-500");
          document.getElementById("5").classList.remove("text-cyan-500");
          document.getElementById("10").classList.remove("text-cyan-500");
          var d = document.getElementById(6);
          d.className += " text-cyan-500";

          break;
       
        default:
            document.getElementById("3").classList.remove("text-cyan-500");
          document.getElementById("4").classList.remove("text-cyan-500");
          document.getElementById("5").classList.remove("text-cyan-500");
          document.getElementById("6").classList.remove("text-cyan-500");         
          var d = document.getElementById(10);
          d.className += " text-cyan-500";

      }

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
      var d = document.getElementById('reset');
          d.className += "hidden";
         console.log(document.querySelector('input[name="palabra"]').value)
          console.log(document.querySelector('input[name="acertado"]').value)
      if (
        document.querySelector('input[name="acertado"]').value ==
        document.querySelector('input[name="palabra"]').value
      ) {
         document.getElementById("reset").classList.remove("hidden");
         document.getElementById("correcto").classList.remove("hidden");
         document.getElementById("incorrecto").classList.add("hidden");
      } else {
           document.getElementById("reset").classList.remove("hidden");
          document.getElementById("incorrecto").classList.remove("hidden");
             document.getElementById("correcto").classList.add("hidden");
      }
    },
  },

  mounted() {
    this.palabraArray(666);
  },
};
</script>

<style>
.image {
  background-size: cover;
  width: 100%;
  height: 500px;
  resize: both;
}
</style>