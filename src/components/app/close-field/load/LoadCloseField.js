import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import {Button, Grid} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import EmptySegment from "../../../common/segment/EmptySegment";
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
import Dlg from "../../../common/dialog-component/DialogComponent";

const DateTimeRangeSelectorRf = componentToReduxForm(DateTimeRangeSelector);

/** Load modal for closing a field */
export class LoadCloseField extends PureComponent {
  static propTypes = {
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
    this.props.hide();
  }

  onDateRangeChanged(value){
    console.log(value);
  }

  load(){
    const {handleSubmit, load, match} = this.props;
    handleSubmit(
      data=>load({...data, ...data.productionPlace}, match.params.source))();      
  }

  render() {
    const {process, isLoading, open, show,
      match } = this.props;
    const loadText = match.params.source === MAP_KEY ? "Load Close Field from Map" : /* TODO: i18n */
      match.params.source === PROCESS_KEY ? "Load Close Field from Process" : /* TODO: i18n */
        "";
    return (
      <EmptySegment useScroll={false}>
        
        <Button color="primary" onClick={()=>show()}>
          {loadText}
        </Button>

        <Dlg
          open={open}
          fullWidth
          maxWidth='md'
          // onClose={this.handleClose}
        >

          <Dlg.Header id="form-dialog-title">{loadText}</Dlg.Header>  {/* TODO: i18n */}
          <Dlg.Body>
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
                          joinIdLabel/>
                      </Panel>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </div>
          </Dlg.Body>
          <Dlg.Footer>
            <LoadingButton isLoading={isLoading} color="primary" onClick={()=>this.load()}>
                Load        {/* TODO: i18n */}
            </LoadingButton>
            <Button color="primary" onClick={()=>this.closeModal()}>
                Cancel          {/* TODO: i18n */}
            </Button>
          </Dlg.Footer>
        </Dlg>
      </EmptySegment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: getLoading(state),
  open: getShow(state),
  process: getProcess(state)
});

const mapDispatchToProps = (dispatch) =>({
  load: (data, source)=>dispatch(load(data, source)),
  show: ()=>dispatch(show(true)),
  hide: ()=>dispatch(show(false)),
  clear: ()=>dispatch(clear()),
});

LoadCloseField = reduxForm({
  form: "load-close-field-form"
})(LoadCloseField);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadCloseField));
