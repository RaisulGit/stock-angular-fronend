import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { StockService } from './_services';

interface ICompany {
  companyCode: number,
  stockExchange: string,
  companyName: string,
  companyCEO: string,
  turnover: number,
  boardOfDirectors:string,
  companyProfile:string
}
interface IStock {
  Id: number,
  companyCode: number,
  currentStockPrice: number,
  stockPriceDate: Date,
  stockPriceTime: Time  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private subscriptions: Subscription = new Subscription();
  isCompanyLoading: boolean = true;
  isStockLoading: boolean = false;
  companyList: Array<ICompany> = [];
  selectedCompany: ICompany = null;
  stockList: Array<IStock> = [];

  constructor(private coreService: StockService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.coreService.getCompanyList()
        .subscribe((response: Array<ICompany>) => this.companyList = response)
        .add(() => this.isCompanyLoading = false)
    )
  }

  getProductData(): void {
    this.isStockLoading = true;
    this.subscriptions.add(
      this.coreService.getCompanyStocks(this.selectedCompany.companyCode)
        .subscribe((response: Array<IStock>) => this.stockList = response)
        .add(() => this.isStockLoading = false)
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
