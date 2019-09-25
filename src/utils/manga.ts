import { MangaApi } from "../../serve";
import gql from "graphql-tag";

class Novel {

    page = 1;

    public async List(page:number):Promise<void>{
        const data = await MangaApi.query({query:gql`query Page($id:Int){
            list(page:$id){
              item{
                id
                data{
                  title
                  image
                  genre
                }
              }
              total
            }
        }`,variables:{id:page}})
        //@ts-ignore
       return data;
    }

    public async SearchManga(type:string):Promise<void>{
      const {data} = await MangaApi.query({query:gql`query Search($type:String){
        search(type:$type){
          id
          image
          title
        }
      }`,variables:{type}})
      return data.search
    }

    public async RecommendManga():Promise<void>{
      const {data} = await MangaApi.query({query:gql`{
        posts_unfilter{
          week{
            id
            images
            title
            rating
            chapter{
              id
              title
            }
          }
        }
      }`});
      return data.posts_unfilter.week;
    }

    public async postGenre(id:string):Promise<void>{
      const {data} = await MangaApi.query({query:gql`query genre($id:String){
        posts_genre(id:$id){
          id
          title
          image
        }
      }`,variables:{id}})
      return data.posts_genre
    }

    public async PostsManga(id):Promise<void>{
      const {data} = await MangaApi.query({query:gql`query Posts($id:String){
        manga(id:$id){
          item{
            id
            title
            download
            time
          }
          data{
            title
            image
            total
            status
            author
            rating
            release
            sinopsis
            genre
          }
        }
      }`,variables:{id}})
      return data.manga
    }

    public async ReadManga(id):Promise<void>{
      const {data} = await MangaApi.query({query:gql`query Read($id:String){
        reading(id:$id){
          data
          next
          prev
        }
      }`,variables:{id}})
      return data.reading;
    }
}

export default new Novel()