import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe({
      next: (res) => {
        this.taskArr = res;
      },
      error: (err) => {
        alert('Unable to get list of tasks ');
      },
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        alert(e);
      },
      complete: () => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
    });
  }

  editTask() {
    console.log(
      'before : ',
      this.editTaskValue,
      ' and ',
      this.taskObj.task_name
    );
    this.taskObj.task_name = this.editTaskValue;

    console.log(
      'after : ',
      this.editTaskValue,
      ' and ',
      this.taskObj.task_name
    );

    this.crudService.editTask(this.taskObj).subscribe({
      next: () => {
        this.ngOnInit();
      },

      error: (err) => {
        alert('Failed to update task ' + err);
      },
    });
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        alert('Failed to delete task ' + err);
      },
    });
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    console.log(this.editTaskValue);
  }
}
