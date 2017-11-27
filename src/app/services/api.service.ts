import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpService } from '../services/http.service'
import { AuthService } from './auth.service'
@Injectable()
export class ApiService {

  constructor(
    // public http: Http,
    public http: HttpService,
    public auth: AuthService
  ) { }

  getAllProjects = () => {
    return new Promise(resolve => { 
      this.http.get('/rest/admin/project')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error)
        });
    });
  }

  getAllAgiles = () => {
    return new Promise(resolve => { 
      this.http.get('/rest/admin/agile')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error)
        });
    });
  }

  getIssuesByProject = (id) => {
    return new Promise(resolve => {
      this.http.get('/rest/issue/byproject/' + id + '?filter=for%3A+me')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        })
    })
  }

  getIssuesByAgile = (agileName) => {
    return new Promise(resolve => {
      this.http.get('/rest/issue?filter=for:me+Board+' + agileName + ':+{Current+sprint}&max=50')      
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        })
    })
  }

  getIssue = (issueId) => {
    return new Promise(resolve => {
      this.http.get('/rest/issue/' + issueId + '?wikifyDescription=true')      
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        })
    })
  }

  getSprintInfo = (agile) => {
    console.log(agile)
    let query = agile.url.split("/youtrack")[1]
    console.log(query)
    return new Promise(resolve => {
      this.http.get(query)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data)
        })
    })
  }

  createNewWorkItem = (data, issueId) => {
    let newItem = {
      date: data.date,
      duration: Math.round(data.duration/60), 
      description: "Added by KlederTrack App",
      worktype: {
        name: "Testing"
      }
    }
    console.log(data)
    return new Promise(resolve => {
      this.http.post(AuthService.youtrackUrl + '/rest/issue/' + issueId + '/timetracking/workitem', newItem)
      .subscribe(data => {
        resolve(data)
      }, error => {
        resolve(error)
      })
    })
  }

  getWorkItem = (issueId) => {
    return new Promise(resolve => {
      this.http.get('/rest/issue/' + issueId + '/timetracking/workitem')
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      })
    })
  }

  getTimetrackingWorkTypes = (projectId) => {
    return new Promise(resolve => {
      this.http.get('/rest/admin/project/' + projectId + '/timetracking/worktype')
      .map(res => res.json())
      .subscribe(data => {
        resolve(data)
      })
    })
  }

}