import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
  LocationOn,
  ArrowBack,
  ArrowForward,
  ExpandMore,
  ExpandLess,
  Home,
  FormatShapes,
  LineStyle
} from "@material-ui/icons";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { setSizeToMax, setSizeToMin } from "../_duck/actions";
import { getIsMaximized } from "../_duck/selectors";
import { urlJoin } from "../../../service/helperService";

class Sidebar extends PureComponent {
  static contextTypes = {
    t: propTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isMaximized: props.isMaximized
    };
  }

  componentWillReceiveProps(newProps) {
    this.setStateFromProps(newProps);
  }

  setStateFromProps(newProps) {
    this.setState(newProps);
  }

  resize() {
    if (this.state.isMaximized) this.props.minimize();
    else this.props.maximize();
  }

  render() {
    const { isMaximized } = this.state;
    const { match } = this.props;
    const { t } = this.context;
    const app = match.url;

    return (
      <div
        className="sidebar"
        style={{ width: isMaximized ? "48px" : "260px" }}
      >
        Sidebar
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
