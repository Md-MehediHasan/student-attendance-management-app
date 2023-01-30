import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {
  const [student,setStudent]=useState("")
  const [studentList,setStudentList]=useState([])
  const [editMode,setEditMode]=useState(null)
  const [editable,setEditable]=useState()
  const [ispresent,setIsPresent]=useState()

  const studentCreater=()=>{
  
   if(student !==""){
    const newStudent={
      id:Date.now(),
      name:student,
    }
    setStudentList([newStudent,...studentList])
    setStudent("")
    
   }
   else{
    alert("Please enter a valid Student name")
   }
   
  }
  const editHandler=(id)=>{
    const editable=studentList.find(stud=>stud.id===id)
    setStudent(editable.name)
    setEditMode(true)
    setEditable(editable)
  }
  const updateHandler=(id)=>{
  setStudent(studentList.map(stu=>{
    if(stu.id===editable.id){
      stu.name=student
    }
    return stu
  }))
  setStudent("")
  }
  const deleteHandler=(id)=>{
    setStudentList(studentList.filter(stu=>stu.id !==id))
  }

  const presentHandler=(id)=>{
    console.log("I am here")
    const presentStud=studentList.find(stud=>stud.id===id)
    console.log(presentStud)
   if(presentStud.ispresent===true){
    alert("The student already is in present list")
   }else if(presentStud.ispresent===undefined){
   setStudentList(studentList.map((stu)=>{
    if(stu.id===presentStud.id){
      stu.ispresent=true
    }
    return stu
   }))
   }
    else if(presentStud.ispresent===false){
      alert("The student is in absent list. To change please hit accidentally button")
    }
  }

  const absentHandler=(id)=>{
    const absentStu=studentList.find(stu=>stu.id===id)
    if(absentStu.ispresent===undefined){
      setStudentList(studentList.map((stu)=>{
        if(stu.id===absentStu.id){
          stu.ispresent=false
        }
        return stu
      }))
    }
    else if(absentStu.ispresent===true){
      alert("The student is in present list. To change please hit accidentally button")
    }
    else if(absentStu.ispresent===false){
      alert("The student already in absent list")
    }

  }
  const toggoller=(id)=>{
    const targetId=studentList.find(stu=>stu.id===id)
    setStudentList(studentList.map((stu)=>{
      if(stu.id===targetId.id){
        stu.ispresent =undefined
      }
      return stu
    }))
  }

  return (
    <div className="App">
  <h1>Student Management App</h1>
    <form onSubmit={(event)=>{event.preventDefault(); editMode ?updateHandler():studentCreater()}}>
        <input type='text' placeholder="Please enter a number" value={student} onChange={(e)=>setStudent(e.target.value)}/>
    <button>{editMode? "Update Student":"Add Student"}</button>
    </form> 
    <div className='student-section'>
    <div className='all-students'>
      <h2>All Students List</h2>
        <ul>
          {studentList.filter(stu=>stu.ispresent===undefined).map(stu=>(

            <li>
              <span>{stu.name}</span>
              <button onClick={()=>editHandler(stu.id)}>Edit</button>
              <button onClick={()=>deleteHandler(stu.id)}>Delete</button>
              <button onClick={()=>presentHandler(stu.id)}>Present</button>
              <button onClick={()=>absentHandler(stu.id)}>Absent</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='present-students'>
      <h2>List of Present Students</h2>
        <ul>
          {studentList.filter(stu=>stu.ispresent===true).map(stud=>(
            <li>
              <span>{stud.name}</span>
              <button onClick={()=>toggoller(stud.id)}>Accidentally Addded ?</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='Absent-students'>
      <h2>List of Absent Students</h2>
        {studentList.filter(stud=>stud.ispresent===false).map(student=>(
          <ul>
            <li>
              <span>{student.name}</span>
              <button onClick={()=>toggoller(student.id)}>Accidentally Added ?</button>
            </li>
          </ul>
        ))}
      </div>
    </div>
      
    </div>
  );
}

export default App;
