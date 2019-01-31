import React, { Component, ChangeEvent, RefObject, MouseEvent } from "react";
import Modal from "./Modal";
import "./App.css";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

interface Page {
  id: number;
  imageData: ImageData;
  label: string;
}

interface AppState {
  activePageId?: number;
  drawing: boolean;
  open: boolean;
  newPage: string;
  pages: Page[];
}

class App extends Component<{}, AppState> {
  state: AppState = { drawing: false, open: false, newPage: "", pages: [] };

  canvasRef: RefObject<HTMLCanvasElement> = React.createRef();
  inputRef: RefObject<HTMLInputElement> = React.createRef();

  handleBackgroundClick = () => {
    this.setState({ open: false });
  };

  handleChange = (name: keyof AppState) => ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({ ...prevState, [name]: value }));
  };

  handleMouseDown = ({ pageX, pageY }: MouseEvent<HTMLCanvasElement>) => {
    const { offsetLeft, offsetTop } = this.currentCanvasRef;
    const context = this.getCanvasContext();

    if (context) {
      this.setState({ drawing: true }, () => {
        context.beginPath();
        context.moveTo(pageX - offsetLeft, pageY - offsetTop);
      });
    }
  };

  handleMouseMove = ({ pageX, pageY }: MouseEvent<HTMLCanvasElement>) => {
    if (this.state.drawing) {
      const { offsetLeft, offsetTop } = this.currentCanvasRef;
      const context = this.getCanvasContext();

      if (context) {
        context.lineTo(pageX - offsetLeft, pageY - offsetTop);
        context.stroke();
      }
    }
  };

  handleMouseUp = () => {
    const context = this.getCanvasContext();

    if (context) {
      this.setState({ drawing: false }, () => {
        context.closePath();

        this.setState(({ pages, ...prevState }) => {
          const index = prevState.activePageId || 0;

          const newPage = {
            ...pages[index],
            imageData: context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
          };

          const newPages = [
            ...pages.slice(0, index),
            newPage,
            ...pages.slice(index + 1)
          ];

          return { ...prevState, pages: newPages };
        });
      });
    }
  };

  handleNewPageClick = () => {
    this.setState({ open: true }, () => {
      if (this.inputRef.current) {
        this.inputRef.current.focus();
      }
    });
  };

  handlePageClick = (id: number) => () => {
    this.setState({ activePageId: id }, () => {
      const { width, height } = this.currentCanvasRef;
      const context = this.getCanvasContext();

      if (context) {
        context.clearRect(0, 0, width, height);
        context.putImageData(this.state.pages[id].imageData, 0, 0);
      }
    });
  };

  handleSubmit = () => {
    this.setState(
      state => {
        const lastPage = state.pages[state.pages.length - 1];
        const newPage = {
          id: lastPage ? lastPage.id + 1 : 0,
          imageData: this.createImageData(),
          label: state.newPage
        };

        return {
          newPage: "",
          open: false,
          pages: [...state.pages, newPage]
        };
      },
      () => {
        this.handlePageClick(this.state.pages.slice(-1)[0].id)();
      }
    );
  };

  createImageData = () => {
    if (this.canvasRef.current) {
      const context = this.canvasRef.current.getContext("2d");

      if (context) {
        return context.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }

    return new ImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  getCanvasContext = () =>
    this.canvasRef.current && this.canvasRef.current.getContext("2d");

  get currentCanvasRef() {
    return (
      this.canvasRef.current || {
        width: 0,
        height: 0,
        offsetLeft: 0,
        offsetTop: 0
      }
    );
  }

  render() {
    return (
      <div className="Container">
        <div>
          <div className="outline">
            <button onClick={this.handleNewPageClick}>New Page</button>
            <Modal
              onBackgroundClick={this.handleBackgroundClick}
              open={this.state.open}
            >
              <div className="Form">
                <input
                  type="text"
                  value={this.state.newPage}
                  onChange={this.handleChange("newPage")}
                  ref={this.inputRef}
                  required
                />
                <button onClick={this.handleSubmit}>Create New Page</button>
              </div>
            </Modal>
          </div>
          <div className="outline">
            <ul>
              {this.state.pages.map(({ id, label }) => (
                <li
                  key={id}
                  className={`ListItem${
                    id === this.state.activePageId ? " active" : ""
                  }`}
                >
                  <button onClick={this.handlePageClick(id)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="CanvasContainer outline">
          {typeof this.state.activePageId !== "undefined" && (
            <canvas
              className="outline"
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              ref={this.canvasRef}
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
