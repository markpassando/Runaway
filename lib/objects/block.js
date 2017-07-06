import gameObject from '../object.js';

class Block extends gameObject {
  constructor(options){
    super(options);

    this.type = options.type;
  }
}

export default Block;
