import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css'],
  providers: [SearchService],
})
export class GithubSearchComponent implements OnInit {
  search = new FormControl();
  constructor(
    private searchService: SearchService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((par) => {
      if (par.has('q')) {
        this.search.setValue(par.get('q'));
        this.getRepos(par.get('q') as string);
      }
    });
    this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((val) => this.searchService.searchRepos(val))
        // map((data: any) => data.items) // for modifying the data structure
        //better to directly write in service while geeting data form the url
      )
      .subscribe((value) => {
        console.log(value);
        this.router.navigate([], { queryParams: { q: this.search.value } });
        // this.router.navigateByUrl('/github?q='+this.search.value);
        // this.getRepos(value);
      });
  }

  getRepos(query: string) {
    this.searchService.searchRepos(query).subscribe(
      (data) => console.log('success', data),
      (err) => console.log('err', err)
    );
  }
}
