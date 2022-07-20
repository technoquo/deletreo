import axios from 'axios'

const pokemonApi  = axios.create({
  
   baseURL: 'https://apis.handsonlesco.com/api/deletreo'

})

export default pokemonApi