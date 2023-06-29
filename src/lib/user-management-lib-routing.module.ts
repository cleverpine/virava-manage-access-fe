import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsersUpdateComponent } from './components/users-update/users-update.component';
import { UsersListingComponent } from './components/users-listing/users-listing.component';

import { UserResolverService } from './users-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: {
        title: 'Users Management',
        link: 'users-management',
      },
    },
    children: [
      {
        path: 'users',
        component: UsersListingComponent,
        data: {
          breadcrumb: {
            title: 'Users',
            link: 'users-management/users',
          },
        },
      },
      {
        path: 'users',
        data: {
          breadcrumb: {
            title: 'Users',
            link: 'users-management/users',
          },
        },
        children: [
          {
            path: ':userId',
            component: UsersUpdateComponent,
            data: {
              breadcrumb: {
                title: 'User Update',
              },
            },
            resolve: { resolveData: UserResolverService },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibRoutingModule {}
