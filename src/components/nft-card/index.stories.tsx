import React from "react";
import NFTCardComponent from "./index";

export default {
  title: "Components/nft",
  component: NFTCardComponent,
  argTypes: {},
};

export const Default: React.FC = () => {
  return (
    <div>
      <NFTCardComponent nft={{}} />
    </div>
  );
};
