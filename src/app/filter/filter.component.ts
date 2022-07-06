import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  ngOnInit(): void {}
  subject: string = '';
  subjects: any[] = [];
  displayedColumns: string[] = ['name', 'class', 'gender', 'subject'];
  teacherDisplayColumns: string[] = ['name', 'gender', 'subject'];
  dataSource!: MatTableDataSource<any>;
  subjectDataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private api: ApiService) {}
  goToStudent() {
    this.router.navigate(['/studentList']);
  }
  goToTeacher() {
    this.router.navigate(['/teacherList']);
  }
  search() {
    this.subjects = [];
    this.api.filterBySubject(this.subject).subscribe({
      next: (res) => {
        if (res.matched == null) {
          alert('No data Found');
        } else {
          this.dataSource = new MatTableDataSource(res.matched);
          res.matched.map((teacher: any) => {
            teacher.matchedSubject.map((teacher: any) => {
              this.subjects.push(teacher);
            });
          });
          this.subjectDataSource = new MatTableDataSource(this.subjects);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
