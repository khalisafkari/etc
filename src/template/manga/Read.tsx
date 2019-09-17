import React,{Component} from 'react'
import { View, ActivityIndicator } from 'react-native';
import manga from '../../utils/manga';


interface State {
    data:Array<any>
    loading:boolean
}

class MangaRead extends Component<any,State>{

    constructor(props){
        super(props)
    }

    state:State = {
        data:[],
        loading:true
    }

    async componentDidMount(){
      const data = await manga.ReadManga(this.props.navigation.getParam('id'))
      this.setState({
          //@ts-ignore
          data:data.data,
          loading:false
      })
    }

    render(){
        if(this.state.loading){
            return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator/></View>
        }
        return(
            <View style={{flex:1}}>
                {this.state.data.map((i)=> `<img src="${i}" width="100%" height="100%"/>`)}
            </View>
        )
    }
}

export default MangaRead;