import { AnimeApi } from "../../serve";
import {gql} from 'apollo-boost'

class Anime {
    public async Home():Promise<void>{
        const {data,errors,loading} = await AnimeApi.query({query:gql`{
            Home{
              Home{
                id
                images
                title
              }
            }
        }`});
        return data.Home.Home;
    }

    public async Recommend():Promise<void>{
        const {data} = await AnimeApi.query({query:gql`{
            Home{
             Recommend{
              id
              images
            }
            }
        }`})
        return data.Home.Recommend
    }

    public async ReadingAnime(id:String):Promise<void>{
      const {data} = await AnimeApi.query({query:gql`query Read($url:String){
        Reading(url:$url){
          anime{
            id
            title
          }
          batch{
            id
            title
          }
          movie{
            id
            title
          }
        }
      }`,variables:{url:id}})
      return data.Reading
    }

    public async Video(url:String) :Promise<void> {
        const {data} = await AnimeApi.query({query:gql`query Read($url:String){
          Video(link:$url)
         }`,variables:{url}})
         return data.Video;
    }

    public async ListAnime():Promise<void> {
        const {data} = await AnimeApi.query({query:gql`{
          List{
            id
            title
          }
        }`})
        return data.List
    }

    public async SearchAnime(type:string):Promise<void>{
      const {data} = await AnimeApi.query({query:gql`query Search($type:String){
        Search(title:$type){
          id
          images
          title
        }
      }`,variables:{type}})
      return data.Search
    }
}

export default new Anime()