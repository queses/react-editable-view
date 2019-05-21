import * as React from 'react'
import EvergreenEditableView from './EvergreenEditableView'
import {
  Paragraph,
  Label,
  Heading,
  TextInputField,
  toaster
} from 'evergreen-ui'
import styled from 'styled-components'
import * as Yup from 'yup'
import { FormikActions } from 'formik'

const EvergreenEditableViewExample: React.FC = () => {
  const [product, setProduct] = React.useState({
    price: 2000,
    title: 'Mazda RX8'
  })

  const onFieldSave = React.useCallback(
    async (editedValues: typeof product, formikAction: FormikActions<any>) => {
      // Make some async calculations...
      await new Promise(r => setTimeout(r, 500))

      setProduct({ ...product, ...editedValues })
      toaster.success('Field updated!')
    },
    [product]
  )

  return (
    <div>
      <Heading size={500}>View car "{product.title}"</Heading>

      <StyledEditableFieldWrapper>
        <Label>Title</Label>

        <EvergreenEditableView
          renderContent={() => <Paragraph>{product.title}</Paragraph>}
          renderFormContent={f => (
            <TextInputField
              name="title"
              value={f.values.title}
              label=""
              validationMessage={Boolean(f.touched.title) && f.errors.title}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              autoFocus
            />
          )}
          formInitialValues={product}
          formValidationSchema={Yup.object({
            title: Yup.string()
              .min(3)
              .max(512)
              .required()
          })}
          onSave={onFieldSave}
        />
      </StyledEditableFieldWrapper>

      <StyledEditableFieldWrapper>
        <Label>Price</Label>

        <StyledThinEditableView
          renderContent={() => <Paragraph>{product.price} $</Paragraph>}
          renderFormContent={f => (
            <TextInputField
              name="price"
              value={f.values.price}
              label=""
              validationMessage={Boolean(f.touched.price) && f.errors.price}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              autoFocus
            />
          )}
          formInitialValues={product}
          formValidationSchema={Yup.object({
            price: Yup.number()
              .min(0)
              .required()
          })}
          onSave={onFieldSave}
        />
      </StyledEditableFieldWrapper>
    </div>
  )
}

export default EvergreenEditableViewExample

const StyledEditableFieldWrapper = styled.div`
  margin-top: 24px;
`

const StyledThinEditableView = styled(EvergreenEditableView)`
  width: 200px;
`
