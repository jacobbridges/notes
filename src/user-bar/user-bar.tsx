import React from 'react'
import { connect } from "react-redux";
import * as userSelectors from '../auth/selectors'
import firebase from 'firebase'
import styled from 'styled-components'
import {rgba} from 'polished'

const TopBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    padding-top: 3px;
    padding-bottom: 3px;
    transition: color 80ms, background-color 80ms;
    color: ${({theme}) => theme.black};
    background-color: ${({theme}) => rgba(theme.primary, 0)}; 

    &:hover,
    &:focus,
    &:active {
        color: white;
        background-color: ${({theme}) => rgba(theme.primary, 1)};        
    }
`

const Avatar = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
`


const UserBar = ({user}) => (
    <TopBar>
        <LogoutButton onClick={() => firebase.auth().signOut()}>
            <Avatar src={user.photoURL}/>
            <div>Logout</div>
        </LogoutButton>
    </TopBar>
)

const mapStateToProps = (state) => ({
    user: userSelectors.getUser(state)
})

export default connect(mapStateToProps)(UserBar)