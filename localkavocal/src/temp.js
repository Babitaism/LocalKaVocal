function arrangingArr(arr) {
  let len = arr.length;
  debugger
  let temp = [];
  let t2 = []
  let flag = 0;
  for (let i=0 ;i<len; i++){
     t2.push(arr[i])
     flag+=1;
     if(flag == 3){
        temp.push(t2)
        flag = 0;
        t2 = []
     }
  }
  return temp
}
let arrangedArr = arrangingArr([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
console.log(arrangedArr);
