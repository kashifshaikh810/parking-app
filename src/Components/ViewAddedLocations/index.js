import React,{useEffect, useState} from 'react'
import {Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button} from '@material-ui/core'
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  

const ViewAddLocations =  () => {
    const [isLoading, setIsloading] = useState(false);
    const [keys, setKeys] = useState('');
    const [newData, setNewData] = useState([]);

    useEffect(() => {
        setIsloading(true)
        firebase.database().ref('/locations/').on('value', (snapshot) => {
            let data = snapshot.val() ? Object.values(snapshot.val()) : [];
            let keys = snapshot.val() ? Object.keys(snapshot.val()) : [];
            setKeys(keys)
            setNewData(data);
            setIsloading(false);
        })
    },[])

    const deleted = (index) => {
        firebase.database().ref(`/locations/${keys[index]}`).remove()
    }

    return (
        <div className="viewBooking">
        <Card elevation={3} className="card">
          <div className="align">
            <h2 className="header">View Added Locations</h2>
          </div>
          { Object.keys(newData).length > 0 ? isLoading ? (
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48vh'}}>
                      <CircularProgress color="secondary" />
                  </div>
              ) : (
        <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Slots</StyledTableCell>
            <StyledTableCell>Option</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newData.map((item, index) => (
            <StyledTableRow key={item.location}>
              <StyledTableCell component="th" scope="row">
                {item.location}
              </StyledTableCell>
              <StyledTableCell>{item.address}</StyledTableCell>
              <StyledTableCell>{item.slots}</StyledTableCell>
              <Button style={{backgroundColor: 'red'}} onClick={() => deleted(index)}>Delete</Button>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
              ) : isLoading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: "center", height: '48vh'}}>
              <CircularProgress color="secondary" />
            </div> : <h3 style={{textAlign: 'center', fontWeight: 'bold'}}>No Locations Added On user Dashboard</h3>
            }
        </Card>
        </div>
    )
}


export default ViewAddLocations;