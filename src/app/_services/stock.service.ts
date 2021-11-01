import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable({ providedIn: 'root' })
export class StockService {
  private static service_url = environment.service_url;

  constructor(private http: HttpClient) { }

  getCompanyList() {
    return this.http.get(
      `${StockService.service_url}/e-stock/api/v1/company/getAllCompanies`,
      { headers }
    )
  }

  getCompanyStocks(companyCode: number) {
    return this.http.get(
      `${StockService.service_url}/e-stock/api/v1/stock/getStockByCompanyCode/${companyCode}`,
      { headers }
    )
  }
}