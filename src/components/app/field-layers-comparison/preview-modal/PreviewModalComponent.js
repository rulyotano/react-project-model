import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class PreviewModalComponent extends PureComponent {
    static propTypes = {
      source: PropTypes.string.isRequired
    }

    render() {
      const {source} = this.props;
      return (
        <div>
                Source = {source}            
        </div>
      );
    }
}
