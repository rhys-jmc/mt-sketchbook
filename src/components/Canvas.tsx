import React, { Component, MouseEvent, RefObject } from "react";
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
      />
    );
  }
}
