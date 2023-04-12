

https://www.positronx.io/create-angular-material-8-custom-theme/
https://mui.com/material-ui/customization/color/#main-content

# theme.scss
# angular.json

# custom color (stock.component.scss)
-------------------------------
@import "~@angular/material/theming";

.edit-btn {
  color: white !important;
  background-color: mat-color(mat-palette($mat-deep-purple, 400)) !important;
}

-------------------------------

<button
        [routerLink]="['/stock/create']"
        mat-fab
        class="add-btn"
        style="margin-right: 60px"
>
