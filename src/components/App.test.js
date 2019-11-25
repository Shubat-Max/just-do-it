import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App, * as _App from "./App";
import { RemoveNoteBtn } from "./Note";
import dictionary from '../dictionary';

Enzyme.configure({ adapter: new Adapter() });

const props = {
  componentTitle: "Just DO IT",
  removeNotesBtnTitle: dictionary.english.clearNotes,
  submitBtnTitle: dictionary.english.submit,
  emptyNote: "",
  testNote: "test_note_0",
  notes: ["test_note_1", "test_note_2", "test_note_3"]
};

describe("<App/>", () => {
  let component = mount(<App />);

  it("renders a title", () => {
    expect(component.find(_App.Title).text()).toEqual(props.componentTitle);
  });

  it("renders a button to clear all notes", () => {
    expect(component.find(_App.ClearButton).text()).toEqual(
      dictionary.english.clearNotes
    );
  });

  it('renders a button to switch language', () => {
    expect(component.find(_App.Switch).exists()).toBe(true);
  });

  describe('when switching language', () => {
    beforeEach(() => {
      // switch to russian language
      component.find(_App.Switch).simulate('click');
    });

    afterEach(() => {
      // switch back to english language
      component.find(_App.Switch).simulate('click');
    });

    it('changes the text language of `submit` button', () => {
      expect(component.find(_App.SubmitButton).text()).toEqual(dictionary.russian.submit);
    });

    it('changes the text language of `clear notes` button', () => {
      expect(component.find(_App.ClearButton).text()).toEqual(dictionary.russian.clearNotes);
    });

    it('changes the text language of input placeholder', () => {
      expect(component.find(_App.TodoInput).prop('placeholder')).toEqual(dictionary.russian.inputPlaceholder);
    });
  });

  describe("when rendering the form", () => {
    it("creates a form", () => {
      expect(component.find(_App.StyledForm).exists()).toBe(true);
    });

    it("creates an input field", () => {
      expect(component.find(_App.TodoInput).exists()).toBe(true);
    });

    it('creates an input placeholder', () => {
      expect(component.find(_App.TodoInput).prop('placeholder')).toEqual(dictionary.english.inputPlaceholder);
    });

    it("renders a submit button", () => {
      expect(component.find(_App.SubmitButton).text()).toEqual(
        props.submitBtnTitle
      );
    });
  });

  describe("when typing a note", () => {
    beforeEach(() => {
      component.find(_App.TodoInput).simulate("change", {
        target: { value: props.testNote }
      });
    });

    it("updates the value of input", () => {
      expect(component.find(_App.TodoInput).prop("value")).toEqual(
        props.testNote
      );
    });

    describe("and submitting a note", () => {
      beforeEach(() => {
        component.find(_App.SubmitButton).simulate("click");
      });

      afterEach(() => {
        component.find(_App.ClearButton).simulate("click");
      });

      it("adds a new note", () => {
        expect(component.find("Note").length).toEqual(1);
      });

      it("empties the input", () => {
        expect(component.find(_App.TodoInput).prop("value")).toEqual("");
      });

      describe("and submitting another three notes", () => {
        /* Since we know that note addition is working we can assert that we are able to add a bunch of notes */
        beforeEach(() => {
          /* Loading 3 more notes */
          props.notes.map(note => {
            component.find(_App.TodoInput).simulate("change", {
              target: { value: note }
            });
            component.find(_App.SubmitButton).simulate("click");
          });
        });

        it("renders 4 notes in total", () => {
          expect(component.find("Note").length).toEqual(4);
        });

        describe("and remounting the <App/> component", () => {
          let reComponent;

          beforeEach(() => {
            // useState works both shallow and mount
            // useEffect works only in mount or it can be mocked to work with shallow
            // Tips for useEffect in shallow:
            //
            // Mock the hook with: jest.spyOn(React, 'useEffect').mockImplementation(f => f());
            // Use React.useEffect instead of using the import { useEffect } from 'react'
            // Try mockImplementationOnce if you run into infinite loop problems in your tests.
            // You can use these techniques with any hook, not just useEffect.
            //
            (function() {
              jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());
            })();
            reComponent = shallow(<App />);
            // console.log(reComponent.debug());
          });

          it("renders correct amount of stored notes", () => {
            expect(reComponent.find("Note").length).toEqual(4);
          });
        });

        describe("and clicking the remove single note button", () => {
          it("removes one note from the list", () => {
            expect(component.find("Note").length).toEqual(4);
            component
              .find(RemoveNoteBtn)
              .at(0)
              .simulate("click");
            expect(component.find("Note").length).toEqual(3);
          });
        });

        describe("and clicking the clear button", () => {
          it("clears the notes in state", () => {
            component.find(_App.ClearButton).simulate("click");
            expect(component.find("Note").length).toEqual(0);
          });
        });
      });
    });
  });

  describe("when attempting to create an empty note", () => {
    beforeEach(() => {
      component.find(_App.TodoInput).simulate("change", {
        target: { value: props.emptyNote }
      });
    });

    describe("and submitting the note", () => {
      beforeEach(() => {
        component.find(_App.SubmitButton).simulate("click");
      });

      it("doesn't add the note to state", () => {
        expect(component.find("Note").length).toEqual(0);
      });
    });
  });
});
