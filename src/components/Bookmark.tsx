import React, { Component } from 'react'
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { ADD_BOOKMARK_MANGA, REMOVE_BOOKMARK_MANGA } from '../store/manga';

class Bookmark extends Component<any, any> {

    AddBookmark() {
        this.props.addBookmark({ [`${this.props.id}`]: true })
    }

    RemoveBookmark(){
        this.props.addBookmark({ [`${this.props.id}`]: false })
    }

    

    render() {
        return (
            <View>
                {this.props.state[this.props.id] ? (
                    <Icon
                        name="favorite-border"
                        type="material-icons"
                        color="red"
                        onPress={() => this.RemoveBookmark()}
                    />
                ):(<Icon
                    name="favorite-border"
                    type="material-icons"
                    color="blue"
                    onPress={() => this.AddBookmark()}
                />)}
            </View>
        )
    }

    componentWillUnmount(){
        try {
            if(!this.props.state[this.props.id]){
                this.props.removeBookmark({id:this.props.id})
            }
        } catch (error) {
            
        }
    }

}

const mapState = state => ({
    state: state.manga.Bookmark
})

const mapProps = dispatch => ({
    addBookmark: (data: string) => dispatch({ type: ADD_BOOKMARK_MANGA, payload: data }),
    removeBookmark:(data:string) => dispatch({type:REMOVE_BOOKMARK_MANGA,payload:data})
})

export default connect(mapState, mapProps)(Bookmark);