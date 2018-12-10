import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OnlineShopBlogModule } from './blog/blog.module';
import { OnlineShopEntryModule } from './entry/entry.module';
import { OnlineShopTagModule } from './tag/tag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        OnlineShopBlogModule,
        OnlineShopEntryModule,
        OnlineShopTagModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnlineShopEntityModule {}
