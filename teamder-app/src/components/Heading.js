import React from "react";
import styled from "@emotion/styled";
import {Typography} from "@mui/material";

const SimpleHeading = styled(Typography)`
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: "Permanent Marker";
  text-align: center;
  font-size: 40px;
  color: deeppink;
  text-shadow: 1px 1px darkmagenta;
`;

export const Heading = ({children, ...props}) => {
    return (<SimpleHeading {...props}>{children}</SimpleHeading>);
}
