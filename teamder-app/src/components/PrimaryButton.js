import React from "react";
import {Button} from "@mui/material";
import styled from "@emotion/styled";

const PButton = styled(Button)`
    margin-top: 10px;
`

export const PrimaryButton = ({children, props}) => {
    return (<PButton type="submit" variant="contained" color="primary" fullWidth {...props}>{children}</PButton>);
};
