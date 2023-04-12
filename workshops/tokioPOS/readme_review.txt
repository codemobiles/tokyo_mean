Day1#
- What is Angular?
- Sw required to dev Angular
  + NodeJS
  + VScode
  + Angular Cli ->npm i -g @angular/cli
  + VScode Extension
    - angular2 switcher
    - angular8 snippet
    - color highlight
    - vscode-icon
    - path intellisense
    - tag matching

- angular cli
  + ng new <project_name>
  + ng g c <component_name>
  + ng add <plug-in> ex: material

- angular file project structure
  + index.html
  + app.module.ts
  + app.component.ts
  + package.json
  + src
    + app

- shortcut keyboard
   - ctrl + p => search file
   - ctrl + shift + p => run command
   - alt + o => switch files btw ts and html

- component
  + .ts (controller)
  + .html (template)
  + @ (metadata or decorator)

- component communication
  - parent -> child (@Input) = property binding
  - child -> parent  (@Output) = event binding
  - {{}} - interpolator
  - [] - Property : @Input
  - () - event : @
  - ngModel

- what is module?
- what is app module? or root module
- what is app routing module?
- routing.module.ts
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  {path: "login", component: LoginComponent, canActivate: [AuthenGuard]},
  {path: "register", component: RegisterComponent},
  {path: "stock", component: StockComponent, canActivate: [AuthenGuard]},
  {path: "stock/create", component: StockCreateComponent},
  {path: "stock/edit/:id", component: StockEditComponent},
  {path: "shop", component: ShopComponent},
  {path: "report", component: ReportComponent},
  {path: "transaction", component: TransactionComponent},
  {path: "**", redirectTo: 'login'},
];


routing module <-> <router-outlet></router-outlet>
- Material Component https://material.angular.io/
- Add Material Component
  + Add module import { MatProgressBarModule } from "@angular/material/progress-bar";
  + import
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,

    + use it ex; <mat-card>
    <mat-card-title>Login</mat-card-title>
    <mat-card-content>


  Day2#
  - ngModel - 2-way binding
  - #loginForm="ngForm"
  - (submit)
  - button type submit or button
  - ng g s services/<service-name>
  - DI (Dependency Injection)
  - Router, Location
  - constructor(private router:Router){}
  - this.router.navigate(["/register"])
  - NodeJS - Javascript Runtime Engine
  - nodemon - hotreload
  - npm i -g nodemon
  - express, body-parser
  - group router
  - router.get|post ("/login", (req, res)=>{ })
  - post man
  - rest client
  - post man collection import / export
  - mongo db
  - mssql (node crud)
  - install mongodb dev tool seperation
  - mongod --dbpath ""
  - dump and restore
  - ORM
    - Users.create, Users.find (array), User.findOne()
  - mongo callback connected disconnect
  - login api
     - bcrypt
     - async and await
     - promise (asynchornous)
  - JWT Intro


Day3#
- Jwt Implement
- Interceptor
- Encode/Decode
- Cors
- Share static file at backend (server.js)
- Backend Routing (backend/src/route.ts)
- Stock API
  - find, findOne, findOneAndDelete, findOneAndUpdate
  - Formidable (Upload Image)
- Login save jwt
- HTTP Interceptor jwt.interceptor.ts
- Asyn and Await
- RXJS (Observable) and Promise (lastValueFrom)
- Subject (like Queue of Task or Obserable or Promise)
- MongoDB
- MongoDB Client in VSCode Extension
- Install Robo3t
- MongoDB Dev tool
- mongorestore -d mypos ......
- ORM
- compare RDBMS s NOSQLDB
- table -> collection
- column -> fields
- row -> document

Day4#
- Header, Menu
- Install Angular Material Design
- FormControl ReactiveFormsModule
     const formData = new FormData()
    formData.append("name", this.formProduct.value.name)
    formData.append("price", this.formProduct.value.price)
    formData.append("stock", this.formProduct.value.stock)
    formData.append("image", this.imageFile)
- Intial form input (Edit)
- Pass parameter between page
      const productId = this.route.snapshot.params["id"]
- private route:ActivatedRoute
- Material Table (Data Table)
- Sorting Backend const doc = await Products.find({}).sort({created:-1});
- EventEmit (Shop and Payment)
- Pipe | (built-in)

Day5#
- Install bootstrap
- revise angular.js add css
- Setup ChartJS
- ViewChild
- Custom Pipe
- Router Guard (block unauthorized to open stock...)
- Transaction and Transaction Detail
- Revise UI
- Deployment
  ng build --configuration production
  ng build --configuration production --base-href /demo --deploy-url demo/ --index=src/prod/index.html
- npx serve -s <output-dir> -p 83
- nginx (stop and start) - frondend
- configure port, location (fallback) nginx.conf
- environement.ts and environment.prod.ts (angular.json)
- seperated index.html (dev and prod)  --index=src/prod/index.html
- pm2 backend
  pm2 start,stop restart... (readme.txt)

