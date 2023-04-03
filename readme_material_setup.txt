https: //www.youtube.com/playlist?list=PLjPfp4Ph3gBoLSkF8wKDXpmJNI5dKD06e

- ng new <project>
- y to add routing module
- use scss
- cd project folder and 
   - ng add @angular/material 
     + use global angular materail typograhy style, 
     + y to add animation module (to auto add BrowserAnimationsModule in app.module.ts)
   - npm i bootstrap

- revise angular.json
3.  revise "angular.json"
    code angular.json
    "styles": [
   "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
   "src/styles.scss",
        ===>      "./node_modules/bootstrap/scss/bootstrap.scss"
],
"scripts": []


5. create material module 
    
   + ng g m material --module=app
   + add common material modules 
   + import in app.module.ts 
   + exaample module:  material/material.module.ts

6. rerun "ng serve" otherwise the animation and theme will not work.


7. enable material and bootstrap css auto-completion
   - code --install-extension zignd.html-css-class-completion
   - cmd+shift+p > cache css class definition

4. Test add components
  - https: //material.angular.io/components/button/overview   
  - https: //material.angular.io/components/categories            