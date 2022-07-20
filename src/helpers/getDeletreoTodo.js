import pokemonApi from '@/api/deletreoApi'

const getPokemnons = () => {

    const pokemonsArr = Array.from( Array(650))

  return pokemonsArr.map( (_, index) => index + 1)
}

const getPokemonsOptions = async() => {

    const mixedPokemons = getPokemnons().sort(() => Math.random() - 0.5 )
     
   const pokemons = await  getDeletreoTodo( mixedPokemons.splice(0,20))
   
   return pokemons
}

const getDeletreoTodo = async ([a] = []) => {

    const promiseArr = [
        pokemonApi.get(`/${a}`)
      
   ]
   
   const [p1] = await Promise.all( promiseArr)
   return [
    { name: p1.data.data.palabra, id: p1.data.data.id}
   ]
 
}


export default getPokemonsOptions;