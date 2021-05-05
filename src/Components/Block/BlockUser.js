import React from 'react'
import { Button, Card, CircularProgress } from "@material-ui/core";
import firebase from "firebase/app";

const BlockUser = ({data, item}) => {
    const forceBlock = () => {
        firebase.database().ref('/newUser/').child(data).on("value", snapshot => {
        })
        let update = { block: !item.block, firstName: item.firstName, lastName: item.lastName, email: item.email, }
        let updateBook = { block: !item.block, firstName: item.firstName, lastName: item.lastName, email: item.email, }
        let check = updateBook ? updateBook : update 
            console.log("Block user Update", check)
        firebase.database().ref('/newUser/').child(data).set(
            check,
        )}
      console.log(item)
    return (
        <div>
            <Button onClick={forceBlock} variant="contained">{item.block ? 'unblock' : 'block'}</Button>
        </div>
    )
}

export default BlockUser;