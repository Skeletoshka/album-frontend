import {useEffect, useState} from "react";
import {Button} from "reactstrap";
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

    function nextStudent(){
        let i = 0;
        let check = true;
        setStudent(students?.map(studentCheck => {
            if(i === count && check){
                setCount(count + 1);
                check = false;
                return (
                    <div className={"container"}>
                        <div className={"leftContainer"}>
                            <div className={"up1"}>
                                <h3>{studentCheck.studentLastName} {studentCheck.studentName} {studentCheck.studentMiddleName} Год выпуска {studentCheck.studentStudyEnd}</h3>
                            </div>
                            <div className={"down1"}>
                                {studentCheck.studentDescription}
                            </div>
                        </div>
                        <div className={"rightContainer"}>
                            <div className={"up2"}>
                                <img className={"photo"} src = {process.env.PUBLIC_URL + "/images/" + studentCheck.studentPhotoPath}/>
                            </div>
                            <div className={"down2"}>
                                <h3>Звезда номер {studentCheck.studentId}</h3>
                            </div>
                        </div>
                    </div>)
            }
            else {i = i + 1; return null}
        }))
    }

    return(
        <div>
            {student}
            <Button onClick={() => nextStudent()}>Дальше</Button>
        </div>

    )
}