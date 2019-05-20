import * as React from 'react'
import { TReactEditableFieldFormContent, TReactEditableFieldOnSave, TReactEditableFieldOnCancel, TReactEditableFieldContent, TReactEditableBuilder, TEditableProps } from '../types/types';
import { Formik, FormikConfig, FormikProps, FormikActions } from 'formik';

const ReactEditableBuilder: TReactEditableBuilder = (renderers, options = {}) => {
  const PrivateContent: React.FC<{
    renderContent: TReactEditableFieldContent, onEdit: Function
  }> = p => {
    return React.useMemo(() => (
      <React.Fragment>
        {p.renderContent()}
        {renderers.renderEditButton(p.onEdit)}
      </React.Fragment>
    ), [ p.renderContent, p.onEdit ])
  }

  const PrivateFormContent: React.FC<{
    renderContent: TReactEditableFieldFormContent, onSave: TReactEditableFieldOnSave, formInitialValues: any,
    onCancel: TReactEditableFieldOnCancel, formHtmlProps: React.HTMLAttributes<Element>, formValidationSchema?: any
  }> = p => {
    const formikProps = React.useMemo((): FormikConfig<any> => ({
      initialValues: p.formInitialValues,
      validationSchema: p.formValidationSchema,
      onSubmit: async (values, actions) => {
        try {
          await p.onSave(values, actions)
        } finally {
          actions.setSubmitting(false)
        }
      }
    }), [ p.formInitialValues, p.formValidationSchema, p.onSave ])
  
    const renderForm = React.useCallback((f: FormikProps<any>) => (
      <div {...p.formHtmlProps}>
        {p.renderContent(f)}
        {renderers.renderFormButtons(f, p.onCancel)}
      </div>
    ), [ p.renderContent, p.onCancel, p.formHtmlProps ])
  
    return React.useMemo(() => <Formik {...formikProps}>{renderForm}</Formik>, [ formikProps, renderForm ])
  }

  return ({ renderContent, renderFormContent, onSave, formInitialValues, onCancel, formValidationSchema, ...formHtmlProps }: TEditableProps) => {
    const [ isEditing, setIsEditing ] = React.useState(false)
  
    const onEdit = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      setIsEditing(true)
    }, [])
  
    const onEditCancel = React.useCallback(() => {
      if (typeof onCancel === 'function') {
        onCancel()
      }
  
      setIsEditing(false)
    }, [ onCancel ])

    const onFieldSave = React.useCallback(async (values: any, actions: FormikActions<any>) => {
      if (typeof onSave !== 'function') {
        console.error('ReactEditableEase "onSave" proprety should be a function')
      } else {
        await onSave(values, actions)
        setIsEditing(false)
      }
    }, [ onSave ])
  
    return (
      <div>
        {(isEditing)
          ? renderers.renderFormWrapper(
            true,
            <PrivateFormContent
              renderContent={renderFormContent} onSave={onFieldSave} onCancel={onEditCancel}
              formInitialValues={formInitialValues} formValidationSchema={formValidationSchema}
              formHtmlProps={formHtmlProps}
            />
          )
          : renderers.renderFormWrapper(false)
        }

        {!(options.toHideContentOnEdit && isEditing) && renderers.renderContentWrapper(
          <PrivateContent renderContent={renderContent} onEdit={onEdit} />
        )}
      </div>
    )
  }
}

export default ReactEditableBuilder