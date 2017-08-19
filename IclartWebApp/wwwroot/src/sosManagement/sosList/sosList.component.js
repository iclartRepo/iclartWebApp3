var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { SosService } from '../../services/sos.service';
var SOSListComponent = (function () {
    function SOSListComponent(_sosService, elementRef) {
        this._sosService = _sosService;
        this.elementRef = elementRef;
        this.result = {
            isError: false,
            Result: null,
            ResultList: null,
            Message: ''
        };
        this.resultClients = {
            isError: false,
            Result: null,
            ResultList: null,
            Message: ''
        };
    }
    SOSListComponent.prototype.searchSOS = function () {
        var _this = this;
        this._sosService.getSosListByName(this.clientName)
            .subscribe(function (result) {
            _this.result = result;
            _this.clientName = "";
        }, function (error) { return _this.errorMessage = error; });
    };
    SOSListComponent.prototype.filterStatus = function () {
        this.getSosListByStatus(this.status);
    };
    SOSListComponent.prototype.getSosListByStatus = function (status) {
        var _this = this;
        this._sosService.getSosList(this.status)
            .subscribe(function (result) {
            _this.result = result;
        }, function (error) { return _this.errorMessage = error; });
    };
    SOSListComponent.prototype.ngOnInit = function () {
        this.result = JSON.parse(this.elementRef.nativeElement.getAttribute('sos'));
        this.resultClients = JSON.parse(this.elementRef.nativeElement.getAttribute('clients'));
        this.status = false;
    };
    return SOSListComponent;
}());
SOSListComponent = __decorate([
    Component({
        selector: 'sos-list',
        template: require("./sosList.component.html")
    }),
    __metadata("design:paramtypes", [SosService, ElementRef])
], SOSListComponent);
export { SOSListComponent };
//# sourceMappingURL=sosList.component.js.map