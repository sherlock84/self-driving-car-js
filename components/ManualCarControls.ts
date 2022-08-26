import CarControls from './CarControls';

class ManualCarControls extends CarControls {
  private _forward = false;
  private _left = false;
  private _right = false;
  private _reverse = false;

  get forward() {
    return this._forward;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  get reverse() {
    return this._reverse;
  }

  mount() {
    if (document) {
      document.addEventListener('keydown', this.handleKeyDownEvent);
      document.addEventListener('keyup', this.handleKeyUpEvent);
    }
  }

  unmount() {
    if (document) {
      document.removeEventListener('keydown', this.handleKeyDownEvent);
      document.removeEventListener('keyup', this.handleKeyUpEvent);
    }
  }

  private handleKeyDownEvent = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        this._left = true;
        break;
      case 'ArrowRight':
        this._right = true;
        break;
      case 'ArrowUp':
        this._forward = true;
        break;
      case 'ArrowDown':
        this._reverse = true;
        break;
    }
  };

  private handleKeyUpEvent = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        this._left = false;
        break;
      case 'ArrowRight':
        this._right = false;
        break;
      case 'ArrowUp':
        this._forward = false;
        break;
      case 'ArrowDown':
        this._reverse = false;
        break;
    }
  };
}

export default ManualCarControls;
