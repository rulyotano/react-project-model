import React, {Component} from 'react';

import '../../../styles/css/segment.css'
import ZoomOutIco from 'material-ui/svg-icons/maps/zoom-out-map';

class Segment extends Component{
    render(){
        let {children, title} = this.props;

        return(
            <div className="segment">
                <div className="container">
                    <div className="container-header">
                        <h3>{title ? title:'Title'}</h3>
                        <span className="close">&times;</span>
                        <ZoomOutIco/>

                    </div>
                    <div className="container-body">
                        {children}
                    </div>
                </div>

            </div>
        )

    }
}

export default Segment;


