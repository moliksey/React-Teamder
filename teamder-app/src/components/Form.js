import React from "react";
import styled from "@emotion/styled";

const NForm = styled.form`
  width: 100%;
  margin-top: 5px;
`

export const Form = ({children, ...props}) => {

    return (<NForm noValidate {...props}>{children}</NForm>);
};
