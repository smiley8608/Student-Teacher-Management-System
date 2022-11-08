interface TeacherProps {
    _id: string,
    username: string,
    email: string,
    department: string,
    password: string
}

interface UpdatedTeacherProps {
    Teacher: TeacherProps | null,
    Auth: boolean
}

interface StudentProps {
    _id: string,
    name: string,
    course: string,
    subject: string,
    rollno: string,
    dob: string,
    studentphoto: string
}
interface UpdatedStudentProps {
    Student:StudentProps|null,
    Auth:boolean
}