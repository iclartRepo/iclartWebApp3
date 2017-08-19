﻿import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


import { IMessageResult } from '../../interfaces/messageResult.interface';

import { SosService } from '../../services/sos.service';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
    selector: 'sos-form',
    template: require('./sosForm.component.html')
})
export class SOSFormComponent {

    constructor(private _sosService: SosService, private _clientService: ClientService, private _productService: ProductService, private _utlitiesService: UtilitiesService, private elementRef: ElementRef) { }
    returnUrl: string;
    sosId: string;
    sosModel: any;
    result: IMessageResult = {
        isError: false,
        Result: null,
        ResultList: null,
        Message: ''
    };
    resultClients: IMessageResult = {
        isError: false,
        Result: null,
        ResultList: null,
        Message: ''
    };
    resultProducts: IMessageResult = {
        isError: false,
        Result: null,
        ResultList: null,
        Message: ''
    };
    resultProductCategories: IMessageResult = {
        isError: false,
        Result: null,
        ResultList: null,
        Message: ''
    };
    resultOperation: IMessageResult = {
        isError: false,
        Result: null,
        ResultList: null,
        Message: ''
    };
    resultCustomProducts: IMessageResult = {
        isError: false,
        Result: null,
        ResultList: null,
        Message: ''
    }
    editForm: any = {};
    editFormQuantity: any = {};
    editFormPrice: any = {};
    editFormName: any = {};
    productList: any[] = [];
    unitOptions: any[] = [];
    pointerMarker: number = 0;
    errorMessage: string;
    selectedClient: any = {
        Office_Address: '',
        Combine_Items: false
    };
    productsView: any[] = [];

    //for customProduct
    customItemDescription: string;
    customQuantity: number = 1;
    customUnit: string;
    customPrice: number;
    customCategory: string;
    selectedCustom: any;
    showPriceValidation: boolean = false;
    showNameValidation: boolean = false;

    //for standardProduct
    selectedProductCategory: any;
    selectedUnit: any;
    productPrice: any;
    selectedProduct: any;
    productQuantity: any;

    /* Form Object Values */
    sosDate: string = this._utlitiesService.formatDate(new Date());
    pickup: boolean = false;
    remarks: string = "";
    standardProducts: any[] = [];
    customProducts: any[] = [];

    /* Form Validations */
    //For adding standard products
    standardProductForm: NgForm;
    @ViewChild('standardProductForm') currentForm: NgForm;

    ngAfterViewChecked() {
        this.formChanged();
    }

    formChanged() {
        if (this.currentForm === this.standardProductForm) { return; }

        this.standardProductForm = this.currentForm;
        if (this.standardProductForm) {
            this.standardProductForm.valueChanges
                .subscribe(data => this.onValueChanged(data));
        }


    }

    onValueChanged(data?: any) {
        if (!this.standardProductForm) { return; }

        if (this.standardProductForm)
        {
            const form = this.standardProductForm.form;

            for (const field in this.standardFormErrors) {
                // clear previous error message (if any)
                this.standardFormErrors[field] = '';
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.standardValidationMessages[field];
                    for (const key in control.errors) {
                        this.standardFormErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }

       
    
    }

    standardFormErrors = {
        'categorySelect': '',
        'productSelect': '',
        'unitSelect': '',
        'productQuantity': '',
        'unitPrice': ''
    };

    standardValidationMessages = {
        'categorySelect': {
            'required': 'Product Category is required.'
        },
        'productSelect': {
            'required': 'Product is required.'
        },
        'unitSelect': {
            'required': 'Unit is required.'
        },
        'productQuantity': {
            'required': 'Quantity is required.'
        },
        'unitPrice': {
            'required': 'Unit Price is required.'
        }
    };

    checkCustomPrice(): void {
        if (this.customPrice)
        {
            this.showPriceValidation = false;
        }
        else
        {
            this.showPriceValidation = true;
        }
    }

    checkProductName(): void {
        if (this.customItemDescription) {
            this.showNameValidation = false;
        }
        else {
            this.showNameValidation = true;
        }
    }


    edit(id: number): void {
        this.editForm[id] = true;
    }

    updateOrder(id: number, custom:boolean): void {
        let searchResult = this.productsView.filter(item => item.Id == id)[0];
        searchResult.Quantity = this.editFormQuantity[id];
        searchResult.Price = this.editFormPrice[id];
        searchResult.TotalPrice = searchResult.Quantity * searchResult.Price;
        searchResult.ItemDescription = this.editFormName[id];

        if (custom == false) {
            let realProductSearch = this.standardProducts.filter(item => item.Pointer == id)[0];
            realProductSearch.Quantity = this.editFormQuantity[id];
            realProductSearch.Price = this.editFormPrice[id];
        }
        else {
            let realProductSearch = this.customProducts.filter(item => item.Pointer == id)[0];
            realProductSearch.Quantity = this.editFormQuantity[id];
            realProductSearch.Price = this.editFormPrice[id];
            realProductSearch.ItemDescription = this.editFormName[id];
        }
        this.editForm[id] = false;
    }

    filterPreviousCustomProducts(): void {
        let product = this.resultCustomProducts.ResultList.filter(i => i.ItemDescription == this.selectedCustom.ItemDescription)[0];

        this.customCategory = product.Category;
        this.customItemDescription = product.ItemDescription;
        this.customUnit = product.Unit;
        this.customQuantity = 1;
        this.customPrice = product.Price;

        this.checkCustomPrice();
        this.checkProductName();
    }
    filterProducts(): void {
        this.productList = [];
        var categoryName = "";
        for (let entry of this.resultProducts.ResultList) {
            if (entry.ProductCategory.Id == this.selectedProductCategory) {
                categoryName = entry.ProductCategory.Name;
                this.productList.push(entry);
            }
        }
        if (categoryName == "Continuous Form") {
            this.selectedUnit = 'Box';
        }
        else if (categoryName == "Paper Bag") {
            this.selectedUnit = 'Bundle';
        }
        else if (categoryName == "POS Rolls") {
            this.selectedUnit = "Roll";
        }
        else {
            this.selectedUnit = "Roll";
        }
    }

    clearStandardProductFields(): void {
        this.selectedProductCategory = null;
        this.selectedProduct = null;
        this.selectedUnit = null;
        this.productPrice = null;
        this.productQuantity = null;
        this.productList = [];
    }

    clearCustomProductFields(): void {
        this.customItemDescription = null;
        this.customCategory = null;
        this.customPrice = null;
        this.customQuantity = 1;
        this.customUnit = null;

        this.getCustomProducts(this.selectedClient.Id);
    }

    getCustomProducts(clientId: number): void {
        this._sosService.getCustomProducts(clientId)
            .subscribe(customProducts => {
                this.resultCustomProducts = customProducts;},
            error => this.errorMessage = <any>error);
    }

    getListClients(): void {
        this._clientService.getClients()
            .subscribe(peoples => this.resultClients = peoples,
            error => this.errorMessage = <any>error);
    }

    getProducts(): void {
        this._productService.getProducts()
            .subscribe(products => {
                this.resultProducts = products;
                for (let entry of this.resultProducts.ResultList) {
                    this.productList.push(entry);
                }
            },
            error => this.errorMessage = <any>error);
    }

    getProductCategories(): void {
        this._productService.getProductCategories()
            .subscribe(categories => {
                this.resultProductCategories = categories;
            },
            error => this.errorMessage = <any>error);
    }

    initializeUnits(): void {
        this.unitOptions.push("Box");
        this.unitOptions.push("Roll");
        this.unitOptions.push("Bundle");
    }
    onBack(): void {
        window.location.href = this.returnUrl;
    }

    getBestStandardPrice(): void {
        this._productService.getPrice(this.selectedClient.Id, this.selectedProduct.Id)
            .subscribe(result => {
                this.productPrice = result;
                this.productQuantity = 1;
            },
            error => this.errorMessage = <any>error);
    }

    addStandard(): void {
        this.pointerMarker += 1;
        var standardProduct = {
            "Pointer": this.pointerMarker,
            "ProductId": this.selectedProduct.Id,
            "Quantity": this.productQuantity,
            "Price": this.productPrice,
            "Unit": this.selectedUnit
        };
        this.standardProducts.push(standardProduct);

        var productView = {
            "Id": this.pointerMarker,
            "Quantity": this.productQuantity,
            "ItemDescription": this.selectedProduct.Name,
            "Price": this.productPrice,
            "TotalPrice": this.productQuantity * this.productPrice,
            "Unit": this.selectedUnit,
            "Custom": false
        }

        this.editForm[this.pointerMarker] = false;
        this.editFormPrice[this.pointerMarker] = this.productPrice;
        this.editFormQuantity[this.pointerMarker] = this.productQuantity;

        this.productsView.push(productView);
    }

    addStandardProduct(): void {
        if (this.selectedClient.Combine_Items == false)
        {
            this.addStandard();
        }
        else
        {
            let searchResult = this.productsView.filter(item => item.ItemDescription == this.selectedProduct.Name && item.Custom == false)[0];

            if (searchResult == null)
            {
                this.addStandard();
            }
            else
            {
                searchResult.Quantity = searchResult.Quantity + this.productQuantity;
                searchResult.TotalPrice = searchResult.Quantity * searchResult.Price;

                let realProductSearch = this.standardProducts.filter(item => item.ProductId == this.selectedProduct.Id)[0];
                realProductSearch.Quantity = realProductSearch.Quantity + this.productQuantity;

                this.editFormQuantity[searchResult.Id] = searchResult.Quantity;
            }

           
        }

     
    }

    addCustomProduct(): void {
        this.pointerMarker += 1;
        var customProduct = {
            "Pointer": this.pointerMarker,
            "Category": this.customCategory,
            "Quantity": this.customQuantity,
            "Price": this.customPrice,
            "Unit": this.customUnit,
            "ItemDescription": this.customItemDescription
        };
        this.customProducts.push(customProduct);

        var productView = {
            "Id": this.pointerMarker,
            "Quantity": this.customQuantity,
            "ItemDescription": this.customItemDescription,
            "Price": this.customPrice,
            "TotalPrice": this.customPrice * this.customQuantity,
            "Unit": this.customUnit,
            "Custom": true
        }

        this.editForm[this.pointerMarker] = false;
        this.editFormPrice[this.pointerMarker] = this.customPrice;
        this.editFormQuantity[this.pointerMarker] = this.customQuantity;
        this.editFormName[this.pointerMarker] = this.customItemDescription;

        this.productsView.push(productView);
     //   this.clearCustomProductFields();
    }

    removeProduct(id: number, custom: boolean): void {
        this.productsView = this.productsView.filter(item => item.Id !== id);

        if (custom == false) {
            this.standardProducts = this.standardProducts.filter(item => item.Pointer != id);
        }
        else
        {
            this.standardProducts = this.customProducts.filter(item => item.Pointer != id);
        }
    }


    //Saving and updating Functionalities
    saveSos(): void {

        var sosModel = {
            "Id": this.sosId,
            "ClientId": this.selectedClient.Id,
            "Sos_Date": this.sosDate,
            "Remarks": this.remarks,
            "Status": false,
            "Pickup": this.pickup,
            "Exported": false
        };
        var dataModel = {
            "Sos": sosModel,
            "StandardOrders": this.standardProducts,
            "CustomOrders": this.customProducts
        };

        if (this.sosId == '0') {
            this._sosService.addSos(dataModel)
                .subscribe(result => {
                    this.resultOperation = result;
                    if (this.resultOperation.isError == false) {
                        window.location.href = this.returnUrl;
                    }
                },
                error => this.errorMessage = <any>error);
        }
        else
        {
            this._sosService.updateSos(dataModel)
                .subscribe(result => {
                    this.resultOperation = result;
                    if (this.resultOperation.isError == false) {
                        window.location.href = this.returnUrl;
                    }
                },
                error => this.errorMessage = <any>error);
        }

       

    }

    /* Initializer and Native Functions */
    ngOnInit(): void {
        this.initializeUnits();

        this.resultClients = JSON.parse(this.elementRef.nativeElement.getAttribute('clients'));
        this.resultProducts = JSON.parse(this.elementRef.nativeElement.getAttribute('products'));
        this.resultProductCategories = JSON.parse(this.elementRef.nativeElement.getAttribute('productcategories'));
        this.returnUrl = this.elementRef.nativeElement.getAttribute('returnurl');
        this.sosId = this.elementRef.nativeElement.getAttribute('sosid');
     

        if (this.sosId == '0')
        {
            this.selectedClient.Office_Address = "";
        }
        else
        {
            this.sosModel = JSON.parse(this.elementRef.nativeElement.getAttribute('sosdetail'));
            let client = this.resultClients.ResultList.filter(item => item.Id == this.sosModel.Client.Id)[0];
            this.selectedClient = client;
            this.sosDate = this.elementRef.nativeElement.getAttribute('sosdate');
            this.pickup = this.sosModel.Pickup;
            this.remarks = this.sosModel.Remarks;

            for (let entry of this.sosModel.Orders)
            {
                this.pointerMarker += 1;
                var standardProduct = {
                    "Pointer": this.pointerMarker,
                    "ProductId": entry.Product.Id,
                    "Quantity": entry.Quantity,
                    "Price": entry.Price,
                    "Unit": entry.Unit
                };
                this.standardProducts.push(standardProduct);

                var productView = {
                    "Id": this.pointerMarker,
                    "Quantity": entry.Quantity,
                    "ItemDescription": entry.Product.Name,
                    "Price": entry.Price,
                    "TotalPrice": entry.Price * entry.Quantity,
                    "Unit": entry.Unit,
                    "Custom": false
                }

                this.editForm[this.pointerMarker] = false;
                this.editFormPrice[this.pointerMarker] = entry.Price;
                this.editFormQuantity[this.pointerMarker] = entry.Quantity;

                this.productsView.push(productView);
            }

            for (let entry of this.sosModel.CustomOrders) {
                this.pointerMarker += 1;
                var customProduct = {
                    "Pointer": this.pointerMarker,
                    "Category": entry.Category,
                    "Quantity": entry.Quantity,
                    "Price": entry.Price,
                    "Unit": entry.Unit,
                    "ItemDescription": entry.ItemDescription
                };
                this.customProducts.push(customProduct);

                var productView = {
                    "Id": this.pointerMarker,
                    "Quantity": entry.Quantity,
                    "ItemDescription": entry.ItemDescription,
                    "Price": entry.Price,
                    "TotalPrice": entry.Price * entry.Quantity,
                    "Unit": entry.Unit,
                    "Custom": true
                }

                this.editForm[this.pointerMarker] = false;
                this.editFormPrice[this.pointerMarker] = entry.Price;
                this.editFormQuantity[this.pointerMarker] = entry.Quantity;

                this.productsView.push(productView);
            }
        }
       
    }
}