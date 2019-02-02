import React, {
  Component,
  ChangeEvent,
  EventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  RefObject
} from "react";
import Canvas, { OnMouseUp } from "./Canvas";
import Modal, { CloseOpenModalFunction } from "./Modal";
import PageListItem from "./PageListItem";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";
import { Page } from "../types";
import "./App.css";
import PageList from "./PageList";

interface AppState {
  activePageId?: number;
  newPage: string;
  pages: Page[];
}

class App extends Component<{}, AppState> {
  state: AppState = { newPage: "", pages: [] };

  inputRef: RefObject<HTMLInputElement> = React.createRef();

  handleChange = (
    name: keyof AppState
  ): EventHandler<ChangeEvent<HTMLInputElement>> => ({ target: { value } }) => {
    this.setState(prevState => ({ ...prevState, [name]: value }));
  };

  handleMouseUp: OnMouseUp = imageData => {
    this.setState(({ pages, ...prevState }) => {
      if (typeof prevState.activePageId !== "undefined") {
        const index = prevState.activePageId;

        const newPage = {
          ...pages[index],
          imageData
        };

        // replace existing page with new image data
        const newPages = [
          ...pages.slice(0, index),
          newPage,
          ...pages.slice(index + 1)
        ];

        return { ...prevState, pages: newPages };
      }

      return { pages, ...prevState };
    });
  };

  handleNewPageClick = (openModal: CloseOpenModalFunction) => () => {
    openModal(() => {
      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    });
  };

  handlePageClick = (id: number) => () => {
    this.setState({ activePageId: id });
  };

  handleSubmit = (
    closeModal: CloseOpenModalFunction
  ): FormEventHandler<HTMLFormElement> => event => {
    event.preventDefault();

    this.setState(
      state => {
        const lastPage = state.pages[state.pages.length - 1];
        const newPage = {
          id: lastPage ? lastPage.id + 1 : 0,
          imageData: new ImageData(CANVAS_WIDTH, CANVAS_HEIGHT),
          label: state.newPage
        };

        return {
          newPage: "",
          pages: [...state.pages, newPage]
        };
      },
      () => {
        closeModal();
        this.handlePageClick(this.state.pages.slice(-1)[0].id)();
      }
    );
  };

  render() {
    return (
      <>
        <h1>Sketchbook</h1>
        <div className="Container">
          <div className="outline">
            <div>
              <Modal
                render={({ openModal }) => (
                  <button
                    className="btn large primary"
                    onClick={this.handleNewPageClick(openModal)}
                  >
                    + New Page
                  </button>
                )}
              >
                {({ closeModal }) => {
                  const submit = this.handleSubmit(closeModal);

                  return (
                    <form className="Form" onSubmit={submit}>
                      <label htmlFor="page-name">Page Name:</label>
                      <input
                        autoComplete="off"
                        name="page-name"
                        id="page-name"
                        type="text"
                        value={this.state.newPage}
                        onChange={this.handleChange("newPage")}
                        ref={this.inputRef}
                        pattern={
                          this.state.pages.length
                            ? `^(?:(?!(^${this.state.pages
                                .map(({ label }) => label)
                                .join("$)|(^")}$)).)*$`
                            : undefined
                        }
                        required
                      />
                      <button className="large primary" type="submit">
                        Create New Page
                      </button>
                    </form>
                  );
                }}
              </Modal>
            </div>
            {typeof this.state.activePageId !== "undefined" && (
              <div>
                <PageList
                  pages={this.state.pages}
                  activePageId={this.state.activePageId}
                  onPageClick={this.handlePageClick}
                />
              </div>
            )}
          </div>
          {typeof this.state.activePageId !== "undefined" && (
            <Canvas
              imageData={this.state.pages[this.state.activePageId].imageData}
              onMouseUp={this.handleMouseUp}
            />
          )}
        </div>
      </>
    );
  }
}

export default App;
