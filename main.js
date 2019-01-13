const SHA256 = require('crypto-js/sha256');
class Block{
	constructor(index, timestamp, data, previoushash=''){
		this.index=index;
		this.timestamp=timestamp;
		this.data=data;
		this.previoushash=previoushash;
		this.hash=this.calculatehash();
	}

	calculatehash(){
		return SHA256(this.index+this.previoushash+this.timestamp+JSON.stringify(this.data)).toString();
	}
}

class Blockchain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, "01/01/2019", "Genesis block", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock){
		newBlock.previoushash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculatehash();
		this.chain.push(newBlock);
	}

	ischainvalid(){
		for(let i=1; i < this.chain.length; i++){
			const currblock = this.chain[i];
			const prevblock = this.chain[i-1];

			if(currblock.hash !== currblock.calculatehash()){
				return false;
			}

			if(currblock.previoushash !== prevblock.hash){
				return false;
			}
		}

		return true;
	}
}


let mycoin = new Blockchain();
mycoin.addBlock(new Block(1, "12/01/2019", { amount : 50 }));
mycoin.addBlock(new Block(2, "13/01/2019", { amount : 100 }));

console.log("is chain valid?? = "+mycoin.ischainvalid());

mycoin.chain[1].data = { amount: 500 };
mycoin.chain[1].hash = mycoin.chain[1].calculatehash();
console.log("is chain valid?? = "+mycoin.ischainvalid());

//console.log(JSON.stringify(mycoin, null, 4));