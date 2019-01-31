import React, {
  Component,
  ReactNode,
  ChangeEvent,
  RefObject,
  MouseEvent
} from "react";
import "./App.css";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

interface Page {
  id: number;
  imageData: ImageData;
  label: string;
}

const Modal = ({
  children,
  onBackgroundClick,
  open
}: {
  children: ReactNode;
  onBackgroundClick(): void;
  open: boolean;
}) => (
  <div
    className="Modal"
    style={open ? {} : { display: "none" }}
    onClick={onBackgroundClick}
  >
    <div
      onClick={event => {
        event.stopPropagation();
      }}
      style={{ padding: 16, background: "white" }}
    >
      {children}
    </div>
  </div>
);

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
    if (this.canvasRef.current) {
      const { offsetLeft, offsetTop } = this.canvasRef.current;
      const context = this.canvasRef.current.getContext("2d");

      if (context) {
        this.setState({ drawing: true }, () => {
          context.beginPath();
          context.moveTo(pageX - offsetLeft, pageY - offsetTop);
        });
      }
    }
  };

  handleMouseMove = ({ pageX, pageY }: MouseEvent<HTMLCanvasElement>) => {
    if (this.state.drawing && this.canvasRef.current) {
      const { offsetLeft, offsetTop } = this.canvasRef.current;
      const context = this.canvasRef.current.getContext("2d");

      if (context) {
        context.lineTo(pageX - offsetLeft, pageY - offsetTop);
        context.stroke();
      }
    }
  };

  handleMouseUp = () => {
    if (this.canvasRef.current) {
      const { width, height } = this.canvasRef.current;
      const context = this.canvasRef.current.getContext("2d");

      if (context) {
        this.setState({ drawing: false }, () => {
          context.closePath();

          this.setState(({ pages, ...prevState }) => {
            return {
              ...prevState,
              pages: [
                ...pages.slice(0, prevState.activePageId || 0),
                {
                  ...pages[prevState.activePageId || 0],
                  imageData: context.getImageData(
                    0,
                    0,
                    CANVAS_WIDTH,
                    CANVAS_HEIGHT
                  )
                },
                ...pages.slice((prevState.activePageId || 0) + 1)
              ]
            };
          });
        });
      }
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
      if (this.canvasRef.current) {
        const context = this.canvasRef.current.getContext("2d");

        if (context) {
          context.clearRect(
            0,
            0,
            this.canvasRef.current.width,
            this.canvasRef.current.height
          );
          context.putImageData(this.state.pages[id].imageData, 0, 0);
        }
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

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <div className="outline">
            <button onClick={this.handleNewPageClick}>New Page</button>
            <Modal
              onBackgroundClick={this.handleBackgroundClick}
              open={this.state.open}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
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
                  className={id === this.state.activePageId ? "active" : ""}
                  style={{ padding: 4 }}
                >
                  <button onClick={this.handlePageClick(id)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="outline" style={{ flex: 1 }}>
          {typeof this.state.activePageId !== "undefined" && (
            <canvas
              style={{ border: "1px solid" }}
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
