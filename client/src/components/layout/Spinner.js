import React, { Fragment } from "react";
import {ImSpinner6} from 'react-icons/im';

export default () => (
    <Fragment>
        <div className="loading">
            <div className="rotateIcon">
                <ImSpinner6 />
            </div>
        </div>
    </Fragment>
)