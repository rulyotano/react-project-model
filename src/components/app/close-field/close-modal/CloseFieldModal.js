import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {withStyles, Button, TextField, Dialog, DialogActions,
        DialogContent,
        DialogContentText, DialogTitle,
        Typography, Grid} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
        
import LoadingButton from '../../../common/loading-button/LoadingButton';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        background:'linear-gradient( to bottom, #fff 92%, #ddd 100%)'
    },
    content: {
        paddingTop:'15px',
    },
    footer:{
        background:'linear-gradient( to top, #fff 88%, #ddd 100%)',
        margin:'0',
        padding:'8px'
    }
});

export class CloseFieldModal extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool
  }

  submit(){
    const {handleSubmit} = this.props;
    //TODO:
  }

  render() {
    const {classes, open} = this.props;
    let isClosing = true;
    return (
      <Dialog open={open}
              fullWidth={true}
              maxWidth='md'
              aria-labelledby="close-dialog-title">
        <DialogTitle className={classes.heading} id="form-dialog-title">{"Close Field"}</DialogTitle>  {/* TODO: i18n */}
        <DialogContent className={classes.content}>
            <form onSubmit={()=>this.submit()}>

            </form>
        </DialogContent>
        <DialogActions className={classes.footer}>
            <LoadingButton isLoading={isClosing} color="primary" onClick={()=>this.submit()}>
                Close        {/* TODO: i18n */}
            </LoadingButton>
            <Button color="primary" onClick={()=>this.closeModal()}>
                Cancel          {/* TODO: i18n */}
            </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}


CloseFieldModal = reduxForm({
    form: "close-field-form"
})(CloseFieldModal);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CloseFieldModal))
