import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";
import {DropDownOperation} from '../../../common/dropdown/common/dropdown-operation'
import { Field, reduxForm } from 'redux-form';

import {withStyles, Button, TextField, Dialog, DialogActions,
        DialogContentText, DialogTitle,
        Typography, Grid} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Panel from '../../../common/collapse-panel/Panel';
import WorkAreaSelector from '../../../common/work-area-selector/WorkAreaSelector';
import DateTimeRangeSelector from '../../../common/date-time-range-selector/DateTimeRangeSelector';
import {SelectRF} from '../../../common/select/Select';
import componentToReduxForm from '../../../../service/redux-form/componentToReduxForm';

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

  state = {
      isOpen: true
  }

  closeModal(){
      this.setState({isOpen: false})
  }

  onDateRangeChanged(value){
      console.log(value);
  }

  render() {
    const {classes, process} = this.props;
    const {isOpen} = this.state;
    return (
      <EmptySegment useScroll={false}>
          Load Close Field

        <Dialog
            open={isOpen}
            fullWidth={true}
            maxWidth='md'
            // onClose={this.handleClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Load Close Field</DialogTitle>  {/* TODO: i18n */}
            <DialogContent>
                <div className={classes.content}>
                    <form>
                        <Panel title="Select Time Range">   {/* TODO: i18n222 */}
                            <Field component={componentToReduxForm(DateTimeRangeSelector)}
                                    id="dateRange"
                                    name="dateRange"/>
                        </Panel>

                        <Panel title="Production Place">   {/* TODO: i18n */}
                            <WorkAreaSelector form="load-close-field-form-production-place"/>
                        </Panel>

                        <div>
                            <Grid container spacing={8}>
                                <Grid item xs={12} sm={6}>                                
                                    <Panel title="Process">   {/* TODO: i18n */}
                                       <Field component={SelectRF}
                                              suggestions={process}
                                              label="closeField.Process"
                                              id="process"
                                              name="process"
                                              attrId="id"/>
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
                <Button color="primary" onClick={()=>this.closeModal()}>
                Cancel          {/* TODO: i18n */}
                </Button>
            </DialogActions>
        </Dialog>
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
    process: state.app.closeField._.process  
})

const mapDispatchToProps = {
  
}

LoadCloseField = reduxForm({
    form: 'load-close-field-form'
})(LoadCloseField);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoadCloseField))
