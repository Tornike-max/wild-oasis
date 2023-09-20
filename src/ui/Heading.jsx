import { css, styled } from "styled-components";

// const test = css`
// text-align:center;
// background-color:var(--color-green-700);
// color:var(--color-brand-100)
// `

const Heading = styled.h1`
    ${(props) =>
        props.as === 'h1' && css`
            text-align:center;
            font-weight:500;
            font-size:3rem;
        `
    }

    ${(props) =>
        props.as === 'h2' && css`
            text-align:center;
            font-weight:400;
            font-size:2rem;
        `
    }

    ${(props) =>
        props.as === 'h3' && css`
            text-align:center;
            font-weight:300;
            font-size:2rem;
        `
    }
`

export default Heading