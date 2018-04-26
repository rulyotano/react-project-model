import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { withStyles } from 'material-ui-next/styles';
import { connect } from 'react-redux';
import { get, filter } from 'lodash';
import store from '../../store';

let t;

const styles = () => ({
    input: {
        marginLeft: '5px',
        marginRight: '5px',
        width: '100%'
    },
    wrapper: {
        marginLeft: '-5px',
        marginRight: '-5px',
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

const renderField = field => (
    <TextField
        errorText={field.meta.error}
        {...field} />
)

class WorkAreaSelector extends Component {

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
        const { classes, isHorizontal, initialValues } = this.props;
        t = this.context.t;

        return (
            <div className={classes.wrapper} style={{ display: isHorizontal ? 'flex' : 'block' }}>
                <div className={classes.input}>
                    <Field
                        name="cdFazenda"
                        type="text"
                        floatingLabelText={t("workAreaSelector.Farm")}
                        id="cdFazenda"
                        fullWidth={true}
                        component={renderField}
                        readOnly={initialValues.cdFazenda != null}
                    />
                </div>

                <div className={classes.input}>
                    <Field
                        name="cdSetor"
                        type="text"
                        floatingLabelText={t("workAreaSelector.Sector")}
                        id="cdSetor"
                        fullWidth={true}
                        component={renderField}
                    />
                </div>

                <div className={classes.input}>
                    <Field
                        name="cdTalhao"
                        type="text"
                        floatingLabelText={t("workAreaSelector.Field")}
                        id="cdTalhao"
                        fullWidth={true}
                        component={renderField}
                        onBlur={() => this.handleOnBlur()}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    this.getCdFazenda = () => {
        let map = get(state, 'map.mapMappedGeoJson');

        if (map) {
            let keys = Object.keys(map);
            return keys.length === 1 ? keys[0] : "";
        }

        return null;
    }

    return {
        initialValues: { cdFazenda: this.getCdFazenda() },
        fazenda: get(state, 'form.workAreaSelector.values.cdFazenda'),
        setor: get(state, 'form.workAreaSelector.values.cdSetor'),
        talhao: get(state, 'form.workAreaSelector.values.cdTalhao')
    }
}

WorkAreaSelector.propTypes = {
    isHorizontal: PropTypes.bool.isRequired,
};

WorkAreaSelector.contextTypes = {
    t: PropTypes.func
};

WorkAreaSelector = reduxForm({
    form: 'workAreaSelector',
    validate
})(WorkAreaSelector);

WorkAreaSelector = connect(mapStateToProps)(WorkAreaSelector);

export default withStyles(styles)(WorkAreaSelector);