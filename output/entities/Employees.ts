import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Departments } from "./Departments";
import { Jobs } from "./Jobs";
import { JobHistory } from "./JobHistory";

@Index("employees_pkey", ["employeeId"], { unique: true })
@Entity("employees", { schema: "public" })
export class Employees {
  @PrimaryGeneratedColumn({ type: "integer", name: "employee_id" })
  employeeId: number;

  @Column("character varying", {
    name: "first_name",
    nullable: true,
    length: 11,
  })
  firstName: string | null;

  @Column("character varying", {
    name: "last_name",
    nullable: true,
    length: 11,
  })
  lastName: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 8 })
  email: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 18,
  })
  phoneNumber: string | null;

  @Column("character varying", {
    name: "hire_date",
    nullable: true,
    length: 10,
  })
  hireDate: string | null;

  @Column("numeric", { name: "salary", nullable: true, precision: 7, scale: 2 })
  salary: string | null;

  @Column("character varying", {
    name: "commission_pct",
    nullable: true,
    length: 4,
  })
  commissionPct: string | null;

  @Column("character varying", {
    name: "department_id",
    nullable: true,
    length: 3,
  })
  departmentId: string | null;

  @Column("character varying", { name: "xemp_id", nullable: true, length: 1 })
  xempId: string | null;

  @OneToMany(() => Departments, (departments) => departments.manager)
  departments: Departments[];

  @ManyToOne(() => Jobs, (jobs) => jobs.employees, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "job_id", referencedColumnName: "jobId" }])
  job: Jobs;

  @ManyToOne(() => Employees, (employees) => employees.employees, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "manager_id", referencedColumnName: "employeeId" }])
  manager: Employees;

  @OneToMany(() => Employees, (employees) => employees.manager)
  employees: Employees[];

  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.employee)
  jobHistories: JobHistory[];
}
