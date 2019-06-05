import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import Scrollbar from "react-perfect-scrollbar";
import { getIsMaximized } from "../../app/_duck/selectors";

class EmptySegment extends PureComponent {
  render() {
    const { children, isMaximized, useScroll = true } = this.props;

    return (
      <div
        className="segment"
        style={{
          width: isMaximized ? "calc(100% - 58px)" : "calc(100% - 275px)"
        }}
      >
        {useScroll ? (
          <Scrollbar>
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          </Scrollbar>
        ) : (
          children
        )}
      </div>
    );
  }
}

EmptySegment.propsTypes = {
  useScroll: PropTypes.bool
};

const mapStateToProps = state => ({
  isMaximized: getIsMaximized(state)
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmptySegment)
);
