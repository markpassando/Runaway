import gameObject from './gameObject.js'

class Consumable extends gameObject {
  constructor(options) {
    super(options);
    this.type = options.type;
  }

}

export default Consumable;
