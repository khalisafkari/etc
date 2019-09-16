import axios from 'axios'

class Kitsu {
    public async MangaKitsu(text):Promise<void>{
        const data = await axios.get(`https://kitsu.io/api/edge/manga?filter[text]=${text}&page[limit]=1`);
        return data.data.data[0];
    }

    public async AnimeKitsu(text):Promise<void>{
        const data = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${text}&page[limit]=1`);
        return data.data.data[0].attributes;
    }
}

export default new Kitsu()