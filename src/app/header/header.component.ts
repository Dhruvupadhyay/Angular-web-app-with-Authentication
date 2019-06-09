import {Component, EventEmitter, Output} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent{
    constructor(private datastorageservice:DataStorageService){

    }
    @Output() featureselected=new EventEmitter<string>();

onSelect(feature:string){
    this.featureselected.emit(feature);
}
    
onSaveData(){
this.datastorageservice.storerecipe();
}
onFetchData(){
    this.datastorageservice.fetchrecipe().subscribe();
}
}