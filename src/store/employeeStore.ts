import { create } from "zustand";

export interface Employee {
  id: number;
  name: string;
  position: string;
  status: boolean;
}

interface EmployeeState {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (updatedEmployee: Employee) => void;
  removeEmployee: (id: number) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [
    { id: 1, name: "Budi Santoso", position: "Manager", status: true },
    { id: 2, name: "Siti Aminah", position: "Kasir", status: false },
  ],
  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, employee],
  })),
  updateEmployee: (updatedEmployee) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      ),
    })),
  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),
}));
