import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Note, { NoteText, RemoveNoteBtn, RainbowStripe } from "./Note";

Enzyme.configure({ adapter: new Adapter() });

const props = { note: { text: "test_note" } };

describe("<Note/>", () => {
  let component = shallow(<Note {...props} />);

  it("renders a text", () => {
    let noteText = component.find(NoteText);
    expect(noteText.exists()).toBe(true);
    expect(noteText.text()).toEqual(props.note.text);
  });

  it("renders a removal button", () => {
    expect(component.find(RemoveNoteBtn).exists()).toBe(true);
  });

  it("renders a rainbow stripe", () => {
    expect(component.find(RainbowStripe).exists()).toBe(true);
  });
});
