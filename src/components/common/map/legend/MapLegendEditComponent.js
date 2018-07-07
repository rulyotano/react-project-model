import React, { PureComponent } from 'react'

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

export default class MapLegendEditComponent extends PureComponent {
  render() {
      const {open} = this.props;
    return (
        <Dialog
        open={open}
        fullWidth={true}
        maxWidth='md'
        aria-labelledby="edit-legend-modal">

        <DialogTitle className={classes.heading} id="edit-legend-modal">{loadText}</DialogTitle>  {/* TODO: i18n */}
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
    )
  }
}
