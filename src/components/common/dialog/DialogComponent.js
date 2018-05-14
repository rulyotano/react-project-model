import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map, isString } from 'lodash'
import {Dialog, DialogTitle, DialogActions, Button,
        DialogContentText} from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'
import {removeDialog} from './_store/actions/dialogActions'
// import { localize } from 'redux-i18n'

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
    let {t} = this.context;
    let {dialogs} = this.props;
    return (
      <div>
          {
              map(dialogs, dialog=>
                <Dialog key={dialog.Id}
                        disableBackdropClick={dialog.Modal}
                        onExiting={()=>this.onDialogClose(dialog.Id)}
                        open={true}
                        fullWidth={true}
                        maxWidth='md'
                        aria-labelledby={`dialog-title-${dialog.Id}`}>
                    <DialogTitle id={`dialog-title-${dialog.Id}`}>
                      {isString(dialog.Title) ? t(dialog.Title) : dialog.Title}
                    </DialogTitle>
                    
                    <DialogContent>
                      {isString(dialog.Body) ? 
                        <DialogContentText>{t(dialog.Body)}</DialogContentText> 
                        : dialog.Body}
                    </DialogContent>
                    <DialogActions>
                      {map(dialog.Buttons, btn =>(<Button
                            key={btn.Key}                            
                            // keyboardFocused={btn.Focused}
                            onClick={()=>this.onActionButton(dialog.Id, btn)}
                        >{isString(btn.Label) ? t(btn.Label) : btn.Label}</Button>))}
                    </DialogActions>
                  </Dialog>)
          }        
      </div>
    )
  }
}

DialogComponent.contextTypes = {
  t: PropTypes.func
}

const mapStateToProps = (state) => ({
    dialogs: state.dialog.dialogs
})

const mapDispatchToProps = (dispatch) => ({
  closeDialog(dialogId){
    dispatch(removeDialog(dialogId))
  }  
})

export default  connect(mapStateToProps, mapDispatchToProps)(DialogComponent)
