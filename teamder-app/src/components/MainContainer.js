import React from "react";
import {Container} from "@mui/material";
import styled from "@emotion/styled";

const MContainer = styled(Container)`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MainContainer = ({children, ...props}) => {
    return (<MContainer container="main" maxWidth="xs" {...props}>
        {children}
    </MContainer>);
};
