import * as React from 'react'
import { Pane, Card, Heading } from 'evergreen-ui'
import styled, { createGlobalStyle } from 'styled-components'
import EvergreenEditableViewExample from './EvergreenEditableViewExample'

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />

      <StyledHeadingWraper>
        <Heading size={600}>Evergreen React Editable View Example</Heading>
      </StyledHeadingWraper>

      <StyledWrapper>
        <EvergreenEditableViewExample />
      </StyledWrapper>
    </div>
  )
}

export default App

const StyledWrapper = styled(Card).attrs({ elevation: 3 })`
  width: 80vw;
  min-height: 220px;
  padding: 16px 32px 16px 32px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
`

const StyledHeadingWraper = styled(Pane).attrs({ elevation: 3 })`
  margin-bottom: 16px;
  width: 100%;
  height: 60px;
  vertical-align: middle;
  text-align: center;
  padding-top: 16px;
  background-color: #ffffff;
`

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background-color: #fafafa;
  }
`
