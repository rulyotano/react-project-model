import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";
import {DropDownOperation} from '../../../common/dropdown/common/dropdown-operation'
import { Field, reduxForm } from 'redux-form';

import {withStyles, Button, TextField, Dialog, DialogActions,
        DialogContent, DialogContentText, DialogTitle,
        Typography, Grid} from '@material-ui/core';
import Panel from '../../../common/collapse-panel/Panel';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    content: {
        marginTop: "5px"
    }
});

/** Load modal for closing a field */
export class LoadCloseField extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // prop: PropTypes
  }

  render() {
    const {classes} = this.props;
    return (
      <EmptySegment useScroll={false}>
          Load Close Field

        <Dialog
            open={true}
            fullWidth={true}
            maxWidth='md'
            // onClose={this.handleClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Load Close Field</DialogTitle>  {/* TODO: i18n */}
            <DialogContent>
                <div className={classes.content}>
                    <form>
                        <Panel title="Select Time Range">   {/* TODO: i18n */}
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </Panel>

                        <Panel title="Production Place">   {/* TODO: i18n */}
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </Panel>

                        <div>
                            <Grid container spacing={8}>
                                <Grid item xs={12} sm={6}>                                
                                    <Panel title="Process">   {/* TODO: i18n */}
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Typography>
                                    </Panel>
                                </Grid>
                                <Grid item xs={12} sm={6}>                                
                                    <Panel title="Operation">   {/* TODO: i18n */}
                                    <Field component={DropDownOperation}
                                           id="operation"
                                           name="operation"/>
                                    </Panel>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </div>
            </DialogContent>
            <DialogActions>
                <Button color="primary">
                Load Map        {/* TODO: i18n */}
                </Button>
                <Button color="primary">
                Cancel          {/* TODO: i18n */}
                </Button>
            </DialogActions>
        </Dialog>
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

LoadCloseField = reduxForm({
    form: 'load-close-field-form'
})(LoadCloseField);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoadCloseField))
