import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Departments } from "./Departments";
import { Employees } from "./Employees";
import { Jobs } from "./Jobs";

@Index("employee_id_start_date_pk", ["employeeId", "startDate"], {
  unique: true,
})
@Entity("job_history", { schema: "public" })
export class JobHistory {
  @Column("integer", { primary: true, name: "employee_id" })
  employeeId: number;

  @Column("character varying", {
    primary: true,
    name: "start_date",
    length: 19,
  })
  startDate: string;

  @Column("character varying", { name: "end_date", nullable: true, length: 19 })
  endDate: string | null;

  @ManyToOne(() => Departments, (departments) => departments.jobHistories, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "department_id", referencedColumnName: "departmentId" }])
  department: Departments;

  @ManyToOne(() => Employees, (employees) => employees.jobHistories, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "employee_id", referencedColumnName: "employeeId" }])
  employee: Employees;

  @ManyToOne(() => Jobs, (jobs) => jobs.jobHistories, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "job_id", referencedColumnName: "jobId" }])
  job: Jobs;
}
