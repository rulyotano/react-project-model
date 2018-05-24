import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Grid, FormHelperText, FormControl } from '@material-ui/core';
import { connect } from 'react-redux';
import { get, filter, isFunction, isString } from 'lodash';
import componentToReduxForm from '../../../service/redux-form/componentToReduxForm';
import Loading from '../../../components/common/_LoadingComponent';
import {loadMapGeoJson} from '../../../components/_store/actions/mapActions';

let t;

const styles = () => ({
    input: {
        marginLeft: '5px',
        marginRight: '5px',
        width: '100%'
    },
    wrapper: {
        position: "relative",
        width: '100%'
    },
    loading: {
        position: "absolute",
        left: "-20px",        
        top: "20px"
    }
});


class WorkAreaSelectorComponent extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                farm: PropTypes.string, 
                sector: PropTypes.string, 
                field: PropTypes.string
            })
        ]).isRequired,
        onChange: PropTypes.func,
        isHorizontal: PropTypes.bool,
        error: PropTypes.bool,
        helperText: PropTypes.string,
        readOnly: PropTypes.bool
    };    
    static contextTypes = {
        t: PropTypes.func
    };

    componentWillMount(){
        //load geojson if not loaded exist
        this.props.loadGeoJson();
    }
    componentDidMount(){
        this.setStateValues({farm: this.props.defaultFarm || ""});
    }

    componentWillReceiveProps(newProps){
        if (newProps.defaultFarm && newProps.defaultFarm !== this.props.defaultFarm){
            this.setStateValues({farm: newProps.defaultFarm});            
        }
    }

    setStateValues({farm, sector, field}){
        if (isFunction(this.props.onChange))
                this.props.onChange({
                    farm: farm === undefined ? this.props.value.farm : farm,
                    sector: sector === undefined ? this.props.value.sector : sector,
                    field: field === undefined ? this.props.value.field : field
                })
        // const newState = {};
        // if (farm !== undefined)
        //     newState.farm = farm;
        // if (sector !== undefined)
        //     newState.sector = sector;
        // if (field !== undefined)
        //     newState.field = field;
        // this.setState(newState, ()=> {            
        //     if (isFunction(this.props.onChange))
        //         this.props.onChange({
        //             farm: this.state.farm,
        //             sector: this.state.sector,
        //             field: this.state.field
        //         })
        // });
    }

    handleOnBlur() {
        const {mapGeoJson, value} = this.props;

        if (!mapGeoJson || !value || isString(value))
            return;

        let { farm, sector, field } = value;

        if (!field || (!!farm && !!sector))
            return;

        var matches = filter(mapGeoJson.features, f => f.properties.cdTalhao === field
            && (!farm || farm === f.properties.cdFazenda)
            && (!sector || sector === f.properties.cdZona));

        if (matches.length !== 1)
            return;

        if (farm !== matches[0].properties.cdFazenda) {
            farm = matches[0].properties.cdFazenda;
        }
        if (sector !== matches[0].properties.cdZona) {
            sector = matches[0].properties.cdZona;
        }
        this.setStateValues({farm, sector})
    }

    render() {
        const { classes, isHorizontal = true, isLoading,
                error, helperText, readOnly,
                defaultFarm, value } = this.props;
        let { farm = "", sector = "", field = "" } = value && !isString(value) ? value : {};
        t = this.context.t;
        const itemSize = isHorizontal ? 4 : 12;

        return (
            <div className={classes.wrapper}>
                <div className={classes.loading}><Loading size={20} isLoading={isLoading}/></div>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={itemSize}>
                        <div className={classes.input}>
                            <TextField type="text" 
                                label={t("workAreaSelector.Farm")}
                                id="farm"
                                name="farm"
                                fullWidth={true}
                                inputProps={{readOnly: readOnly || !!defaultFarm }}
                                disabled={isLoading}
                                value={farm}
                                error={error}
                                onChange={(e)=>this.setStateValues({farm: e.target.value})}/>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={itemSize}>
                        <div className={classes.input}>
                            <TextField type="text" 
                                label={t("workAreaSelector.Sector")}
                                id="sector"
                                name="sector"
                                fullWidth={true}
                                inputProps={{readOnly: readOnly }}
                                disabled={isLoading}
                                value={sector}
                                error={error}
                                onChange={(e)=>this.setStateValues({sector: e.target.value})}/>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={itemSize}>
                        <div className={classes.input}>                        
                            <TextField type="text" 
                                label={t("workAreaSelector.Field")}
                                id="field"
                                name="field"
                                fullWidth={true}
                                inputProps={{readOnly: readOnly }}
                                disabled={isLoading}
                                value={field} 
                                error={error}
                                onChange={(e)=>this.setStateValues({field: e.target.value})}
                                onBlur={()=>this.handleOnBlur()}/>
                        </div>
                    </Grid>
                    { error ? <Grid item sm={12}>
                        <FormControl>
                            <FormHelperText error={true}>{helperText}</FormHelperText>
                        </FormControl>
                    </Grid> : null}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const getDefaultFarm = () => {
        let map = state.map.mapMappedGeoJson;
        if (!map)
            return null;

        let keys = Object.keys(map);
        if (keys.length === 1)
            return keys[0];
        return null;
    }

    return {
        mapMappedGeoJson: state.map.mapMappedGeoJson,
        mapGeoJson: state.map.mapGeoJson,
        defaultFarm: getDefaultFarm(),
        isLoading: state.map.isLoading
    }
}

const mapDispatchToProps = (dispatch)=>({
    loadGeoJson: ()=>dispatch(loadMapGeoJson())
})

WorkAreaSelectorComponent = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WorkAreaSelectorComponent))

export const WorkAreaSelector = componentToReduxForm(WorkAreaSelectorComponent);
export default WorkAreaSelectorComponent;