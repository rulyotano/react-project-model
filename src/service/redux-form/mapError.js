const mapError = (
    {
      meta: { touched, error, warning } = {},
      input,
      ...props
    },
    hasErrorProp = 'error',
    errorProp = 'helperText'
  ) =>
    (touched && (error || warning)
      ? {
          ...props,
          ...input,
          [hasErrorProp]: !!(error || warning),
          [errorProp]: (error || warning),
        }
      : { ...input, ...props })
  
  export default mapError