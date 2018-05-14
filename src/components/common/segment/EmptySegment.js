import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import '../../../styles/css/segment.css'
import {connect} from 'react-redux';
import {setSizeToMax, setSizeToMin} from "../../app/_store/actions/appActions";
import { withRouter } from 'react-router-dom'
import Scrollbar from 'perfect-scrollbar-react';

class EmptySegment extends PureComponent{
    render(){
        let {children, isMaximized, useScroll = true} = this.props;

        return(
            <div className="segment" style={{width: isMaximized? 'calc(100% - 58px)':'calc(100% - 275px)'}}>
                { useScroll ?
                    <Scrollbar>
                        <div style={{width:'100%' ,height:'100%'}}>
                            {children}
                        </div>
                    </Scrollbar> : children }
            </div>
        )

    }
}

EmptySegment.propsTypes = {
    useScroll: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isMaximized: state.app._.maximized,
});

const mapDispatchToProps = (dispatch) => ({    
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmptySegment));


