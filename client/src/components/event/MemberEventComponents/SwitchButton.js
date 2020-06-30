import React, { useState } from 'react'
import styled from 'styled-components'

// Styled Components
const StyledSwitchButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    width: 38px;
    background-color: ${(props) =>
      props.active ? 'rgba(104, 142, 103, 0.8)' : 'rgba(156, 150, 138, 0.918)'};
    border-radius: 11px;
    border: 1px solid ${(props) => (props.active ? '#ECECEC' : '#ECECEC')};
    box-sizing: border-box;
    padding: 0;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    outline: none;
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 0px 1px 3px rgba(30, 30, 30, 0.3);
      transition: all 300ms ease-in-out;
      transform: ${(props) =>
        props.active ? 'translate(16px)' : 'translate(0)'};
      display: block;
    }
  }
  span {
    color: #00000;
    font-size: 18px;
    margin-left: 10px;
  }
`

class SwitchButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
    }
  }

  toggleSwitchButton = () => {
    this.setState({
      active: !this.state.active,
    })
    // console.log(this.state.active)
  }

  cafeClick() {
    this.props.cafeActiveReset()
    console.log(this.props)
  }

  render() {
    return (
      <>
        <StyledSwitchButton active={this.props.cafeActive}>
          <button onClick={() => this.cafeClick()}></button>
        </StyledSwitchButton>
      </>
    )
  }
}

export default SwitchButton
