import {useEffect, useState} from "react";
import "./Student.css"
import {input1, input2} from "./CONST"
import {useParams} from "react-router";

const firstStudent =
    <div className={"containerTitul"}>
        <div>
            <div className={"leftContainerTitul"}>
                <div className={"up2"}>
                    <img className={"photoTitul"} src = {process.env.PUBLIC_URL + "/MainPicture.jpeg"} alt={"main photo"}/>
                </div>
            </div>
            <div className={"rightContainerTitul"}>
                <div className={"up1"} align={"center"}>
                    Аллея звёзд факультета иностранных языков
                </div>
                <div className={"down1"}>
                    <div className={"desc"}>
                        <div>{input1}</div>
                        <div>{input2}</div>
                        <div className={"year"}>2016 год</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

export default function Students(){
    const params = useParams();

    document.body.style = 'background-image:url(' + process.env.PUBLIC_URL + '/night_star.jpg) ;';

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
            body: JSON.stringify(Number(params.facultyId))
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
                let endYear;
                if(studentCheck.studentSpecialCase === 1) endYear = "Особый случай"
                else endYear = "Год выпуска " + studentCheck.studentStudyEnd;
                return (
                    <div className={"container"}>
                        <div className={"page"}>
                            <div className={"pageContainer"}>
                                <div className={"leftContainer"}>
                                    <div className={"up2"}>
                                        <img className={"photo"} src = {process.env.PUBLIC_URL + "/images/" + studentCheck.studentPhotoPath} alt={"student photo"}/>
                                    </div>
                                    <div className={"down2"} align={"center"}>
                                        <h3>Звезда номер {studentCheck.studentNumStar}</h3>
                                    </div>
                                </div>
                                <div className={"rightContainer"}>
                                    <div className={"up1"}>
                                        {studentCheck.studentLastName} {studentCheck.studentName} {studentCheck.studentMiddleName}
                                        <img className={"logo"} src = {process.env.PUBLIC_URL+"/star.png"}/> {endYear}
                                    </div>
                                    <div className={"down1"}>
                                        <p className={"desc"}>{studentCheck.studentDescription}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"PSContainer"}>
                                <div className={"downContainer"} align={"center"}>
                                    <p className={"facultyName"}>Факультет {studentCheck.facultyName.toLowerCase()}</p>
                                </div>
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
        if(count <= 0) {setCount(students?.length - 1); }
        else{setCount(count - 1)}
        setStudent(students?.map(studentCheck => {
            if(i === count && check && students?.length > count && count >= 0){
                check = false;
                let endYear;
                if(studentCheck.studentSpecialCase === 1) endYear = "Особый случай"
                else endYear = "Год выпуска: " + studentCheck.studentStudyEnd;
                return (
                    <div className={"container"}>
                        <div className={"page"}>
                            <div className={"pageContainer"}>
                                <div className={"leftContainer"}>
                                    <div className={"up2"}>
                                        <img className={"photo"} src = {process.env.PUBLIC_URL + "/images/" + studentCheck.studentPhotoPath} alt={"student photo"}/>
                                    </div>
                                    <div className={"down2"} align={"center"}>
                                        <h3>Звезда номер {studentCheck.studentNumStar}</h3>
                                    </div>
                                </div>
                                <div className={"rightContainer"}>
                                    <div className={"up1"}>
                                        {studentCheck.studentLastName} {studentCheck.studentName} {studentCheck.studentMiddleName}
                                        <img className={"logo"} src = {process.env.PUBLIC_URL+"/star.png"}/> {endYear}
                                    </div>
                                    <div className={"down1"}>
                                        <p className={"desc"}>{studentCheck.studentDescription}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={"PSContainer"}>
                                <div className={"downContainer"} align={"center"}>
                                    <p className={"facultyName"}>Факультет {studentCheck.facultyName.toLowerCase()}</p>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
            else {i = i + 1; return null}
        }))
    }

    return(
        <div className={"albumContainer"}>
            <div className={"leftButton"}><input className={"leftArrow"} type = {"image"} src = {process.env.PUBLIC_URL + "/arrowLeft.png"} alt={"previous student"} onClick={() => previousStudent()}/></div>
            <div className={"albumPage"}>{student}</div>
            <div className={"rightButton"}><input className={"rightArrow"} type = {"image"} src = {process.env.PUBLIC_URL + "/arrowNext.png"} alt={"next student"} onClick={() => nextStudent()}/></div>
        </div>

    )
}