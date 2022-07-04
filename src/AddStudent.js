import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import {useParams} from "react-router";
import "./AddStudent.css"

const emptyItem = {
    studentId:0,
    studentName:null,
    studentLastName:null,
    studentMiddleName:"",
    facultyId:1,
    facultyName:"",
    studentPhotoPath:null,
    studentDescription:null,
    studentStudyEnd:null,
    studentSpecialCase:1,
    studentNumStar: 0
}

export default function AddStudent(){

    const params = useParams();
    const [students, setStudents] = useState();
    const [studentList, setStudentList] = useState();
    const [faculties, setFaculties] = useState()
    const [facultyList, setFacultyList] = useState()
    const [item, setItem] = useState(emptyItem);
    const [action, setAction] = useState("auth" );

    useEffect(() => {
        fetch('http://localhost:8090/student/getlist',{
            method: "POST",
            body: JSON.stringify(Number(params.facultyIdNum))
        })
            .then(response => response.json())
            .then(data => setStudents(data));
        fetch('http://localhost:8090/faculty/getlist')
            .then(response => response.json())
            .then(data => setFaculties(data));
        setFacultyList(faculties?.map(faculty => {
            return <option value={faculty.facultyId}>{faculty.facultyName}</option>
        }))
    }, [action])

    async function remove(id) {
        await fetch(`http://localhost:8090/student/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        });
        setAction("delete");
    }

    async function change(id){
        const post = await (await fetch(`http://localhost:8090/student/get`,{method: "POST", body: JSON.stringify(id)})).json();
        setItem(post);
        setAction("change")
    }

    async function add(){
        setItem(emptyItem)
        setAction("add")
    }

    async function handleSubmit() {
        await fetch('http://localhost:8090/student/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
    }

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const item1 = item;
        item1[name] = value;
        setItem(item1)
        if (name === "studentSpecialCase" && Number(value) === 0) {document.getElementById("studentStudyEnd").disabled = ""}
        if (name === "studentSpecialCase" && Number(value) === 1) {document.getElementById("studentStudyEnd").disabled = "true"}
    }

    function view(){
        setStudentList(students?.map(student => {
            return <tr key={student.studentId}>
                <td style={{whiteSpace: 'nowrap'}}>{student.studentLastName} {student.studentName} {student.studentMiddleName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{student.studentNumStar}</td>
                <td style={{whiteSpace: 'nowrap'}}>{student.studentStudyEnd}</td>
                <td style={{whiteSpace: 'nowrap'}}>{student.studentSpecialCase}</td>
                <td style={{whiteSpace: 'nowrap'}}>{student.studentDescription}</td>
                <td style={{whiteSpace: 'nowrap'}}>{student.studentPhotoPath}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" onClick={() => change(student.studentId)}>Редактировать</Button>
                        <Button size="sm" id="delete-button" onClick={() => remove(student.studentId)}>Удалить</Button>
                    </ButtonGroup>
                </td>
            </tr>
        }));
        setFacultyList(faculties?.map(faculty => {
            return <option value={faculty.facultyId}>{faculty.facultyName}</option>
        }))
    }

    function onFileChangeHandler(e){
        e.preventDefault();
        let formData;
        formData = new FormData();
        formData.append('file', e.target.files[0]);
        const target = e.target;
        const name = target.name;
        const item1 = item;
        fetch('http://localhost:8090/student/upload', {
            method: 'post',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
            item1[name] = data.fileName;
            setItem(item1);
            console.log(item)
        });
    }

    let login = undefined;
    let password = undefined;

    function handleChange1(event) {
        const target = event.target;
        const value = target.value;
        if (target.name === "login"){login = value}
        if (target.name === "password"){password = value}
    }

    async function handleSubmit1(event){
        event.preventDefault();
        if (login === "SYSDBA" && password === "masterkey") {
            setAction("get")
        }
    }

    if(action === "auth"){
        return(
            <div>
                <Container fluid>
                    <FormGroup>
                        <Label for="login">Логин</Label>
                        <input type="text" name="login" id="login" onChange={handleChange1}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Пароль</Label>
                        <input type="text" name="password" id="password" onChange={handleChange1}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit" onClick={handleSubmit1}>Войти</Button>{' '}
                        <Button color="secondary" onClick={() => window.location.reload()}>Сброс</Button>
                    </FormGroup>
                </Container>
            </div>
        )
    }
    if(action === "get" || action === "delete") {
        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" onClick={()=>add()}>Добавить студента</Button>
                        <Button color="warning" onClick={() => view()}>Обновить</Button>
                    </div>
                    <h3>Студенты</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>ФИО студента</th>
                            <th>Номер звезды</th>
                            <th>Год окончания обучения</th>
                            <th>Особый случай</th>
                            <th>Описание</th>
                            <th>Путь к фото</th>
                            <th width="40%">Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                            {studentList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
    if(action === "change" || action === "add"){
        emptyItem.facultyId = params.facultyIdNum;
        let title;
        if(action === "change") title = <h2>Редактирование информации о студенте</h2>;
        if(action === "add") title = <h2>Добавление информации о студенте</h2>;
        return (
            <div>
                <Container>
                    {title}
                    <Form>
                        <FormGroup required={true}>
                            <Label for="studentLastName">Фамилия студента<span className={"required"}>*</span></Label>
                            <Input required={true} type="text" name="studentLastName" id="studentLastName" defaultValue={item.studentLastName || ''}
                                   onChange={handleChange} autoComplete="studentLastName"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentName">Имя студента<span className={"required"}>*</span></Label>
                            <Input required={true} type="text" name="studentName" id="studentName" defaultValue={item.studentName || ''}
                                   onChange={handleChange} autoComplete="studentName"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentMiddleName">Отчество студента</Label>
                            <Input type="text" name="studentMiddleName" id="studentMiddleName" defaultValue={item.studentMiddleName || ''}
                                   onChange={handleChange} autoComplete="studentMiddleName"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentNumStar">Номер звезды студента<span className={"required"}>*</span></Label>
                            <Input required={true} type="text" name="studentNumStar" id="studentNumStar" defaultValue={item.studentNumStar || ''}
                                   onChange={handleChange} autoComplete="studentNumStar"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentSpecialCase">Особый случай студента<span className={"required"}>*</span></Label>
                            <select name="studentSpecialCase" id="studentSpecialCase" defaultValue={item.studentSpecialCase || ''}
                                    onChange={handleChange} autoComplete="studentSpecialCase">
                                <option value={1}>
                                    да
                                </option>
                                <option value={0}>
                                    нет
                                </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentStudyEnd">Год окончания обучения студента</Label>
                            <Input type="text" name="studentStudyEnd" id="studentStudyEnd" defaultValue={item.studentStudyEnd || ''}
                                   onChange={handleChange} autoComplete="studentStudyEnd" disabled={"true"}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentDescription">Описание студента</Label>
                            <Input type="text" name="studentDescription" id="studentDescription" defaultValue={item.studentDescription || ''}
                                   onChange={handleChange} autoComplete="studentDescription"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentPhotoPath">Путь к фото студента<span className={"required"}>*</span></Label>
                            <Input type="file" className="form-control" name="studentPhotoPath" id="studentPhotoPath"
                                   autoComplete="studentPhotoPath" onChange={onFileChangeHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="facultyName">Факультет студента</Label>
                            <select defaultValue={Number(params.facultyIdNum)} disabled={"true"}>{facultyList}</select>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" onClick={() => handleSubmit()}>Сохранить</Button>{' '}
                            <Button color="secondary" onClick={()=>setAction("get")}>Назад</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}