import { Component, OnInit } from '@angular/core';
import { Task, EditTask } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskName: string = '';
  addTaskDetail: string = '';
  editTaskValue: EditTask = new EditTask();

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = new EditTask();
    this.addTaskName = '';
    this.addTaskDetail = '';
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
    this.taskObj.task_name = this.addTaskName;
    this.taskObj.task_detail = this.addTaskDetail;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (v) => console.log(v),
      error: (e) => {
        alert(e);
      },
      complete: () => {
        this.ngOnInit();
        this.addTaskName = '';
        this.addTaskDetail = '';
      },
    });
  }

  editTask() {
    // console.log('before : ', this.editTaskValue, ' and ', this.taskObj);

    this.taskObj.task_name = this.editTaskValue.task_name;
    this.taskObj.task_detail = this.editTaskValue.task_detail;
    this.taskObj.task_done = this.editTaskValue.task_done;

    // console.log('after : ', this.editTaskValue, ' and ', this.taskObj);

    this.crudService.editTask(this.taskObj).subscribe({
      complete: () => {
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
    this.editTaskValue.task_detail = etask.task_detail;
    this.editTaskValue.task_name = etask.task_name;
    this.editTaskValue.task_done = etask.task_done;
  }
}
