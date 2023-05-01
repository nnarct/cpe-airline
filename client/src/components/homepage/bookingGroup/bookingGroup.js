import { useState } from "react";
import { ContentWrap } from "./contentWrap";
import { Flight } from "./flight/flight";
import { MenuBar } from "./menuBar";

export const BookingGroup = () => {
  const [content, setContent] = useState(<Flight />);
  const [active, setActive] = useState(0);

  const changeContent = (con, idx) => {
    setContent(con);
    setActive(idx);
  };
  return (
    <>
      <ContentWrap>
        <MenuBar changeContent={changeContent} active={active} />
        {content}
      </ContentWrap>
    </>
  );
};
