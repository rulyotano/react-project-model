import React, { PureComponent } from "react";
import {
  Select as SelectMui,
  withStyles,
  CircularProgress,
  TextField
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import propTypes from "prop-types";
import { Search } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import { isArray } from "lodash";
import componentToReduxForm from "../../../service/redux-form/componentToReduxForm";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      transform: "translate3d(0, 0, 0)"
    }
  }
};

const styles = {
  fullWidth: {
    width: "100%"
  },
  progress: {
    marginTop: "23px",
    position: "absolute",
    right: "50%"
  }
};

class Select extends PureComponent {
  static contextTypes = {
    t: propTypes.func
  };

  static propTypes = {
    id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    attrId: propTypes.string.isRequired,
    attrLabel: propTypes.string,
    joinIdLabel: propTypes.bool,
    isRequired: propTypes.bool,
    isLoading: propTypes.bool,
    error: propTypes.bool, // if has error
    helperText: propTypes.string, // text error
    suggestions: propTypes.arrayOf(propTypes.object).isRequired,
    onChange: propTypes.func,
    value: propTypes.any,
    t: propTypes.func // only if not defined in context
  };
  
  constructor(props) {
    super(props);
    this.state = {
      criterion: ""
    };
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });

    this.props.onChange(value);
  };

  getDescription = item => {
    const {
      attrId = "id",
      attrLabel = "label",
      joinIdLabel = false
    } = this.props;
    let { t } = this.context;
    if (!t) t = this.props.t;
    const text = t(item[attrLabel]);
    return joinIdLabel ? `${item[attrId]} - ${text}` : text;
  };

  getFilteredItems = item => {
    const { criterion } = this.state;
    if (criterion === "") return true;
    const textToMatch = this.getDescription(item).toLowerCase();
    return textToMatch.includes(criterion.toLowerCase()) ? "" : "none";
  };

  render() {
    const {
      classes,
      suggestions,
      name,
      id,
      label,
      attrId = "id",
      isLoading = false,
      error = false,
      helperText = "",
      hasSearchInput = false,
      multiple = false,
      isRequired = false,
      value
    } = this.props;
    let { t } = this.context;
    if (!t) t = this.props.t;

    let renderValue = value !== undefined ? value : multiple ? [] : "";
    if (multiple && !isArray(renderValue)) renderValue = [];

    return (
      <FormControl className={classes.fullWidth} error={error}>
        <InputLabel htmlFor={id}>{t(label)}</InputLabel>
        <SelectMui
          className={classes.fullWidth}
          value={renderValue}
          MenuProps={MenuProps}
          multiple={multiple}
          id={id}
          input={
            <Input id={id} name={name} onChange={e => this.handleChange(e)} />
          }
        >
          {hasSearchInput ? (
            <MenuItem style={{ marginTop: "-8px", paddingLeft: "4px" }}>
              <TextField
                id="search"
                autoFocus
                name="search-name"
                value={this.state.criterion}
                fullWidth
                onChange={event => {
                  this.setState({ criterion: event.target.value });
                }}
                placeholder={t("Keep typing")}
                onClick={e => {
                  e.stopPropagation();
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </MenuItem>
          ) : null}
          {multiple || isRequired ? null : (
            <MenuItem value="">
              <em>{t("None")}</em>
            </MenuItem>
          )}
          {suggestions.map(m => (
            <MenuItem
              value={m[attrId]}
              key={m[attrId]}
              style={{ display: this.getFilteredItems(m) }}
            >
              {this.getDescription(m)}
            </MenuItem>
          ))}
        </SelectMui>
        {error ? <FormHelperText>{helperText}</FormHelperText> : null}
        {isLoading ? (
          <CircularProgress className={classes.progress} size={20} />
        ) : (
          ""
        )}
      </FormControl>
    );
  }
}

Select = withStyles(styles)(Select);

export const SelectRF = componentToReduxForm(Select);
export default Select;
