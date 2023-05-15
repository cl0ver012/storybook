import React from 'react'
import styled, { keyframes } from 'styled-components'

const waves = keyframes`
   from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
`

const Root = styled.div`
  min-height: 20px;
  display: block;
  height: 100%;
`

const Waves = styled(Root)`
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  background-color: #eee;
  &:before {
    content: '';
    position: absolute;
    background-image: linear-gradient(
      90deg,
      #ececec 8%,
      #f5f5f5 18%,
      #ececec 33%
    );
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    animation: ${waves} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`

const Skeleton = ({ variant = 'rect', animation = 'waves', ...props }) => {
  return <Waves variant={variant} {...props} />
}

export default Skeleton
