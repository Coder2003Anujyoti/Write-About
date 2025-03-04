import React,{useState,useEffect} from "react";
const App = () => {
  const [data,setData]=useState("");
  const [disabled,setDisabled]=useState(false);
  const add=async(text)=>{
    const res=await fetch("https://open-aileen-apisjdjjd-eed66aa2.koyeb.app/app/reaction", {
    method:"POST",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(text)
});
 const data=await res.json();
  alert("Successfully message sent");
setData("");
setDisabled(false);
  }
  const go=(text)=>{
  if(text.trim()!=''){
add({text:text});
setDisabled(true);
}
else{
  alert("Input required");
}
}
useEffect(() => {
    document.body.className ="bg-cyan-200"; // Apply Tailwind class to the body
  }, []);
  return (
    <>
    <div className="p-8  flex justify-center">
      <div className=" p-4  flex items-center text-center"><h1 className="text-2xl font-bold">Write Something About Anujyoti</h1></div>
    </div>
    <div className="p-8 flex justify-center font-bold text-2xl text-center">
    <h1>Enter the Text</h1>
    </div>
  {disabled==false && <> <div className="p-8 flex justify-center font-bold text-center"><textarea placeholder="Enter the text..." 
    value={data} onChange={(e)=>
    setData(e.target.value)} className="p-8 items-start rounded-lg shadow-lg" /></div>
    <div className="p-8 flex justify-center font-bold text-center"><button className="px-8 py-2 rounded-xl text-lg bg-indigo-400" onClick={()=>go(data)}>Submit</button></div> </>}
 

    </>
  )
}
export default App;
