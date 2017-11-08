import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get, map } from 'lodash'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {removeDialog} from './_store/actions/dialogActions'

export class DialogComponent extends Component {
  static propTypes = {
    dialogs: PropTypes.array
  }

  onDialogClose(dialogId){
      //dispatch action for closing the dialog
      this.props.closeDialog(dialogId)
  }

  onActionButton(dialogId, button){
    button.raiseAction()
    this.onDialogClose(dialogId)
  }

  render() {
    let dialogs = this.props.dialogs
    return (
      <div>
          {
              map(dialogs, dialog=>
                <Dialog key={dialog.Id}
                        title={dialog.Title}
                        modal={dialog.Modal}
                        actions={map(dialog.Buttons, btn =>(<FlatButton
                                                                    key={btn.Key}
                                                                    label={btn.Label}
                                                                    keyboardFocused={btn.Focused}
                                                                    onClick={()=>this.onActionButton(dialog.Id, btn)}
                                                                />))}
                        onRequestClose={()=>this.onDialogClose(dialog.Id)}
                        open={true}>{dialog.Body}</Dialog>)
          }        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    dialogs: get(state, 'dialog.dialogs')  
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog(dialogId){
    dispatch(removeDialog(dialogId))
  }  
})

export default connect(mapStateToProps, mapDispatchToProps)(DialogComponent)
