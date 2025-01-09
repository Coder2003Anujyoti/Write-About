import React,{useState,useEffect} from "react";
const App = () => {
  const [data,setData]=useState("");
  const add=async(text)=>{
    const res=await fetch("http://localhost:8000/app/reaction", {
    method:"POST",
    headers: {
        "Content-type":"application/json",
    },
    body:JSON.stringify(text)
});
 const data=await res.json();
  alert(data.message);
setData("");
  }
  const go=(text)=>{
  if(text.trim()!=''){
add({text:text});
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
    <div className="p-8 flex justify-center font-bold text-center"><textarea placeholder="Enter the text..." 
    value={data} onChange={(e)=>
    setData(e.target.value)} className="p-8 items-start rounded-lg shadow-lg" /></div>
    <div className="p-8 flex justify-center font-bold text-center"><button className="px-8 py-2 rounded-xl text-lg bg-indigo-400" onClick={()=>go(data)}>Submit</button></div>
 

    </>
  )
}
export default App;
