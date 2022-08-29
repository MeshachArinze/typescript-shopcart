import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: space-between;
  padding-bottom: 20px;

  div {
      flex: 1;
  }

  .information, .buttons {
      display: flex;
      justify-content: space-between;
  }

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }

  div {
    padding: 1rem;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
  }

`