import pokemonApi from '@/api/deletreoApi'


const getDeletreoTodo = async () => {

   
    
    const resp = await pokemonApi.get()
     return resp
}


export default getDeletreoTodo;