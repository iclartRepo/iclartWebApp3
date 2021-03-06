var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
var CompetitorService = (function () {
    function CompetitorService(_http) {
        this._http = _http;
        this.baseUrl = "/Competitor/";
    }
    CompetitorService.prototype.getCompetitors = function () {
        return this._http.get(this.baseUrl + "GetCompetitors")
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CompetitorService.prototype.addCompetitor = function (name) {
        return this._http.post(this.baseUrl + "AddCompetitor", { name: name })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    CompetitorService.prototype.updateCompetitor = function (id, name) {
        return this._http.put(this.baseUrl + "UpdateCompetitor", { id: id, name: name })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    CompetitorService.prototype.deleteCompetitor = function (id) {
        return this._http.delete(this.baseUrl + "DeleteCompetitor?id=" + id)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    CompetitorService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return CompetitorService;
}());
CompetitorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], CompetitorService);
export { CompetitorService };
//# sourceMappingURL=competitor.service.js.map