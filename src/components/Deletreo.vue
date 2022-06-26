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
          <ImagenDeletreo />
        </section>
        <ToolsOpciones
          @nueva-palabra="nuevaPalabra"
          @selection-speed="escogerTiempo"
          @repetir-palabra="otravezDeletreo"
          @selection-letters="seleccionarLetra"
        />
      </div>
    </div>
    <input type="hidden" name="palabra" />
  </main>
</template>

<script>
import ImagenDeletreo from "@/components/ImagenDeletreo";
import ToolsOpciones from "@/components/ToolsOpciones";
import getDeletreoPalabras from "@/helpers/getDeletreo";
import getDeletreoTodo from "@/helpers/getDeletreoTodo";

export default {
  name: "Deletreo",
  data() {
    return {
      deletreoArr: [],
    };
  },
  components: { ImagenDeletreo, ToolsOpciones },
  props: {
    msg: String,
  },
  methods: {
    async palabraArray(defecto) {
     
      this.deletreoArr = await getDeletreoPalabras();
    
      document.querySelector('input[name="palabra"]').value = this.deletreoArr.data.name
      const letraArr = this.deletreoArr.data.name.split("")
      let delay = 0;

      letraArr.forEach(function (res) {
        setTimeout(function () {
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + res + ".gif";
        }, 1000 + delay);
        delay += defecto;
      });
    },
    nuevaPalabra() {
      this.deletreoArr = [];
      switch (document.querySelector('input[name="speed"]:checked').value) {
      case "1000":
          this.palabraArray(1000)
          break;
        case "666":
          this.palabraArray(666)
          break;
        case "333":
          this.palabraArray(333)
          break;
        default:
          this.palabraArray(200)
      }
    },
    escogerTiempo() {
       
        switch (document.querySelector('input[name="speed"]:checked').value) {
        case "1000":
          this.RepetirpalabraArray(1000)
          break;
        case "666":
          this.RepetirpalabraArray(666)
          break;
        case "333":
          this.RepetirpalabraArray(333)
          break;
        default:
          this.RepetirpalabraArray(200)
      }
    },
    RepetirpalabraArray(defecto) {    
      
       this.deletreoArr = [];
      const letraArr = document.querySelector('input[name="palabra"]').value.split("");
      let delay = 0;

      letraArr.forEach(function (res) {
        setTimeout(function () {
          document.images["AlfabetoLECO"].src =
            "https://asl.ms/()/images/" + res + ".gif";
        }, 1000 + delay);
        delay += defecto;
      });
    },
   otravezDeletreo(){

    if (document.querySelector('input[name="speed"]:checked') == null){
           this.RepetirpalabraArray(333, 'repetir')
    } else {
           this.RepetirpalabraArray(document.querySelector('input[name="speed"]:checked').value, 'repetir')
    }
   },
  async seleccionarLetra(){
           
            let maxlength = document.querySelector('input[name="letras"]:checked').value
         
            this.getDeletreoTodo = await getDeletreoTodo();
            
          // console.log(this.getDeletreoTodo.data.results[].name.length)
          
        // for (i=0; i<this.getDeletreoTodo.data.results[i].name.length <= parseInt(maxlength); i++) {
        //      console.log(i); 
        // }
        
         
   },
  set_lenght_lim() {
       
  }

  },

  mounted() {
    this.palabraArray(333);
  },
};
</script>

<style>
</style>