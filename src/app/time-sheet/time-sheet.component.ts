import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProjectModel } from '../model/ProjectModel';
import { TaskModel } from '../model/TaskModel';
import { TimesheetService } from '../service/TimesheetService';
import { DateUtilsService } from '../service/date-utils.service';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../service/EmployeeService';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

  myDate = new Date();
  myDate1: any;
  calendarForm: any;

  weekDates: any[] = [];
  candidateForm:any = FormGroup;

  isCurrentWeek: boolean = false;
  projectList!: Array<ProjectModel>;
  employeesList!:any;
  tasksList!: Array<TaskModel>;
  lastSyncDate!:Date;
  items!: FormArray;

  constructor(private dateUtils: DateUtilsService, private formBuilder: FormBuilder, 
    private timeSheetUtils: TimesheetService,
    private http:HttpClient, private employeeService:EmployeeService) {
  }

  ngOnInit(): void {
    this.generateWeekDates();
    this.initalizeForm();
    this.getProductList();
    this.getEmployee();

    this.weekDates.forEach(date => {
      this.candidateForm.addControl(this.getSanitizedControlName(date), new FormControl(''));
    });
  }
  getEmployee() {
    this.employeeService.getEmplyeeList().subscribe(data => {
      console.log(data)
      this.employeesList = data;
    }
    );
  }

  getProductList() {
    this.timeSheetUtils.getProjects().subscribe(
      (data: any) => {
        this.projectList = data.body;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  onProjectChange(event: any) {
    const selectedProjectId = event.target.value;
    this.fetchTasksByProjectId(selectedProjectId);
  }
  onEmployeeChange(event: any) {
    const selectedProjectId = event.target.value;
    this.fetchlastSyncdate(selectedProjectId);
  }
  fetchlastSyncdate(selectedProjectId: any) {
    // this.timeSheetUtils.getlastSyncDate(selectedProjectId).subscribe(
    //   (data: any) => {
    //     this.lastSyncDate = data.body;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );;
  }

  fetchTasksByProjectId(projectId: number) {
    this.timeSheetUtils.getTasksByProjectId(projectId).subscribe(
      (data: any) => {
        // console.log(data.body)
        this.tasksList = data.body;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  checkCurrentWeek() {
    const last = convertToDateObject(this.weekDates[6]);
    if (last != null) {
      const lastDate = new Date(last);
      lastDate.setDate(lastDate.getDate() + 1); // Move to the next day
      this.isCurrentWeek = lastDate < new Date();
    }
  }

  goToPreviousWeek() {
    const one = convertToDateObject(this.weekDates[0]);
    if (one != null) {
      const firstDate = new Date(one); // Get the first date of the current week
      firstDate.setDate(firstDate.getDate() - 7); // Subtract 7 days to get the first date of the previous week
      this.generateWeekDates1(firstDate);
      this.updateFormControls();
      this.checkCurrentWeek();
    }
  }

  goToNextWeek() {
    const last = convertToDateObject(this.weekDates[6]);
    if (last != null) {
      const lastDate = new Date(last);
      lastDate.setDate(lastDate.getDate() + 1); // Move to the next day

      if (lastDate <= new Date()) {
        this.generateWeekDates1(lastDate);
        this.updateFormControls();
        this.checkCurrentWeek();
      }
    }
  }

  updateFormControls() {
    const formControls: any = {};

  // Loop through the week dates to generate form controls
  this.weekDates.forEach(date => {
    formControls[this.getSanitizedControlName(date)] = [''];
  });

  // Set up the form group with the generated form controls
  this.candidateForm = this.formBuilder.group({
    project: [''],
    task: [''],
    ...formControls // Spread the generated form controls here
  });
  }
  initalizeForm() {
    this.candidateForm = this.formBuilder.group({
      project: [''],
      task: [''],
    });

  }
  getSanitizedControlName(date: string): string {
    return date.replace(/\s+/g, '_');
  }
  
  onSubmit() {
    if (this.candidateForm.valid) {
      const dataToSend: any[] = [];
  
      // Loop through the week dates to collect form data
      this.weekDates.forEach(date => {
        const backendFormattedDate = convertToDateObject(date);
        const formData = {
          date: backendFormattedDate,
          project: this.candidateForm.get('project').value,
          task: this.candidateForm.get('task').value,
          hours: this.candidateForm.get(this.getSanitizedControlName(date)).value
        };
        dataToSend.push(formData);
      });
  
      // Send data to backend
      this.timeSheetUtils.save(dataToSend).subscribe(
        (data: any) => {
          // this.projectList = data.body;
          console.log(data)
        },(error) => {
          console.error(error);
        }
        );
      
      //Reset Form
      // this.resetForm();
    }

  }
  generateWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startDate = new Date(today); // Clone the current date

    // Calculate the start date of the week (Sunday)
    startDate.setDate(today.getDate() - dayOfWeek);

    // Generate the dates for the current week (Sunday to Saturday)
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      if (this.dateUtils.getDateWithMonthDayDate(date)) {
        this.weekDates.push(this.dateUtils.getDateWithMonthDayDate(date));
      }
    }
  }

  generateWeekDates1(startDate: Date = new Date()) {
    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      if (this.dateUtils.getDateWithMonthDayDate(date)) {
        this.weekDates.push(this.dateUtils.getDateWithMonthDayDate(date));
      }
    }
  }

  resetForm() {
    this.candidateForm.get('project').setValue("");
    this.candidateForm.get('task').setValue("");
    this.weekDates.forEach(date => {
    this.candidateForm.get(this.getSanitizedControlName(date)).setValue("");
    })
  }

  getInnerArray(outerIndex: number):FormArray {
    const control = this.candidateForm.get('rows').at(outerIndex) as FormGroup;
    return control.get('hours') as FormArray;
  }

}


function convertToDateObject(dateString: any) {
  // Split the dateString into its parts (month, day, and day of the week)
  const [month, day, dayOfWeek] = dateString.split(' ');

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Create a string in the format 'MMM DD YYYY' (e.g., 'Aug 06 2023')
  const formattedDateString = `${month} ${day} ${currentYear}`;

  // Parse the formattedDateString to get the Date object
  const dateObject = new Date(formattedDateString);

  // Check if the dateObject is valid (not NaN) and return it
  if (!isNaN(dateObject.getTime())) {
    return dateObject;
  }

  // Return null if the dateObject is invalid
  return null;

}


