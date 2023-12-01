import { createGlobalStyle}from 'styled-components'

export const  Global = createGlobalStyle`

*{
    margin:0;
    padding: 0;
    font-familuy: 'poppins', sans-serif;
}

body{
    width: 100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    background-color: f2f2f2;
}
`