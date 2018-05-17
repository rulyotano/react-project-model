import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles, Button, Grid } from '@material-ui/core'
import ToolHoverWindow from '../../../common/tool-hover-window/ToolHoverWindow'
import LoadingButton from '../../../common/loading-button/LoadingButton'

const styles = {

}

export class MapCloseFieldMenu extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }
  static contextTypes = {
    t: PropTypes.func.isRequired
  }
  state = {
      isOpen: true
  }

  render() {
    const {isOpen} = this.state;
    const {classes} = this.props;
    const {t} = this.context;
    const footer = (<Grid container>
        <Grid item md="6"><LoadingButton>{t("closeField.map.Load_Map")}</LoadingButton></Grid>
        <Grid item md="6"><LoadingButton>{t("closeField.map.Close_Field")}</LoadingButton></Grid>        
    </Grid>)
    return (
        <ToolHoverWindow isOpen={isOpen} 
                labelHeader={t("closeField.map.Close_Field_Map")} 
                footer={footer}>


        </ToolHoverWindow>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseFieldMenu))
