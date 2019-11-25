import React from "react";
import Note from "./Note";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import styled from "styled-components";
import dictionary, { RU, EN } from "../dictionary";

const cookie_key = "NOTES";

export const App = () => {
  const [notes, setNotes] = React.useState([]);
  const [text, setText] = React.useState("");
  const [lang, setLang] = React.useState(EN);

  React.useEffect(() => {
    setNotes(read_cookie(cookie_key));
  }, []);

  const handleClearAllNotes = () => {
    setNotes([]);
    delete_cookie(cookie_key);
  };

  const handleNoteSubmit = () => {
    if (!text) return null;
    notes.push({ text });
    setNotes(notes);
    setText("");
    bake_cookie(cookie_key, notes);
  };

  const handleNoteRemove = index => {
    const filteredNotes = notes.filter((n, i) => i !== index);
    setNotes(filteredNotes);
    bake_cookie(cookie_key, filteredNotes);
  };

  // noinspection JSUnresolvedVariable
  return (
    <Wrapper>
      <UpperContainer>
        <Header>
          <Title>Just DO IT</Title>
          <SwitchLanguage>
            <Switch onClick={() => (lang === EN ? setLang(RU) : setLang(EN))}>
              Eng/Rus
            </Switch>
          </SwitchLanguage>
        </Header>

        <StyledForm>
          <TodoInput
            onChange={event => setText(event.target.value)}
            value={text}
            placeholder={dictionary[lang].inputPlaceholder}
          />
          <SubmitButton onClick={() => handleNoteSubmit()}>
            {dictionary[lang].submit}
          </SubmitButton>
        </StyledForm>
      </UpperContainer>
      <LowerContainer>
        <NotesContainer>
          {/* Gets updated even it shouldn't be */}
          {notes.map((note, index) => (
            <Note
              note={note}
              key={index}
              removeNote={() => handleNoteRemove(index)}
            />
          ))}
        </NotesContainer>
        <ClearButton onClick={() => handleClearAllNotes()}>
          {dictionary[lang].clearNotes}
        </ClearButton>
      </LowerContainer>
    </Wrapper>
  );
};

export default App;

/** Styled components */
export const Wrapper = styled.div`
  background: #4263ec;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const UpperContainer = styled.div`
  max-width: 560px;
  width: 100%;
  padding: 20px;
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

export const Title = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 2em;
  user-select: none;
  flex: 1;
`;

export const SwitchLanguage = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Switch = styled.span`
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 5px 10px;
  user-select: none;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.7em;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const LowerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top-left-radius: 50px;
  background: #fff;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    border-top-left-radius: 25px;
  }
`;

export const NotesContainer = styled.div`
  max-width: 560px;
  width: 100%;
  padding: 20px;
`;

export const StyledButton = styled.div`
  background: #ff7f51;
  padding: 10px 20px;
  border-radius: 3px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.7em;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
  transition: 0.24s;

  &:hover {
    background: #ff9974;
  }
`;

export const SubmitButton = styled(StyledButton)`
  //position: absolute;
  //top: 0;
  //right: 0;
  flex: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  @media (max-width: 768px) {
    border-radius: 3px;
    margin-top: 10px;
    text-align: center;
  }
`;
export const ClearButton = styled(StyledButton)``;

export const TodoInput = styled.input`
  width: 100%;
  min-height: 36px;
  padding: 0 10px 0 10px;
  border: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  outline-color: #ff7f51;
  flex: 1;
  @media (max-width: 768px) {
    border-radius: 3px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
