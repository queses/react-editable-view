import * as React from 'react'
import { TEvergreenEditableFormContent, TEvergreenEditableOnSave, TEvergreenEditableOnCancel, TEvergreenEditableContent, TReactEditableBuilder, TEditableProps } from '../types/types';
import { Formik, FormikConfig, FormikProps } from 'formik';

const ReactEditableBuilder: TReactEditableBuilder = (renderers, options = {}) => {
  const PrivateContent: React.FC<{
    renderContent: TEvergreenEditableContent, onEdit: Function
  }> = p => {
    return React.useMemo(() => (
      <React.Fragment>
        {p.renderContent()}
        {renderers.renderEditButton(p.onEdit)}
      </React.Fragment>
    ), [ p.renderContent, p.onEdit ])
  }

  const PrivateFormContent: React.FC<{
    renderContent: TEvergreenEditableFormContent, onSave: TEvergreenEditableOnSave, formInitialValues: any,
    onCancel: TEvergreenEditableOnCancel, formValidationSchema?: any
  }> = p => {
    const formikProps = React.useMemo((): FormikConfig<any> => ({
      initialValues: p.formInitialValues,
      validationSchema: p.formValidationSchema,
      onSubmit: async (values, actions) => {
        try {
          await p.onSave(values)
        } finally {
          actions.setSubmitting(false)
        }
      }
    }), [ p.formInitialValues, p.formValidationSchema, p.onSave ])
  
    const renderForm = React.useCallback((f: FormikProps<any>) => (
      <div>
        {p.renderContent(f)}
        {renderers.renderFormButtons(f, p.onCancel)}
      </div>
    ), [ p.renderContent, p.onCancel ])
  
    return React.useMemo(() => <Formik {...formikProps}>{renderForm}</Formik>, [ formikProps, renderForm ])
  }

  return (p: TEditableProps) => {
    const [ isEditing, setIsEditing ] = React.useState(false)
  
    const onEdit = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      setIsEditing(true)
    }, [])
  
    const onCancel = React.useCallback(() => {
      if (typeof p.onCancel === 'function') {
        p.onCancel()
      }
  
      setIsEditing(false)
    }, [ p.onCancel ])

    const onSave = React.useCallback(async (values: any) => {
      if (typeof p.onSave !== 'function') {
        console.error('ReactEditableEase "onSave" proprety should be a function')
      } else {
        await p.onSave(values)
        setIsEditing(false)
      }
    }, [ p.onSave ])
  
    return (
      <React.Fragment>
        {(isEditing)
          ? renderers.renderFormWrapper(
            true,
            <PrivateFormContent
              renderContent={p.renderFormContent} onSave={onSave} onCancel={onCancel}
              formInitialValues={p.formInitialValues} formValidationSchema={p.formValidationSchema}
            />
          )
          : renderers.renderFormWrapper(false)
        }

        {!(options.toHideContentOnEdit && isEditing) && renderers.renderContentWrapper(
          <PrivateContent renderContent={p.renderContent} onEdit={onEdit} />
        )}
      </React.Fragment>
    )
  }
}

export default ReactEditableBuilder