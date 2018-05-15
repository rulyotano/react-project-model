import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { get, filter } from 'lodash';
import store from '../../store';
import textFieldToReduxForm from '../../../service/redux-form/textFieldToReduxForm';
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
        // marginLeft: '-5px',
        // marginRight: '-5px',
    },
    loading: {
        position: "absolute",
        left: "-20px",        
        top: "20px"
    }
});

const validate = (values, props) => {
    const errors = {}

    if (values.cdTalhao) {
        if (!values.cdFazenda)
            errors.cdFazenda = t('workAreaSelector.FarmRequired');

        if (!values.cdSetor)
            errors.cdSetor = t('workAreaSelector.SectorRequired');

        return errors;
    }

    if (values.cdSetor) {
        if (!values.cdFazenda)
            errors.cdFazenda = t('workAreaSelector.FarmRequired');

        return errors;
    }

    return errors
}

// const renderField = field => (
//     <TextField
//         errorText={field.meta.error}
//         {...field} />
// )
const renderField = textFieldToReduxForm(TextField);

class WorkAreaSelector extends PureComponent {
    componentWillMount(){
        //load geojson if not loaded exist
        this.props.loadGeoJson();
    }

    handleOnBlur() {
        const talhaoData = store.getState().map.mapGeoJson;

        if (!talhaoData)
            return;

        let { fazenda, setor, talhao } = this.props;

        if (!talhaoData || !talhao || (!!fazenda && !!setor))
            return;

        var matches = filter(talhaoData.features, f => f.properties.cdTalhao === talhao
            && (!fazenda || fazenda === f.properties.cdFazenda)
            && (!setor || setor === f.properties.cdZona));

        if (matches.length !== 1)
            return;

        if (fazenda !== matches[0].properties.cdFazenda) {
            fazenda = matches[0].properties.cdFazenda;
        }
        if (setor !== matches[0].properties.cdZona) {
            setor = matches[0].properties.cdZona;
        }

        this.props.change('cdFazenda', fazenda);
        this.props.change('cdSetor', setor);
    }

    render() {
        const { classes, isHorizontal = true, initialValues, isLoading } = this.props;
        t = this.context.t;
        const itemSize = isHorizontal ? 4 : 12;

        return (
            <div className={classes.wrapper}>
                <div className={classes.loading}><Loading size={20} isLoading={isLoading}/></div>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={itemSize}>
                        <div className={classes.input}>
                            <Field
                                name="cdFazenda"
                                type="text"
                                floatingLabelText={t("workAreaSelector.Farm")}
                                id="cdFazenda"
                                fullWidth={true}
                                component={renderField}
                                readOnly={initialValues.cdFazenda != null}
                                disabled={isLoading}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={itemSize}>
                        <div className={classes.input}>
                            <Field
                                name="cdSetor"
                                type="text"
                                floatingLabelText={t("workAreaSelector.Sector")}
                                id="cdSetor"
                                fullWidth={true}
                                component={renderField}
                                disabled={isLoading}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={itemSize}>
                        <div className={classes.input}>
                            <Field
                                name="cdTalhao"
                                type="text"
                                floatingLabelText={t("workAreaSelector.Field")}
                                id="cdTalhao"
                                fullWidth={true}
                                component={renderField}
                                onBlur={() => this.handleOnBlur()}
                                disabled={isLoading}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {

    let {form} = props; 

    this.getCdFazenda = () => {
        let map = state.map.mapMappedGeoJson;
        if (!map)
            return null;
        let keys = Object.keys(map);
        if (keys.length === 1)
            return keys[0];
        return null;
    }

    return {
        initialValues: { cdFazenda: this.getCdFazenda() },
        fazenda: get(state, `form.${form}.values.cdFazenda`),
        setor: get(state, `form.${form}.values.cdSetor`),
        talhao: get(state, `form.${form}.values.cdTalhao`),
        isLoading: state.map.isLoading
    }
}

const mapDispatchToProps = (dispatch)=>({
    loadGeoJson: ()=>dispatch(loadMapGeoJson())
})

WorkAreaSelector.propTypes = {
    form: PropTypes.string.isRequired,
    isHorizontal: PropTypes.bool,
};

WorkAreaSelector.contextTypes = {
    t: PropTypes.func
};

WorkAreaSelector = reduxForm({
    validate,
    enableReinitialize: true
})(WorkAreaSelector);

WorkAreaSelector = connect(mapStateToProps, mapDispatchToProps)(WorkAreaSelector);

export default withStyles(styles)(WorkAreaSelector);