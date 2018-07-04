import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EmptySegment from "../../../common/segment/EmptySegment";
import { Field, reduxForm } from 'redux-form';

import {withStyles, Button, Dialog, DialogActions,
        DialogTitle,
        Grid} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { withRouter } from 'react-router-dom'
import Panel from '../../../common/collapse-panel/Panel';
import {WorkAreaSelector} from '../../../common/work-area-selector/WorkAreaSelector';
import wAreaSelValidate from '../../../common/work-area-selector/workAreaSelector.validate';
import DateTimeRangeSelector from '../../../common/pickers/date-time-range';
import {SelectRF} from '../../../common/select/Select';
import {OperationSelect} from '../../../common/select/common/OperationSelect';
import LoadingButton from '../../../common/loading-button/LoadingButton';
import componentToReduxForm from '../../../../service/redux-form/componentToReduxForm';
import {load, show, clear} from './_duck/actions';
import {getLoading, getShow} from './_duck/selectors';
import {getProcess} from '../_duck/selectors';
import { PreloadKey as MAP_KEY} from '../map/routesNames';
import { PreloadKey as PROCESS_KEY} from '../process/routesNames';

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

  componentWillReceiveProps(newProps){
      if (newProps.match.params.source !== this.props.match.params.source){
        this.props.show();
      }
  }

  closeModal(){
      this.props.hide()
  }

  onDateRangeChanged(value){
      console.log(value);
  }

  load(){
      const {handleSubmit, load, match} = this.props
      handleSubmit(
          data=>load({...data, ...data.productionPlace}, match.params.source))();      
  }

  render() {
    const {classes, process, isLoading, open, show,
            match } = this.props;
    const loadText = match.params.source === MAP_KEY ? "Load Close Field from Map" : /* TODO: i18n */
                       match.params.source === PROCESS_KEY ? "Load Close Field from Process" : /* TODO: i18n */
                       "";
    return (
      <EmptySegment useScroll={false}>
        
        <Button color="primary" onClick={()=>show()}>
            {loadText}
        </Button>

        <Dialog
            open={open}
            fullWidth={true}
            maxWidth='md'
            // onClose={this.handleClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle className={classes.heading} id="form-dialog-title">{loadText}</DialogTitle>  {/* TODO: i18n */}
            <DialogContent className={classes.content}>
                <div >
                    <form onSubmit={()=>this.load()}>
                        <Panel title="Select Time Range">   {/* TODO: i18n */}
                            <Field component={DateTimeRangeSelectorRf}
                                    id="dateRange"
                                    name="dateRange"/>
                        </Panel>

                        <Panel title="Production Place">   {/* TODO: i18n */}
                            <Field component={WorkAreaSelector}
                                    id="productionPlace"
                                    name="productionPlace"
                                    validate={wAreaSelValidate}/>
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
                Load        {/* TODO: i18n */}
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
    isLoading: getLoading(state),
    open: getShow(state),
    process: getProcess(state)
})

const mapDispatchToProps = (dispatch) =>({
    load: (data, source)=>dispatch(load(data, source)),
    show: ()=>dispatch(show(true)),
    hide: ()=>dispatch(show(false)),
    clear: ()=>dispatch(clear()),
})

LoadCloseField = reduxForm({
    form: "load-close-field-form"
})(LoadCloseField);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoadCloseField)))
