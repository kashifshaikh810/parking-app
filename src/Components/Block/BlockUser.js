import React,{useEffect} from 'react'
import { Button, Card, CircularProgress } from "@material-ui/core";
import firebase from "firebase/app";

const BlockUser = ({data, item}) => {

    useEffect(() => {
        window.history.pushState({}, '', '/viewusers')
    },[])

    const forceBlock = () => {
        firebase.database().ref('/newUser/').child(data).update(
            {
                block: !item.block
            },
        )
        window.history.pushState({}, '', '/viewusers')
    }

    return (
        <div>
            <Button onClick={forceBlock} variant="contained">{item.block ? 'unblock' : 'block'}</Button>
        </div>
    )
}

export default BlockUser;
