import React from 'react'
import {connect} from 'react-redux'
import Login from './Login'
import * as selectors from './selectors'

const ForceAuth = ({user, children}) => {
    if (user) {
        return children
    }
    return <Login/>
}

const mapStateToProps = (state) => ({
    user: selectors.getUser(state)
})

export default connect(mapStateToProps)(ForceAuth)