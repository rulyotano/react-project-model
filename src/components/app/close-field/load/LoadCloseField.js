import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";
import { Field, reduxForm } from 'redux-form';

import {withStyles, Button, TextField, Dialog, DialogActions,
        DialogContentText, DialogTitle,
        Typography, Grid} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from 'react-router-dom'
import Panel from '../../../common/collapse-panel/Panel';
import WorkAreaSelector from '../../../common/work-area-selector/WorkAreaSelector';
import DateTimeRangeSelector from '../../../common/date-time-range-selector/DateTimeRangeSelector';
import {SelectRF} from '../../../common/select/Select';
import {OperationSelect} from '../../../common/select/common/OperationSelect';
import LoadingButton from '../../../common/loading-button/LoadingButton';
import componentToReduxForm from '../../../../service/redux-form/componentToReduxForm';
import {load} from './_store/actions/closeFieldLoadActions';

const FORM_ID = "load-close-field-form";
const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        background:'linear-gradient( to bottom, #fff 92%, #ddd 100%)'
    },
    content: {
        paddingTop:'15px',
        // backgroundColor:'#f5f5f5',


    },
    footer:{
        background:'linear-gradient( to top, #fff 88%, #ddd 100%)',
        margin:'0',
        padding:'8px'
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

  load(){
      const {handleSubmit, load, match, history} = this.props
      handleSubmit(
          data=>load(data, match.params.source*1, history.push))();      
  }

  render() {
    const {classes, process, isLoading} = this.props;
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

            <DialogTitle className={classes.heading} id="form-dialog-title">Load Close Field</DialogTitle>  {/* TODO: i18n */}
            <DialogContent className={classes.content}>
                <div >
                    <form onSubmit={()=>this.load()}>
                        <Panel title="Select Time Range">   {/* TODO: i18n222 */}
                            <Field component={componentToReduxForm(DateTimeRangeSelector)}
                                    id="dateRange"
                                    name="dateRange"/>
                        </Panel>

                        <Panel title="Production Place">   {/* TODO: i18n */}
                            <WorkAreaSelector form={FORM_ID}/>
                        </Panel>

                        <div>
                            <Grid container spacing={8}>
                                <Grid item xs={12} sm={6}>                                
                                    <Panel>   {/* TODO: i18n */}
                                       <Field component={SelectRF}
                                              suggestions={process}
                                              label="closeField.Process"
                                              id="process-input"
                                              name="process"
                                              attrId="id"
                                              attrLabel="desc"/>
                                    </Panel>
                                </Grid>
                                <Grid item xs={12} sm={6}>                                
                                    <Panel>   {/* TODO: i18n */}
                                        <Field component={OperationSelect}
                                            id="operation"
                                            label="Operation"
                                            name="operation"
                                            joinIdLabel={true}/>
                                    </Panel>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </div>
            </DialogContent>
            <DialogActions className={classes.footer}>
                <LoadingButton isLoading={isLoading} color="primary" onClick={()=>this.load()}>
                Load Map        {/* TODO: i18n */}
                </LoadingButton>
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
    isLoading: state.app.closeField.load.loading,
    process: state.app.closeField._.process
})

const mapDispatchToProps = (dispatch) =>({
    load: (data, source, pushUrl)=>dispatch(load(data, source, pushUrl))  
})

LoadCloseField = reduxForm({
    form: FORM_ID
})(LoadCloseField);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoadCloseField)))
