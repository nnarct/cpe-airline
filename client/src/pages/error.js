import { Link } from "react-router-dom";
import Planefly from "../assets/errorPage/planeFly1.png";
import styled, { keyframes } from "styled-components";

const Wrap = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-zinc-100">
        <div className="container h-screen flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LikedAnimation = keyframes`
  0% {
    transform: scale(1) translateX(-100%);
  }
  100% {
    transform: scale(1) translateX(100%);
  }
`;

const ImageDiv = styled.div`
  height: 50px;
  align-items: center;
  animation: ${LikedAnimation} 4s infinite;
`;

export const Error = () => {
  return (
    <>
      <Wrap>
        <div className="rounded-2xl flex flex-col space-y-5 py-10 items-center justify-center bg-[#151729] shadow-4xl w-full max-w[800]">
          <h2 className="text-9xl text-white">404</h2>
          <ImageContainer>
            <ImageDiv>
              <img alt="" src={Planefly} className="h-[50px]" />
            </ImageDiv>
          </ImageContainer>
          <h4 className="text-7xl mb-5 text-[#111] bg-white font-bold py-2.5 px-5">
            Opps! Sorry
          </h4>
          <p className="text-white text-xl">You must to Log in first</p>
          <Link to="/login">
            <div className="py-2.5 px-5 bg-blue-500 text-white rounded-md mt-6 hover:ring">
              Log-in
            </div>
          </Link>
        </div>
      </Wrap>
    </>
  );
};
