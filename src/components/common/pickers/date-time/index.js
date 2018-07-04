import React,{PureComponent} from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import {isDate} from 'lodash';
import {isString, debounce} from 'lodash';
import TetheredDateTime from './TetheredDateTime';
import componentToReduxForm from '../../../../service/redux-form/componentToReduxForm';

// import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment/locale/en-ca';
import 'moment/locale/es';

import "../../../../styles/css/react-datetime.css"
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
    },
});


class DateTimePickerComponent extends PureComponent{
    static propTypes = {
        value:PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        label:PropTypes.string,
        id:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired,
        timeFormat: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    };
    static contextTypes = {
        t: PropTypes.func,
    };

    state = {
        value: ""
    };

    dOnChange = debounce(this.onChange, 300);
    onChange(mDate){
        let value = isString(mDate) ? null : mDate.toDate();
        this.props.onChange(value);
        this.setState({ value });
    }

    render(){

        const { classes, id, label, value = this.state.value,
            timeFormat, ...otherProps } = this.props;
        const {t} = this.context;


        let fValue = value;
        if (!isDate(fValue))
            fValue = null;
        return(

            <TetheredDateTime {...otherProps}
                locale={t('calendarLocale')}
                timeConstraints={ {minutes: { step: 5 }}}
                closeOnSelect={true}
                onChange={v=>this.dOnChange(v)}                
                value={fValue}
                input={true}
                label={label}
                timeFormat={timeFormat}
                inputProps={{
                    id
                }}
            />
        )

    }
}
export const DateTimePicker = componentToReduxForm(DateTimePickerComponent);
export default withStyles(styles)(DateTimePickerComponent);