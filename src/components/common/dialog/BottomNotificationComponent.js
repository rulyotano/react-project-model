import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get, head } from 'lodash'
import Snackbar from 'material-ui/Snackbar';
import configService from '../../../config/configService';
import {removePassBottomNotifications} from './_store/actions/bottomNotificationActions';
import {NotificationTypes, NotificationTypesDefaults} from './classes/Notification';

export class BottomNotificationComponent extends Component {
  static propTypes = {
    bottomNotification: PropTypes.array,
    closePastNotificationBottom: PropTypes.func
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
    let timeNotification = configService.TIME_BOTTOM_NOTIFICATION
    let botNot = this.state.bottomNotification
    let message = botNot ? botNot.Description : ""
    let backColor = botNot ? NotificationTypesDefaults[botNot.Type].color : ""
    let fontColor = botNot ? NotificationTypesDefaults[botNot.Type].fontColor : ""
    const {t} = this.context

    return (
      <div>
          <Snackbar open={!this.state.wasClosed && !!botNot}
                    autoHideDuration={timeNotification-500}
                    message={t(message)}
                    onRequestClose={()=>this.handleRequestClose()}
                    bodyStyle={{ backgroundColor: backColor }}
                    contentStyle={{ color: fontColor }}
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomNotificationComponent)
