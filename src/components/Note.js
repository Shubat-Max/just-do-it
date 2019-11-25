import React from "react";
import styled from "styled-components";

const gradients = [
  ["#009FFF", "#ec2F4B"],
  ["#8A2387", "#E94057", "#F27121"],
  ["#a8ff78", "#78ffd6"],
  ["#005AA7", "#FFFDE4"],
  ["#DA4453", "#89216B"],
  ["#636363", "#a2ab58"],
  ["#ad5389", "#3c1053"],
  ["#40E0D0", "#FF8C00", "#FF0080"],
  ["#11998e", "#38ef7d"]
];

const Note = ({ note: { text }, removeNote }) => {
  return (
    <NoteWrapper>
      <NoteText>{text}</NoteText>
      <RemoveNoteBtn onClick={removeNote}>X</RemoveNoteBtn>
      <RainbowStripe
        gradient={
          gradients[Math.floor(Math.random() * Math.floor(gradients.length))]
        }
      />
    </NoteWrapper>
  );
};

export default Note;

/** styled components */
export const NoteWrapper = styled.div`
  padding: 20px;
  margin: 0 0 10px 0;
  //border: 1px solid rgba(0, 0, 0, 0.15);
  //border: 1px solid rgba(66, 99, 236, 0.15);
  //box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 3px 0 rgba(66, 99, 236, 0.15);
  border-radius: 3px;
  //border-bottom-right-radius: 3px;
  //border-top-right-radius: 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 560px;
  transition: 0.24s;
  position: relative;

  &:last-of-type {
    margin: 0;
  }

  &:hover {
    //border: 1px solid rgba(0, 0, 0, 0.30);
    //border: 1px solid rgba(66,99,236,0.4);
    //box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 7px 0 rgba(66, 99, 236, 0.3);
  }
`;

export const NoteText = styled.div`
  flex: 1;
  word-break: break-word;
`;

export const RemoveNoteBtn = styled.div`
  flex: 0 1 26px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:hover {
    background: #f0f0f0;
  }

  &:active {
    background: lightgray;
  }
`;

export const RainbowStripe = styled.div`
  width: 3px;
  height: 100%;
  background: linear-gradient(25deg, ${props => props['gradient'].join(",")});
  position: absolute;
  top: 0;
  left: 0;
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
`;
