import { FormikActions, FormikProps } from 'formik'
import { CSSProperties } from 'react';
import * as Yup from 'yup'

export type TEvergreenEditableContent <V = any> = () => JSX.Element
export type TEvergreenEditableFormContent <V = any> = (f: FormikProps<V>) => JSX.Element
export type TEvergreenEditableOnSave <V = any> = (values: V) => void | Promise<void>
export type TEvergreenEditableOnCancel = () => void

export type TEditableProps <V extends object = any> = {
  renderContent: TEvergreenEditableContent
  renderFormContent: TEvergreenEditableFormContent<V>,
  onSave: TEvergreenEditableOnSave
  formInitialValues: V
  onCancel?: TEvergreenEditableOnCancel
  formValidationSchema?: Yup.ObjectSchema<V>
}

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

export type TReactEditableRenderEditButton = (onEdit: Function) => JSX.Element
export type TReactEditableRenderFormButtons <V = any> = (f: FormikProps<V>, onCancel: TEvergreenEditableOnCancel) => JSX.Element
export type TReactEditableRenderFormWrapper = (toShow: boolean, children?: JSX.Element) => JSX.Element
export type TReactEditableRenderContentWrapper = (children: JSX.Element) => JSX.Element