import React, { Component } from 'react';
import WorkAreaSelector from "../work-area-selector/WorkAreaSelector";

class WorkAreaSelectorTest extends Component {

  render() {
    return (
      <div>
        <WorkAreaSelector form="form1" />

        <div style={{ width: '50%' }}>
          <WorkAreaSelector form="form2" isHorizontal={false} />
        </div>
      </div>
    );
  }
}

export default WorkAreaSelectorTest;