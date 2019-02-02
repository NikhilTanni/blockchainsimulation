var name="";
var tmp=[];
var facts_index=[];
var facts=[
  "Blockchain can be used in scientific fields to assess research claims!",
  "Blockchain Technology has managed and distributed more than $270 billion in transactions.",
  "It is expected that Blockchain's market size will be $30 billion by 2024!",
  "Blockchain technology can be used as digital ID's to people.",
  "Blockchain can be public or private (just like internet and intranet)",
  "Blockchain's are highly transparent as because anyone with access to block can view entire chain.",
  "It is estimated that banks could save $8-12 billion annually if they used blockchain technology.",
  "Blockchain has many uses, besides cryptocurrency!!",
  "The Internet of Things (IoT) will benefit greatly from Blockchain Technology.",
  "Due to the tamper-proof nature of blockchain, it could be used to transform the way in which medical records are kept.",
  "The creator of blockchain is still unknown!!!!",
  "Bitcoin (application of Blockchain) Mining has high electricity consumption"
];
for(var kk=0;kk<facts.length;kk++){
  facts_index.push(kk);
}
function shuffle_facts(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
var random_facts = shuffle_facts(facts_index);
var curr_fact=0;

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
    if(document.getElementById("nickname").value=="" || document.getElementById("nickname").value.length<=0 || document.getElementById("nickname").value.replace(" ","")==""){
      document.getElementById("nickname").style.border="1px solid red";
      document.getElementById("nameerror").innerHTML="&nbsp;&nbsp; please enter name!";
      return;
    }
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
    document.getElementById("pro4_gen_block").innerHTML=tmp[0]+tmp[1];
    gethash(0);
    gethash(1);
  }
  else if(k==4){
    document.getElementById("pro4").style.display="none";
    document.getElementById("pro5").style.display="block";
    time=[19,16,10,8,2];
    ttt=""
    for(var i=0;i<5;i++){
      create_next_block(time[i]);
    }
    for(var i=0;i<tmp.length;i++){
      ttt=ttt+tmp[i]
    }
    document.getElementById("pro5_gen_block").innerHTML=ttt;
    document.getElementById("main_block").style.height="150%";

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

function create_next_block(calib_time){
  if(calib_time>=20){
    alert("error: Timing error!");
    return;
  }
  var d = new Date();
  d.setMinutes(d.getMinutes() - calib_time);
  d.setSeconds(d.getSeconds() - Math.floor(Math.random()*(59-1+1)+1));
  var time=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
   mycoin.addBlock(new Block(tmp.length-1, "12/01/2019", { amount : 30 }));
   var hashvalue=mycoin.chain[tmp.length-1].calculatehash();
   tmp.push("<div class='oneblock'>Index : "+(tmp.length-1)+"<br/>Timestamp: "+time+"<br/>Data: amount: 30<br/>PreviousHash : "+mycoin.chain[tmp.length-2].hash+"<br/>HASH : "+hashvalue+"</div>");
  
}

function gethash(k){
  document.getElementById("pro4_hash"+k).innerHTML=mycoin.chain[k].hash;
}

function show_more_blks(){

}



function modalset(){
  // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn1 = document.getElementById("myBtn1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
btn1.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

function getfact(){
  if(curr_fact>random_facts.length-1){
    curr_fact=0;
  }
  document.getElementById("bc_fact").innerHTML=facts[random_facts[curr_fact]];
  curr_fact=curr_fact+1;
}