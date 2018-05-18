import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'
import EmptySegment from "../../../common/segment/EmptySegment";
import { Field, FormSection, reduxForm } from 'redux-form';

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
import {load, show} from './_store/actions/closeFieldLoadActions';
import {clear} from './_store/actions/closeFieldLoadActions'

const FORM_ID = "load-close-field-form";
const FORM_WORK_AREA_ID = `${FORM_ID}-production-place`;
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

const DateTimeRangeSelectorRf = componentToReduxForm(DateTimeRangeSelector);

/** Load modal for closing a field */
export class LoadCloseField extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // prop: PropTypes
  }

  componentDidMount(){
      this.props.show();
  }
  componentWillUnmount(){
    this.props.clear();
  }

  closeModal(){
      this.props.hide()
  }

  onDateRangeChanged(value){
      console.log(value);
  }

  load(){
      const {handleSubmit, load, match, history, workAreaData} = this.props
      handleSubmit(
          data=>load({...data, ...workAreaData}, match.params.source, history.push))();      
  }

  render() {
    const {classes, process, isLoading, open, show, hide} = this.props;
    return (
      <EmptySegment useScroll={false}>
        
        <Button color="primary" onClick={()=>show()}>
            Load Close Field          {/* TODO: i18n */}
        </Button>

        <Dialog
            open={open}
            fullWidth={true}
            maxWidth='md'
            // onClose={this.handleClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle className={classes.heading} id="form-dialog-title">Load Close Field</DialogTitle>  {/* TODO: i18n */}
            <DialogContent className={classes.content}>
                <div >
                    <form onSubmit={()=>this.load()}>
                        <Panel title="Select Time Range">   {/* TODO: i18n222 */}
                            <Field component={DateTimeRangeSelectorRf}
                                    id="dateRange"
                                    name="dateRange"/>
                        </Panel>

                        <Panel title="Production Place">   {/* TODO: i18n */}
                            <FormSection name="productionPlace">
                                <WorkAreaSelector form={FORM_WORK_AREA_ID}/>
                            </FormSection>
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
    open: state.app.closeField.load.show,
    process: state.app.closeField._.process,
    workAreaData: get(state, `form.${FORM_WORK_AREA_ID}.values`)
})

const mapDispatchToProps = (dispatch) =>({
    load: (data, source, pushUrl)=>dispatch(load(data, source, pushUrl)),
    show: ()=>dispatch(show(true)),
    hide: ()=>dispatch(show(false)),
    clear: ()=>dispatch(clear()),
})

LoadCloseField = reduxForm({
    form: FORM_ID
})(LoadCloseField);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoadCloseField)))
