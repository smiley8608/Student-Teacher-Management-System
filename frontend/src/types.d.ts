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
    studentname: string,
    courses: {
        course:string,
        department:string
    },
    subject: string,
    rollno: string,
    dob: string,
    path: string
}
interface UpdatedStudentProps {
    Student:StudentProps|null,
    Auth:boolean
}