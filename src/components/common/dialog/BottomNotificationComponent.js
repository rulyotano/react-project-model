import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get, head } from "lodash";
import { withStyles, Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import config from "../../../config/config";
import { removePassBottomNotifications } from "./_store/actions/bottomNotificationActions";

const styles = theme => ({
  close: {}
});

export class BottomNotificationComponent extends Component {
  static propTypes = {
    bottomNotification: PropTypes.array,
    closePastNotificationBottom: PropTypes.func,
    classes: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      bottomNotification: null,
      wasClosed: false
    };
  }

  componentDidMount() {
    this._intervalId = setInterval(() => {
      this.props.closePastNotificationBottom();
    }, 1000);
    this.setStateFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setStateFromProps(newProps);
  }

  componentWillUnmount() {
    if (this._intervalId) clearInterval(this._intervalId);
  }

  setStateFromProps(props) {
    const newBotNot = head(props.bottomNotifications);
    if (newBotNot !== this.state.bottomNotification)
      this.setState({
        bottomNotification: newBotNot,
        wasClosed: false
      });
  }

  handleRequestClose() {
    this.setState({
      wasClosed: true
    });
  }

  render() {
    const timeNotification = config.TIME_BOTTOM_NOTIFICATION;
    const botNot = this.state.bottomNotification;
    const message = botNot ? botNot.Description : "";
    const { t } = this.context;

    return (
      <div>
        <Snackbar
          open={!this.state.wasClosed && !!botNot}
          autoHideDuration={timeNotification - 500}
          message={t(message)}
          onClose={() => this.handleRequestClose()}
          action={[
            <IconButton
              key="close"
              color="inherit"
              onClick={() => this.handleRequestClose()}
            >
              <Close />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bottomNotifications: get(state, "dialog.bottomNotifications")
});

const mapDispatchToProps = dispatch => ({
  closePastNotificationBottom() {
    dispatch(removePassBottomNotifications());
  }
});

BottomNotificationComponent.contextTypes = {
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BottomNotificationComponent));
