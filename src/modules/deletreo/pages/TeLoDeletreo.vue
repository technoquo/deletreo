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
  var from = "ÃÀÄÂAÁÈËÊÉÌÏÎÒÖÔÓÙÜÛãàáäâèéëêìïîíòóöôùúûÇç",
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
          "img/deletreolesco/" + normalize(res).toLowerCase() + ".jpg";
      } else if (word.match(normalize(res) + normalize(array[ind])) != null) {
        let checkindoble = start - 1;

        if (checkindoble % 2 == 0) {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" + normalize(res).toLowerCase() + ".jpg";
        } else {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" +
            normalize(res).toLowerCase() +
            normalize(array[ind]).toLowerCase() +
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
          "img/deletreolesco/" + letra.toLowerCase() + ".jpg";
      } else if (
        word.match(letra.toLowerCase() + letraArr[ind]).toLowerCase() != null
      ) {
        let checkindoble = start - 1;

        if (checkindoble % 2 == 0) {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" + letra.toLowerCase() + ".jpg";
        } else {
          document.images["AlfabetoLECO"].src =
            "img/deletreolesco/" +
            letra.toLowerCase() +
            letraArr[ind].toLowerCase() +
            ".jpg";
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

      // let palabratemporal = 'acá'
     //  const letraArr = palabratemporal.split("");

      ArrayLetra(letraArr, defecto);
    },
    nuevaPalabra() {
      this.deletreoArr = [];
      document.getElementById("correcto").classList.add("hidden");
      document.getElementById("check").disabled = false;
      document.getElementById("check").classList.remove("bg-gray-400");
      document.getElementById("check").classList.add("bg-green-400");
      document.getElementById("check").classList.add("hover:bg-green-500");
      document.getElementById("check").classList.add("cursor-pointer");
      document.querySelector('input[name="acertado"]').value = "";
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
        this.RepetirpalabraArray(1000);
      } else {
        this.escogerTiempo();
      }
    },
    async seleccionarLetra() {
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
      var d = document.getElementById("reset");
      d.className += "hidden";
       
      if (
        document.querySelector('input[name="acertado"]').value ==
        document.querySelector('input[name="palabra"]').value
      ) {
         const num = document.querySelector('input[name="puntosacumulados"]').value;
    
         let acumular = +num + 1;


        
        document.querySelector('input[name="puntosacumulados"]').value = acumular
        document.getElementById("reset").classList.remove("hidden");
        document.getElementById("correcto").classList.remove("hidden");
        document.getElementById("incorrecto").classList.add("hidden");
        document.getElementById("check").disabled = true;
        document.getElementById("check").classList.remove("bg-green-400");
        document.getElementById("check").classList.remove("hover:bg-green-500");
        document.getElementById("check").classList.remove("cursor-pointer");
        document.getElementById("check").classList.add("bg-gray-400");
        document.getElementById("radial-progress").innerHTML = acumular + " pts";
        document.getElementById("radial-progress").setAttribute('style','--value: '+ acumular +'; --size: 9rem; --thickness: 2rem');
  
          if ( document.querySelector('input[name="puntosacumulados"]').value == "2"){
            document.getElementById('botton_nueva').classList.add("hidden");
            document.getElementById('botton_repertir').classList.add("hidden");
            document.getElementById("correcto").classList.add("hidden");
            document.getElementById("incorrecto").classList.add("hidden");
            document.getElementById("exito").classList.remove("hidden");
            document.getElementById("check").disabled = true;
            document.getElementById("check").classList.remove("bg-green-400");
            document.getElementById("check").classList.remove("hover:bg-green-500");
            document.getElementById("check").classList.remove("cursor-pointer");
            document.getElementById("check").classList.add("bg-gray-400");
            document.getElementById("radial-progress-success").innerHTML = acumular + " pts";
            document.getElementById("radial-progress-success").setAttribute('style','--value: '+ acumular +'; --size: 9rem; --thickness: 2rem');
  
          }
  } else {
        const num = document.querySelector('input[name="puntosacumulados"]').value;
         let restar = +num - 1;
        document.querySelector('input[name="puntosacumulados"]').value = restar
        document.getElementById("reset").classList.remove("hidden");
        document.getElementById("incorrecto").classList.remove("hidden");
        document.getElementById("correcto").classList.add("hidden");
        document.getElementById("radial-progress-bad").innerHTML = restar + "pts";
         document.getElementById("radial-progress-bad").setAttribute('style','--value: '+ restar +'; --size: 9rem; --thickness: 2rem');
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