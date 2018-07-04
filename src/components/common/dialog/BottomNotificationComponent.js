import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get, head } from 'lodash'
import {withStyles, Snackbar, IconButton} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import config from '../../../config/config';
import {removePassBottomNotifications} from './_store/actions/bottomNotificationActions';

const styles = theme => ({
  // [`snackbar${NotificationTypes.ALERT}`]: {
  //   backgroundColor: NotificationTypesDefaults[NotificationTypes.ALERT].color,
  //   color: NotificationTypesDefaults[NotificationTypes.ALERT].fontColor
  // },
  // [`snackbar${NotificationTypes.NOTIFICATION}`]: {
  //   backgroundColor: NotificationTypesDefaults[NotificationTypes.NOTIFICATION].color,
  //   color: NotificationTypesDefaults[NotificationTypes.ALERT].fontColor
  // },
  // [`snackbar${NotificationTypes.SUCCESS}`]: {
  //   backgroundColor: NotificationTypesDefaults[NotificationTypes.SUCCESS].color,
  //   color: NotificationTypesDefaults[NotificationTypes.ALERT].fontColor
  // },
  // [`snackbar${NotificationTypes.ERROR}`]: {
  //   backgroundColor: NotificationTypesDefaults[NotificationTypes.ERROR].color,
  //   color: NotificationTypesDefaults[NotificationTypes.ALERT].fontColor
  // },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

export class BottomNotificationComponent extends Component {
  static propTypes = {
    bottomNotification: PropTypes.array,
    closePastNotificationBottom: PropTypes.func,
    classes: PropTypes.object.isRequired,
  }

  constructor(){
      super()
      this.state = {
        bottomNotification: null,
        wasClosed: false
      }
  }

  componentDidMount(){
      this._intervalId = setInterval(()=>{
          this.props.closePastNotificationBottom()
      }, 1000)      
    this.setStateFromProps(this.props)
  }

  componentWillUnmount(){
      if (this._intervalId)
        clearInterval(this._intervalId)
  }

  componentWillReceiveProps(newProps){
    this.setStateFromProps(newProps)
  }

  setStateFromProps(props){
    let newBotNot = head(props.bottomNotifications)
    if (newBotNot !== this.state.bottomNotification)
      this.setState({
          bottomNotification: newBotNot,
          wasClosed: false
      })
  }

  handleRequestClose(){
    this.setState({
        wasClosed: true
    })
  }

  render() {
    let timeNotification = config.TIME_BOTTOM_NOTIFICATION
    let botNot = this.state.bottomNotification
    let message = botNot ? botNot.Description : ""
    // let snackbarClass = botNot ? `snackbar${botNot.Type}` : ""
    const {classes} = this.props;
    const {t} = this.context;
    // const snackBarClasses = {
    //   anchorOriginBottomCenter: classes[snackbarClass]
    // }

    return (
      <div>
          <Snackbar open={!this.state.wasClosed && !!botNot}
                    autoHideDuration={timeNotification-500}
                    message={t(message)}
                    onClose={()=>this.handleRequestClose()}
                    // classes={snackBarClasses}
                    // style={{ backgroundColor: backColor }}
                    // contentStyle={{ color: fontColor }}
                    action={[
                      <IconButton
                        key="close"
                        color="inherit"
                        className={classes.close}
                        onClick={()=>this.handleRequestClose()}>
                        <Close />
                      </IconButton>,
                    ]}
                    />       
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    bottomNotifications: get(state, 'dialog.bottomNotifications')  
})

const mapDispatchToProps = dispatch => ({
    closePastNotificationBottom(){
        dispatch(removePassBottomNotifications())
    }  
})

BottomNotificationComponent.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BottomNotificationComponent))
