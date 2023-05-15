import styled from "styled-components";
import { ChakraProvider, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Spline from "@splinetool/react-spline";

import React from "react";
import Hexagon from "../util/icons";
import { validateUri } from "../util/conversion";

const Container = styled(ModalContent)<{ isAr: boolean }>`
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background: rgba(255, 255, 255, 0.06) !important;
  color: white !important;
  overflow: hidden;
  position: relative;
  max-width: ${({ isAr }) => (isAr ? "360px" : "800px")} !important;
  ${({ isAr }) => !isAr && "height: 800px"};
  @media (max-width: 480px) {
    max-width: 90vw !important;
    height: auto !important;
  }
`;
const ArViewWrapper = styled.div<{ disabled: boolean }>`
  width: 106px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 999px;
  font-size: 12px;
  backdrop-filter: blur(6px);

  ${({ disabled }) =>
    disabled
      ? `
      background: rgba(0, 0, 0, 0.1);
      cursor: not-allowed;
      opacity: 0.6;
      color: #888888;
    `
      : `
      background: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      color: #FFFFFF;

      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }
    `}
`;
const ARModal = ({ uri, content = "AR" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ChakraProvider>
      <ArViewWrapper
        disabled={!validateUri(uri)}
        onClick={(e) => {
          e.preventDefault();
          if (!validateUri(uri)) return;
          onOpen();
        }}
      >
        <Hexagon /> {content} VIEW
      </ArViewWrapper>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(14px)" bg="rgba(0, 0, 0, 0.34)" />
        <Container isAr={content === "AR"}>
          {content === "AR" ? (
            // eslint-disable-next-line jsx-a11y/iframe-has-title
            <iframe
              id="vossleIframe"
              allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;"
              src={`https://webar.vossle.com/markerless/?id=${uri}`}
              height="700px"
              width="360px"
            />
          ) : (
            <Spline scene={`https://prod.spline.design/${uri}/scene.splinecode`} />
          )}
        </Container>
      </Modal>
    </ChakraProvider>
  );
};

export default ARModal;
