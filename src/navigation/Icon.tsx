import React from 'react'
import { Icon } from 'react-native-elements';

export const IHManga = (props):any => {
    return(
        <Icon
            name="home"
            color={props.tintColor}
            size={25}
            type="feather"
        />
    )
}

export const ISManga = (props):any => {
    return(
        <Icon
            name="search"
            color={props.tintColor}
            size={25}
            type="feather"
        />
    )
}

export const ILManga = (props):any => {
    return(
        <Icon
            name="list"
            color={props.tintColor}
            size={25}
            type="feather"
        />
    )
}

