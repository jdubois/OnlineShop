import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWishList } from 'app/shared/model/wish-list.model';
import { Principal } from 'app/core';
import { WishListService } from './wish-list.service';

@Component({
    selector: 'jhi-wish-list',
    templateUrl: './wish-list.component.html'
})
export class WishListComponent implements OnInit, OnDestroy {
    wishLists: IWishList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private wishListService: WishListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.wishListService.query().subscribe(
            (res: HttpResponse<IWishList[]>) => {
                this.wishLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWishLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWishList) {
        return item.id;
    }

    registerChangeInWishLists() {
        this.eventSubscriber = this.eventManager.subscribe('wishListListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
