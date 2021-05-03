import React, { useState, useEffect, forwardRef } from 'react';
import './Project.css';
import MaterialTable from 'material-table'
import axios from 'axios';
import {useSelector, connect, useDispatch } from 'react-redux';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { AUTH_LOGOUT } from '../../store/actions/actionTypes';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Project = ({onLogout}) => {


  const dispatch = useDispatch(); 
  let userId = useSelector(state => state.auth._id);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [data, setData] = useState([])
  let token =  localStorage.getItem('token');
  // console.log(token)
  axios.defaults.headers.common['Authorization'] = token;
  useEffect(() => {
    axios.post(`http://localhost:4000/project/fetchProjects`, {_id: userId} )
      .then((response) => {
      
        setData(response.data.data)
        // console.log(data)
      })
     
        
      }, [])
 

  const columns = [
    { title: "ID", field: "_id", editable: false },
    // { title: "Name", field: "name" },
    { title: "Title", field: "title" },
    { title: "Description", field: 'description', },
    { title: "Deadline", field: "deadline", type: 'date' },
    // { title: "Status", field: "status", lookup: {1: "Active", 2: "Done"} },
    { title: "Status", field: "status", lookup: {1: "Created", 2: "In Progress", 3: "Completed"} },
    { title: "Budget", field: "budget", }
  ]

  const onRowAdd = async (newRow) => {
    await axios.post(`http://localhost:4000/project/createProject`, {...newRow, _id: userId})
    .then((response) => {
      // console.log(response.data.data.status)

      const updatedRows = [...data, response.data.data]
      setTimeout(() => {
        // console.log(updatedRows)
        setData(updatedRows)
        
      }, 2000)
    })
    .catch(() => {

    })
  }

  const logOut = () => {
    console.log('here')
    // onLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('_id');
    axios.defaults.headers.common['Authorization'] = null;
    dispatch({type: AUTH_LOGOUT})

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onRowDelete = async (oldData) => {
    const index = oldData._id;
    // console.log(index)
    const updatedRows = [...data]
    await axios.post(`http://localhost:4000/project/deleteProject`, {_id: index})
    .then((response) => {
      // console.log(response)
      setTimeout(() => {
        for (var i = 0; i < updatedRows.length; i++) {
          if(updatedRows[i]._id == index ) {
            updatedRows.splice(i, 1)
            break
          }
        }
        setData(updatedRows)
        
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onRowUpdate = async (updatedRow,oldRow) => {
    const index=oldRow._id;
    console.log(updatedRow)
    // console.log(index);
    const updatedRows =[...data]
    await axios.post(`http://localhost:4000/project/updateProject`, {_id: index, title: updatedRow.title, description: updatedRow.description, deadline:updatedRow.deadline, budget: updatedRow.budget, status: updatedRow.status})
    .then((response) => {
      console.log(response)
      setTimeout(() => {
      
        for (var i = 0; i < updatedRows.length; i++) {
          if(updatedRows[i]._id == index ) {
            console.log(updatedRows[i])
            updatedRows[i] = updatedRow
            break
          }
        }
  
        setData(updatedRows)

      }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })
  
  }

  return (
    <div className="App">
      <h1 align="center">Project Management App</h1>
      {/* <PowerSettingsNewIcon/> */}

      <div className="more"> 
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        className="more"
        // style = {"display: flex; justify-content:flex-end"}
      >
        More
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <StyledMenuItem
        onClick={logOut} 
        >
          <ListItemIcon>
            <PowerSettingsNewIcon
            
            fontSize="small"/>
          </ListItemIcon>
          <ListItemText
           primary="Logout" 
           
           />
        </StyledMenuItem>
        {/* <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem> */}
      </StyledMenu>
    </div>


      <MaterialTable
        title="Project Data"
        data={data}
        icons={tableIcons}
        columns={columns}
        editable={{
          onRowAdd,
          onRowDelete,
          onRowUpdate

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "first"
        }}
      />
    </div>
  );
}

const mapStateToProps = state => {

};


const mapDispatchToProps = dispatch => {
  return {
     
  };
};


export default connect( mapDispatchToProps,mapStateToProps )( Project );
