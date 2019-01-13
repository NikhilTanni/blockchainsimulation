var name="";
var tmp=[];
class Block{
  constructor(index, timestamp, data, previoushash=''){
    this.index=index;
    this.timestamp=timestamp;
    this.data=data;
    this.previoushash=previoushash;
    this.hash=this.calculatehash();
  }

  calculatehash(){
    var str=(this.index+this.previoushash+this.timestamp+JSON.stringify(this.data)).toString();
    var asString="somestringhere";
    var seed=4;
    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
}
}

class Blockchain{
  constructor(time){
    this.chain = [this.createGenesisBlock(time)];
  }

  createGenesisBlock(time){
    return new Block(0, time, "Genesis block", "0");
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

let mycoin;

function proceed(k){
  if(k=='1'){
    name=document.getElementById("nickname").value;
    document.getElementById("pro1").style.display="none";
    document.getElementById("pro2").style.display="block";
    document.getElementById("pro2_name").innerHTML=name;
  }
  else if(k==2){
    document.getElementById("pro2").style.display="none";
    document.getElementById("pro3").style.display="block";
    document.getElementById("pro3_gen_block").innerHTML=tmp[0];
  }
  else if(k==3){
    document.getElementById("pro3").style.display="none";
    document.getElementById("pro4").style.display="block";
  }
}

function create_first_block(){
  var d = new Date();
  d.setMinutes(d.getMinutes() - 40);
  var time=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
   mycoin = new Blockchain(time);
   var hashvalue=mycoin.chain[0].calculatehash();
  document.getElementById("create_first_block_msg").innerHTML="Yay! Success. <br/> Your first block would look something like this<hr/><div class='oneblock'>Index : 0<br/>Timestamp: "+time+"<br/>Data: 0<br/>PreviousHash : 0<br/>HASH : "+hashvalue+"</div><br/>"
  tmp.push("<div class='oneblock'>Index : 0<br/>Timestamp: "+time+"<br/>Data: 0<br/>PreviousHash : 0<br/>HASH : "+hashvalue+"</div>");
  document.getElementById("block1_btn_id").innerHTML="<button class=\"block1_btn\" onclick=\"create_first_block()\">Create First Block</button> &nbsp;&nbsp; <button onclick='proceed(2);'>next step</button>";
}

function create_sec_block(){
  var d = new Date();
  d.setMinutes(d.getMinutes() - 20);
  var time=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
   mycoin.addBlock(new Block(1, "12/01/2019", { amount : 50 }));
   var hashvalue=mycoin.chain[1].calculatehash();
   document.getElementById("create_sec_block_msg").innerHTML="Yay! Success. <br/> Your Friends block would look something like this<hr/><div class='oneblock'>Index : 1<br/>Timestamp: "+time+"<br/>Data: amount: 50<br/>PreviousHash : "+mycoin.chain[0].hash+"<br/>HASH : "+hashvalue+"</div><br/>"
  tmp.push("<div class='oneblock'>Index : 1<br/>Timestamp: "+time+"<br/>Data: amount: 50<br/>PreviousHash : "+mycoin.chain[0].hash+"<br/>HASH : "+hashvalue+"</div>");
  document.getElementById("block2_btn_id").innerHTML="<button class=\"block2_btn\" onclick=\"create_first_block()\">Create First Block</button> &nbsp;&nbsp; <button onclick='proceed(3);'>next step</button>";

}