import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get, map } from 'lodash'
import Dialog from 'material-ui/Dialog';

export class DialogComponent extends Component {
  static propTypes = {
    dialogs: PropTypes.array
  }

  onDialogClose(dialogId){
      console.log("Dialog Closed")
  }

  onActionButton(dialogId, buttonKey){
      
  }

  render() {
    let dialogs = this.props.dialogs
    return (
      <div>
          {
              map(dialogs, dialog=>
                <Dialog title={dialog.Title}
                        modal={dialog.Modal}
                        actions={map(dialog.Buttons, btn =>(<FlatButton
                                                                    key={btn.Key}
                                                                    label={btn.Lable}
                                                                    keyboardFocused={btn.Focused}
                                                                    onClick={this.handleClose}
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

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogComponent)
