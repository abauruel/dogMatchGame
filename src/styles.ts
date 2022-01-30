import styled from 'styled-components'

export const Container = styled.div`
 height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

`

export const Game = styled.div`

//nicer divisible by 8
  width: 560px;
  height: 560px;
  display: flex;
  flex-wrap: wrap;
  img {
    width: 70px;
    height: 70px;
  }
`