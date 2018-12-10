import { NgModule } from '@angular/core';

import { OnlineShopSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [OnlineShopSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [OnlineShopSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class OnlineShopSharedCommonModule {}
