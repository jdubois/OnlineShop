import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWishList } from 'app/shared/model/wish-list.model';
import { WishListService } from './wish-list.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-wish-list-update',
    templateUrl: './wish-list-update.component.html'
})
export class WishListUpdateComponent implements OnInit {
    wishList: IWishList;
    isSaving: boolean;

    customers: ICustomer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private wishListService: WishListService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ wishList }) => {
            this.wishList = wishList;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.wishList.id !== undefined) {
            this.subscribeToSaveResponse(this.wishListService.update(this.wishList));
        } else {
            this.subscribeToSaveResponse(this.wishListService.create(this.wishList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWishList>>) {
        result.subscribe((res: HttpResponse<IWishList>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
}
