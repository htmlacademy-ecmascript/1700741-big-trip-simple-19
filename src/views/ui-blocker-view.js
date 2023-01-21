import '../framework/ui-blocker/ui-blocker.css';
import View from './views';

export default class UiBlockerView extends View {
  constructor() {
    super();

    this.classList.add('ui-blocker');
  }

  /**
   * @param {Boolean} flag
   */
  toogle(flag) {
    if (flag) {
      document.body.append(this);
      document.addEventListener('keydown', this.handleKeydown);
    }
    else {
      this.remove();
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    event.preventDefault();
  }
}

