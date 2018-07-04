import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import {withStyles, Button, TextField, Dialog, DialogActions,
        DialogContent,
        DialogTitle,
        Grid} from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { SelectRF } from '../../../common/select/Select';
import config, {CLIENT_TYPE_CANE, CLIENT_TYPE_GRAIN } from '../../../../config/config';
import LoadingButton from '../../../common/loading-button/LoadingButton';
import {DateTimePicker} from '../../../common/date-time-picker/DateTimePicker';
import WorkAreaSelector from '../../../common/work-area-selector/WorkAreaSelector';
import * as processTypes from '../../../../service/close-field/processTypes'
import {get, find} from "lodash";
import {presence} from "redux-form-validators";
import {getLoadedProcess, getCultures, getProcess} from "../_duck/selectors";

const FORM_NAME = "close-field-form";
        

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

const PlantingDate = ({t})=><Field name="plantingDate" 
                                id="plantingDate" 
                                label={t("closeField.closeModal.Planting Date")}
                                component={DateTimePicker}
                                timeFormat={false}
                                validate={presence() }/>

export class CloseFieldModal extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    farm: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    closeModal: PropTypes.func
}
static contextTypes = {
    t: PropTypes.func
  }

  submit(){
    const {handleSubmit} = this.props;
    //TODO:
    handleSubmit((data)=>{
        console.log(data)
    })();
  }  

  render() {
    const {classes, open, process, cultures,
        formProcess, farm, sector, field, closeModal = ()=>{} } = this.props;
    const {t} = this.context;
    let isClosing = false;  //TODO:
    return (
      <Dialog open={open}
              fullWidth={true}
              maxWidth='md'
              aria-labelledby="close-dialog-title">
        <DialogTitle className={classes.heading} id="form-dialog-title">{"Close Field"}</DialogTitle>  {/* TODO: i18n */}
        <DialogContent className={classes.content}>
            <form onSubmit={()=>this.submit()}>
                <Grid container spacing={8}>
                    <Grid item md={6} xs={12}>                    
                        <Field name="process" 
                            id="process" 
                            label="closeField.closeModal.process"
                            component={SelectRF}
                            attrId="id"
                            attrLabel="desc"
                            isRequired={true}
                            suggestions={process}/>
                    </Grid>
                    <Grid item md={6} xs={12}>                                        
                        <Field name="culture" 
                                id="culture" 
                                label="closeField.closeModal.culture"
                                component={SelectRF}
                                attrId="id"
                                attrLabel="desc"
                                isRequired={true}
                                suggestions={cultures}/>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <WorkAreaSelector value={{farm, sector, field}} readOnly={true}/>
                    </Grid>
                    { !!formProcess && formProcess.type === processTypes.CANE_CUT ?  
                        <Grid item md={3} xs={12}>                                      
                            <Field name="fieldTons" 
                                    id="fieldTons" 
                                    label={t("closeField.closeModal.Enter field tons")}
                                    component={TextField}
                                    fullWidth={true}
                                    type="number"/>
                        </Grid> : null 
                    }

                    { !!formProcess && formProcess.type === processTypes.GRAIN_APPLICATION ?  
                        <React.Fragment>
                            <Grid item md={3} xs={12}>                                      
                                <PlantingDate t={t}/>
                            </Grid>
                            <Grid item md={3} xs={12}>                                      
                                <Field name="emergencyDate" 
                                    id="emergencyDate" 
                                    label={t("closeField.closeModal.Emergency Date")}
                                    component={DateTimePicker}
                                    timeFormat={false}/>
                            </Grid>                            
                            <Grid item md={3} xs={12}>                                      
                                <Field name="products" 
                                    id="products" 
                                    label={t("closeField.closeModal.Products")}
                                    component={TextField}
                                    fullWidth={true}/>
                            </Grid>                          
                            <Grid item md={3} xs={12}>                                      
                                <Field name="sweet" 
                                    id="sweet" 
                                    label={t("closeField.closeModal.Sweet")}
                                    component={TextField}
                                    fullWidth={true}/>
                            </Grid>
                            <Grid item md={3} xs={12}>                                      
                                <Field name="applicationOrder" 
                                    id="applicationOrder" 
                                    label={t("closeField.closeModal.Application Order")}
                                    component={TextField}
                                    type="number"
                                    fullWidth={true}/>
                            </Grid>
                        </React.Fragment>
                        : null 
                    }                    
                    { !!formProcess && formProcess.type === processTypes.GRAIN_PLANTING ?
                        <Grid item md={3} xs={12}>                                       
                            <Field name="seedVariety" 
                                id="seedVariety" 
                                label={t("closeField.closeModal.Seed Variety")}
                                component={TextField}
                                fullWidth={true}/>
                        </Grid>
                        :null
                    }
                    { !!formProcess && formProcess.type === processTypes.GRAIN_HARVEST ?
                        <Grid item md={3} xs={12}>                                      
                            <PlantingDate t={t}/>
                        </Grid>
                        :null
                    }
                </Grid>  
            </form>
        </DialogContent>
        <DialogActions className={classes.footer}>
            <LoadingButton isLoading={isClosing} color="primary" onClick={()=>this.submit()}>
                Close        {/* TODO: i18n */}
            </LoadingButton>
            <Button color="primary" onClick={()=>closeModal()}>
                Cancel          {/* TODO: i18n */}
            </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

//#region Selectors
const getFormProcessId = (state) => get(state,`form[${FORM_NAME}].values.process`);
const getFormProcess = createSelector(
    [getProcess, getFormProcessId], 
    (process, formProcessId) => formProcessId !== undefined ? find(process, p=>p.id === formProcessId) : null
)
const getInitialProcess = createSelector(
    [getLoadedProcess, getProcess],
    (selectedProcess, process) => selectedProcess !== undefined ? selectedProcess : 
                                    process.length === 1 ? process[0].id : undefined
)

const getInitialCulture = createSelector(
    [getCultures],
    (cultures)=> (config.CLIENT_TYPE === CLIENT_TYPE_CANE) 
                    || cultures.length === 1 ? cultures[0].id : undefined
)

const getInitialValues = createSelector(
    [getInitialProcess, getInitialCulture],
    (process, culture) => ({
        process,
        culture,
        plantingDate: new Date(),
        emergencyDate: new Date(),
    })
)
//#endregion

const mapStateToProps = (state, props) => {
    const isCane = config.CLIENT_TYPE === CLIENT_TYPE_CANE;
    const isGrain = config.CLIENT_TYPE === CLIENT_TYPE_GRAIN;
    const cultures = getCultures(state);
    const process = getProcess(state);
    const formProcess = getFormProcess(state, props);
    return {
        process,
        cultures,
        isGrain,
        isCane,
        formProcess,
        initialValues: getInitialValues(state, props)
    }
}

const mapDispatchToProps = {
  
}

CloseFieldModal = reduxForm({
    form: FORM_NAME
})(CloseFieldModal);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CloseFieldModal))
