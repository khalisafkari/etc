import axios from 'axios'

class Novelgo {

    public async Home():Promise<void>{
        const data = await axios.get('https://novelgo.khalis411.now.sh/?url=https://novelgo.id/wp-json/noveils/v1/novels')
        return data.data;
    }

    public async Populer():Promise<void>{
        const data = await axios.get(`https://novelgo.khalis411.now.sh/?url=https://novelgo.id/wp-json/noveils/v1/popular`)
        return data.data;
    }

    public async Recents():Promise<void>{
        const data = await axios.get('https://novelgo.khalis411.now.sh/?url=https://novelgo.id/wp-json/noveils/v1/recents');
        return data.data;
    }

}

export default new Novelgo()