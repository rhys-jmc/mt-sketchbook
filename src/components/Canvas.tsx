import React, {
  Component,
  MouseEvent,
  RefObject,
  TouchEventHandler,
  MouseEventHandler
} from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";

export type OnMouseUp = (imageData: ImageData) => void;

interface CanvasProps {
  imageData: ImageData;
  onMouseUp: OnMouseUp;
}

interface CanvasState {
  drawing: boolean;
}

export default class Canvas extends Component<CanvasProps, CanvasState> {
  state = { drawing: false };

  canvasRef: RefObject<HTMLCanvasElement> = React.createRef();

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

  shouldComponentUpdate({ imageData }: CanvasProps) {
    return this.props.imageData !== imageData;
  }

  getCanvasContext = () =>
    this.canvasRef.current && this.canvasRef.current.getContext("2d");

  blockScrolling = (event: TouchEvent) => {
    event.preventDefault();
  };

  startScrollingBlock = () => {
    document.addEventListener("touchstart", this.blockScrolling, {
      passive: false
    });
    document.addEventListener("touchmove", this.blockScrolling, {
      passive: false
    });
  };

  stopScrollingBlock = () => {
    document.removeEventListener("touchstart", this.blockScrolling);
    document.removeEventListener("touchmove", this.blockScrolling);
  };

  handleStart = ({ pageX, pageY }: { pageX: number; pageY: number }) => {
    const { offsetLeft, offsetTop } = this.currentCanvasRef;
    const context = this.getCanvasContext();

    if (context) {
      this.setState({ drawing: true }, () => {
        context.beginPath();
        context.moveTo(pageX - offsetLeft, pageY - offsetTop);
      });
    }
  };

  handleMove = ({ pageX, pageY }: { pageX: number; pageY: number }) => {
    if (this.state.drawing) {
      const { offsetLeft, offsetTop } = this.currentCanvasRef;
      const context = this.getCanvasContext();

      if (context) {
        context.lineTo(pageX - offsetLeft, pageY - offsetTop);
        context.stroke();
      }
    }
  };

  handleEnd = () => {
    this.setState({ drawing: false }, () => {
      const context = this.getCanvasContext();

      if (context) {
        context.closePath();

        this.props.onMouseUp(
          context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        );
      }
    });
  };

  handleMouseDown: MouseEventHandler<HTMLCanvasElement> = ({ pageX, pageY }) =>
    this.handleStart({ pageX, pageY });

  handleMouseMove: MouseEventHandler<HTMLCanvasElement> = ({ pageX, pageY }) =>
    this.handleMove({ pageX, pageY });

  handleMouseUp: MouseEventHandler<HTMLCanvasElement> = () => this.handleEnd();

  handleTouchStart: TouchEventHandler<HTMLCanvasElement> = ({ touches }) => {
    const { pageX, pageY } = touches[0];

    this.startScrollingBlock();

    return this.handleStart({ pageX, pageY });
  };

  handleTouchMove: TouchEventHandler<HTMLCanvasElement> = ({ touches }) => {
    const { pageX, pageY } = touches[0];

    return this.handleMove({ pageX, pageY });
  };

  handleTouchEnd: TouchEventHandler<HTMLCanvasElement> = () => {
    this.stopScrollingBlock();

    this.handleEnd();
  };

  render() {
    const context = this.getCanvasContext();

    if (context) {
      context.putImageData(this.props.imageData, 0, 0);
    }

    return (
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={this.canvasRef}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      />
    );
  }
}
