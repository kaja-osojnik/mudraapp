import React, { Fragment } from "react";
import { connect } from 'react-redux';


const SaveTimerMsg = ({ msg }) => {
    return (
        <Fragment>
            <small>{msg}</small>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    msg: state.timer.msg
})



export default connect(mapStateToProps)(SaveTimerMsg);