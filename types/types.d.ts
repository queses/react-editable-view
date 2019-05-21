import { FormikActions, FormikProps } from 'formik'
import { CSSProperties } from 'react';
import * as Yup from 'yup'

export type TEditableProps <V extends object = any> = {
  renderContent: TReactEditableFieldContent
  renderFormContent: TReactEditableFieldFormContent<V>,
  onSave: TReactEditableFieldOnSave
  formInitialValues: V
  onCancel?: TReactEditableFieldOnCancel
  formValidationSchema?: Yup.ObjectSchema<V>
} & React.HTMLAttributes<Element>

export type TReactEditableBuilder <V = any> = (
  renderers: TReactEditableBuilderComponents,
  options?: TReactEditableBuilderOptions
) => React.FC<TEditableProps>

export type TReactEditableBuilderComponents = {
  renderContentWrapper: TReactEditableRenderContentWrapper
  renderEditButton: TReactEditableRenderEditButton
  renderFormButtons: TReactEditableRenderFormButtons
  renderFormWrapper: TReactEditableRenderFormWrapper
}

export type TReactEditableBuilderOptions = {
  toHideContentOnEdit?: boolean
}

export type TReactEditableFieldContent <V = any> = () => JSX.Element
export type TReactEditableFieldFormContent <V = any> = (fp: FormikProps<V>) => JSX.Element
export type TReactEditableFieldOnSave <V = any> = (values: V, fa: FormikActions<V>) => void | Promise<void>
export type TReactEditableFieldOnCancel = () => void

export type TReactEditableRenderEditButton = (onEdit: Function) => JSX.Element
export type TReactEditableRenderFormButtons <V = any> = (fp: FormikProps<V>, onCancel: TReactEditableFieldOnCancel) => JSX.Element
export type TReactEditableRenderContentWrapper = (children: JSX.Element) => JSX.Element

export type TReactEditableRenderFormWrapper = (
  toShow: boolean, htmlAttrs: React.HTMLAttributes<Element>, children?: JSX.Element
) => JSX.Element
