import {useEffect, useState} from "react";
import "./Student.css"

const emptyItem = {
    studentId:0,
    studentName:"",
    studentLastName:"",
    studentMiddleName:"",
    facultyId:1,
    studentPhotoPath:"",
    studentDescription:"",
    studentStudyEnd:0,
    studentSpecialCase:0
}

const firstStudent = <div>
    <h1>Главная страница</h1>
</div>

export default function Students(){
    document.body.style = 'background: #0f5;';

    const [students, setStudents] = useState();
    const [student, setStudent] = useState(firstStudent);
    const [action, setAction] = useState();
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8090/student/getlist', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(1)
        })
            .then(response => response.json())
            .then(data => setStudents(data));
    }, [action])

    //TODO Убрать баг, когда count на счет впереди
    function nextStudent(){
        let i = 0;
        let check = true;
        if(count < students?.length-1) {setCount(count + 1); }//console.log(count)}
        else{setCount(0)}
        console.log(count)
        setStudent(students?.map(studentCheck => {
            if(i === count && check && students?.length > count && count >= 0){
                check = false;
                return (
                    <div className={"container"}>
                        <div className={"leftContainer"}>
                            <div className={"up1"}>
                                <h3>{studentCheck.studentLastName} {studentCheck.studentName} {studentCheck.studentMiddleName} Год выпуска {studentCheck.studentStudyEnd}</h3>
                            </div>
                            <div className={"down1"}>
                                <p className={"desc"}>{studentCheck.studentDescription}</p>
                            </div>
                        </div>
                        <div className={"rightContainer"}>
                            <div className={"up2"}>
                                <img className={"photo"} src = {process.env.PUBLIC_URL + "/images/" + studentCheck.studentPhotoPath} alt={"student photo"}/>
                            </div>
                            <div className={"down2"} align={"center"}>
                                <h3>Звезда номер {studentCheck.studentId}</h3>
                            </div>
                        </div>
                    </div>)
            }
            else {i = i + 1; return null}
        }))
    }

    function previousStudent(){
        let i = 0;
        let check = true;
        console.log(count)
        if(count <= 0) {setCount(students?.length - 1); }
        else{setCount(count - 1)}
        console.log(count)
        setStudent(students?.map(studentCheck => {
            if(i === count && check && students?.length > count && count >= 0){
                check = false;
                return (
                    <div className={"container"}>
                        <div className={"leftContainer"}>
                            <div className={"up1"}>
                                <h3>{studentCheck.studentLastName} {studentCheck.studentName} {studentCheck.studentMiddleName} Год выпуска {studentCheck.studentStudyEnd}</h3>
                            </div>
                            <div className={"down1"}>
                                <p className={"desc"}>{studentCheck.studentDescription}</p>
                            </div>
                        </div>
                        <div className={"rightContainer"}>
                            <div className={"up2"}>
                                <img className={"photo"} src = {process.env.PUBLIC_URL + "/images/" + studentCheck.studentPhotoPath} alt={"student photo"}/>
                            </div>
                            <div className={"down2"} align={"center"}>
                                <h3>Звезда номер {studentCheck.studentId}</h3>
                            </div>
                        </div>
                    </div>)
            }
            else {i = i + 1; return null}
        }))
    }

    return(
        <div className={"container"}>
            <div className={"leftButton"}><input type = {"image"} src = {process.env.PUBLIC_URL + "/arrowLeft.png"} alt={"previous student"} onClick={() => previousStudent()}/></div>
            <div className={"albumPage"}>{student}</div>
            <div className={"rightButton"}><input type = {"image"} src = {process.env.PUBLIC_URL + "/arrowNext.png"} alt={"next student"} onClick={() => nextStudent()}/></div>
        </div>

    )
}