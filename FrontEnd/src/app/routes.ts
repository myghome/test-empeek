
import { UserDetailsComponent } from './userDetails/userDetails.component';
import { UsersComponent } from './users/users.component';

export const userRoutes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'},
  { path: 'users', component: UsersComponent},
  { path: 'users/:id', component: UserDetailsComponent}
]
