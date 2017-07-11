import gameObject from './gameObject.js';

class Block extends gameObject {
  constructor(options){
    super(options);

    this.type = options.type;
  }
}

export default Block;
