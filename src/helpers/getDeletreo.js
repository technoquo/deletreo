import pokemonApi from '@/api/deletreoApi'


const getDeletreoPalabra = async () => {

    let numeroaleatiorio = Math.floor(Math.random() * 10)+ 1;
    
    const resp = await pokemonApi.get(`/${numeroaleatiorio}`)
     return resp
}


export default getDeletreoPalabra;