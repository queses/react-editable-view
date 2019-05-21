import * as React from 'react'
import { Icon, Link, Card, Button, Tooltip } from 'evergreen-ui'
import styled from 'styled-components'
import ReactEditableBuilder from 'react-editable-view'
import posed, { PoseGroup } from 'react-pose'

const EvergreenEditable = ReactEditableBuilder({
  renderEditButton: onEdit => (
    <StyledIconEditLinkWrapper>
      <StyledIconEditLink href="" onClick={onEdit}>
        <Tooltip content="Change">
          <Icon icon="edit" />
        </Tooltip>
      </StyledIconEditLink>
    </StyledIconEditLinkWrapper>
  ),
  renderContentWrapper: children => (
    <StyledContentWrapper children={children} />
  ),
  renderFormButtons: (f, onCancel) => (
    <StyledFormButtons>
      <StyledFormSubmitButton
        type="submit"
        appearance="primary"
        intent="success"
        disabled={f.isSubmitting}
        onClick={f.handleSubmit}
      >
        Save
      </StyledFormSubmitButton>

      <Button
        type="button"
        appearance="minimal"
        intent="danger"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </StyledFormButtons>
  ),
  renderFormWrapper: (toShow, htmlAttrs, children) => {
    return (
      <PoseGroup>
        {toShow && (
          <StyledPosedFormCardWrapper {...htmlAttrs} key="editable-view-field">
            <StyledFormCard elevation={3} children={children} />
          </StyledPosedFormCardWrapper>
        )}
      </PoseGroup>
    )
  }
})

export default styled(EvergreenEditable)`
  width: 400px;
`

const StyledContentWrapper = styled.div`
  margin-top: 8px;
  display: flex;
`

const StyledIconEditLinkWrapper = styled.div``

const StyledIconEditLink = styled(Link)`
  margin-left: 8px;
  margin-top: auto;
  vertical-align: sub;
  color: #999;
  text-decoration-line: none;
  transition: color 0.5s ease;

  &:hover,
  &:focus {
    color: #425a70;
  }
`

const StyledFormButtons = styled.div`
  margin-left: auto;
  display: table;
`

const StyledFormSubmitButton = styled(Button)`
  margin-right: 16px;
`

const StyledPosedFormCardWrapper = styled(
  posed.div({
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: 'spring', stiffness: 1000, damping: 25 },
        default: { duration: 300 }
      }
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: { duration: 150 }
    }
  })
)`
  position: absolute;
`

const StyledFormCard = styled(Card)`
  margin-top: -8px;
  margin-left: -8px;
  background-color: white;
  padding: 12px;
`
