import React, { useState } from 'react';
import { Save, Trash2, PlusCircle, ChevronDown } from 'lucide-react';

interface Student {
  id: number;
  dni: string;
  name: string;
  lastName: string;
  firstExam: number;
  secondExam: number;
  average: number;
  weightedAverage: number;
  bookGrade: number;
  weightedBook: number;
  behavior: number;
  weightedBehavior: number;
  finalGrade: number;
}

interface CourseGroup {
  course: string;
  classroom: string;
}

function App() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      dni: '',
      name: '',
      lastName: '',
      firstExam: 0,
      secondExam: 0,
      average: 0,
      weightedAverage: 0,
      bookGrade: 0,
      weightedBook: 0,
      behavior: 0,
      weightedBehavior: 0,
      finalGrade: 0,
    },
  ]);

  const [dniError, setDniError] = useState<{ [key: number]: string }>({});
  const [selectedGroup, setSelectedGroup] = useState<CourseGroup>({ course: '1º', classroom: 'DAM' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const courses = ['1º', '2º'];
  const classrooms = ['DAM', 'DAW', 'ASIR'];

  const calculateGrades = (
    student: Student,
    field: keyof Student,
    value: number | string,
  ): Student => {
    const updatedStudent = { ...student, [field]: value };

    // Calculate average of exams
    updatedStudent.average =
      (updatedStudent.firstExam + updatedStudent.secondExam) / 2;

    // Apply weights
    updatedStudent.weightedAverage = updatedStudent.average * 0.65;
    updatedStudent.weightedBook = updatedStudent.bookGrade * 0.15;
    updatedStudent.weightedBehavior = updatedStudent.behavior * 0.2;

    // Calculate final grade
    updatedStudent.finalGrade =
      updatedStudent.weightedAverage +
      updatedStudent.weightedBook +
      updatedStudent.weightedBehavior;

    return updatedStudent;
  };

  const isDniUnique = (dni: string, currentStudentId: number): boolean => {
    return !students.some(
      (student) => student.dni === dni && student.id !== currentStudentId
    );
  };

  const handleInputChange = (
    studentId: number,
    field: keyof Student,
    value: string,
  ) => {
    if (field === 'dni') {
      // Clear previous error for this student
      setDniError((prev) => ({ ...prev, [studentId]: '' }));

      // Check if DNI is not empty and is duplicate
      if (value && !isDniUnique(value, studentId)) {
        setDniError((prev) => ({
          ...prev,
          [studentId]: 'Este DNI ya existe',
        }));
        return; // Don't update if DNI is duplicate
      }
    }

    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? calculateGrades(
              student,
              field,
              ['name', 'lastName', 'dni'].includes(field) ? value : Number(value) || 0,
            )
          : student,
      ),
    );
  };

  const addStudent = () => {
    const newStudent: Student = {
      id: students.length + 1,
      dni: '',
      name: '',
      lastName: '',
      firstExam: 0,
      secondExam: 0,
      average: 0,
      weightedAverage: 0,
      bookGrade: 0,
      weightedBook: 0,
      behavior: 0,
      weightedBehavior: 0,
      finalGrade: 0,
    };
    setStudents([...students, newStudent]);
  };

  const removeStudent = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
    // Clear any error messages for the removed student
    setDniError((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  // Sort students by lastName
  const sortedStudents = [...students].sort((a, b) => 
    a.lastName.localeCompare(b.lastName, 'es', { sensitivity: 'base' })
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                La Calcu del profe
              </h1>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span className="font-medium">
                    {selectedGroup.course} {selectedGroup.classroom}
                  </span>
                  <ChevronDown size={16} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="p-2">
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Curso
                        </label>
                        <div className="grid grid-cols-2 gap-1">
                          {courses.map((course) => (
                            <button
                              key={course}
                              onClick={() => {
                                setSelectedGroup((prev) => ({ ...prev, course }));
                                setIsDropdownOpen(false);
                              }}
                              className={`px-3 py-1.5 text-sm rounded ${
                                selectedGroup.course === course
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              {course}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Aula
                        </label>
                        <div className="grid grid-cols-1 gap-1">
                          {classrooms.map((classroom) => (
                            <button
                              key={classroom}
                              onClick={() => {
                                setSelectedGroup((prev) => ({ ...prev, classroom }));
                                setIsDropdownOpen(false);
                              }}
                              className={`px-3 py-1.5 text-sm rounded ${
                                selectedGroup.classroom === classroom
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              {classroom}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={addStudent}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <PlusCircle size={20} />
              Añadir Alumno
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">DNI</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Apellidos</th>
                  <th className="px-4 py-3">1º Parcial</th>
                  <th className="px-4 py-3">2º Parcial</th>
                  <th className="px-4 py-3">Media</th>
                  <th className="px-4 py-3">Media (65%)</th>
                  <th className="px-4 py-3">Nota Libro</th>
                  <th className="px-4 py-3">Libro (15%)</th>
                  <th className="px-4 py-3">Comportamiento</th>
                  <th className="px-4 py-3">Comp. (20%)</th>
                  <th className="px-4 py-3">Nota Final</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 relative">
                      <input
                        type="text"
                        value={student.dni}
                        onChange={(e) =>
                          handleInputChange(student.id, 'dni', e.target.value)
                        }
                        className={`w-32 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none ${
                          dniError[student.id] ? 'border-red-500' : ''
                        }`}
                        placeholder="DNI"
                      />
                      {dniError[student.id] && (
                        <div className="absolute left-0 -bottom-5 text-xs text-red-500">
                          {dniError[student.id]}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) =>
                          handleInputChange(student.id, 'name', e.target.value)
                        }
                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                        placeholder="Nombre"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={student.lastName}
                        onChange={(e) =>
                          handleInputChange(student.id, 'lastName', e.target.value)
                        }
                        className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                        placeholder="Apellidos"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={student.firstExam}
                        onChange={(e) =>
                          handleInputChange(student.id, 'firstExam', e.target.value)
                        }
                        className="w-20 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={student.secondExam}
                        onChange={(e) =>
                          handleInputChange(
                            student.id,
                            'secondExam',
                            e.target.value,
                          )
                        }
                        className="w-20 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {student.average.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      {student.weightedAverage.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={student.bookGrade}
                        onChange={(e) =>
                          handleInputChange(student.id, 'bookGrade', e.target.value)
                        }
                        className="w-20 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {student.weightedBook.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={student.behavior}
                        onChange={(e) =>
                          handleInputChange(student.id, 'behavior', e.target.value)
                        }
                        className="w-20 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {student.weightedBehavior.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 font-bold">
                      {student.finalGrade.toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`font-semibold ${student.finalGrade >= 5 ? 'text-green-600' : 'text-red-600'}`}>
                        {student.finalGrade >= 5 ? 'APROBADO' : 'SUSPENSO'}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeStudent(student.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Eliminar alumno"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;