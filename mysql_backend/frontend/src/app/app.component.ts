import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
// import { Observable, map, startWith } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeneralService } from './general.service';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  step: number = 1;
   myControl = new FormControl('');
   myControl_store = new FormControl('');
   myControl_item = new FormControl('');
   myControl_item_cat = new FormControl('');
  options:string[] = ['One', 'Two', 'Three'];
  options_store:string[] = ['myStore', 'yourStore', 'ourStore'];
  options_item:string[] = ['item1', 'item2', 'item3'];
  options_item_cat:string[] = ['item_cat1', 'item_cat2', 'item_cat3'];
  filteredOptions!: Observable<string[]>;
  filteredOptions_store!: Observable<string[]>;
  filteredOptions_item!: Observable<string[]>;
  filteredOptions_item_cat!: Observable<string[]>;


  constructor(private fb: FormBuilder,private _gs:GeneralService) {
    this.form = this.fb.group({
      company: ['', Validators.required],
      date: ['', Validators.required],
      store: ['', Validators.required],
      remarks: [''],
      inventories: this.fb.array([this.createInventoryItem()])
    });
  }

  ngOnInit():void{

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    );

    this.filteredOptions_store = this.myControl_store.valueChanges.pipe(
      startWith(''), map(value => this._filterStore(value || '')),
    );

    this.filteredOptions_item_cat = this.myControl_item_cat.valueChanges.pipe(
      startWith(''), map(value => this._filterItemCat(value || '')),
    );

    this.filteredOptions_item = this.myControl_item.valueChanges.pipe(
      startWith(''), map(value => this._filterItem(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // console.log(filterValue)
    this.form.get('company')?.setValue(filterValue)
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterStore(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    this.form.get('store')?.setValue(filterValue)
    return this.options_store.filter(option => option.toLowerCase().includes(filterValue));
  }
item_cat:any=''
  private _filterItemCat(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    // this.form.get('store')?.setValue(filterValue)
    this.item_cat=filterValue
    return this.options_item_cat.filter(option => option.toLowerCase().includes(filterValue));
  }
  item:any=''
  private _filterItem(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    this.item=filterValue
    // this.form.get('store')?.setValue(filterValue)
    return this.options_item.filter(option => option.toLowerCase().includes(filterValue));
  }
  onItemChange(index:number){
    this.inventories?.at(index).get('item')?.setValue(this.item)
    this.item=''

  }
  onItemCategoryChange(index:number){
    this.inventories?.at(index).get('itemCategory')?.setValue(this.item_cat)
    this.item_cat=''
  }


  createInventoryItem(): FormGroup {
    return this.fb.group({
      itemCategory: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(17),Validators.pattern("^[0-9+-]*$")]],
      totalCost: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(17),Validators.pattern("^[0-9+-]*$")]],
      costPerUnit: [''],
    });
  }

  // get f() {
  //   console.log(this.form.controls)
  //    return this.form.controls
  //   // return this.form.get('inventories') as FormArray;
  // }
  get formArr() {
    return this.form.get("inventories") as FormArray;
  }
 get inventories(): FormArray {
    return this.form.get("inventories") as FormArray
  }

  addInventoryItem() {
    console.log("Adding a time table");
    this.inventories.push(this.createInventoryItem());
  }
  

  onChange(index:number){

    const quantity = (this.inventories?.at(index).get('quantity')?.value || 1)
  const totalCost=  (this.inventories.at(index).get('totalCost')?.value || 1);
    let cost_per_unit=(Number(totalCost)/quantity).toFixed(2);
    console.log(cost_per_unit,totalCost,quantity)
    this.inventories.at(index).get('costPerUnit')?.setValue(cost_per_unit)

    const total = this.inventories.value.reduce((acc:any,curr:any)=>{
      acc += (curr.quantity || 0) + (curr.totalCost || 0);
      return acc;
    },0);
  }

  // addInventoryItem() {
  //   // console.log(this.createInventoryItem())
  //   // this.inventories.push(this.createInventoryItem());
  //   this.inventories = this.inv['inventories'] as FormArray;
  //   this.arr.push(this.createItem());
  // }
  // addItem() {
  //   this.inventories = this.f['inventories'] as FormArray;
  //   this.inventories.push(this.createInventoryItem());
  // }

  removeInventoryItem(index: number) {
    this.inventories.removeAt(index);
  }

  clearAllInventories() {
    // while (this.inventories.length !== 0) {
      // this.inventories().removeAt(0);
      const inventories = this.form.get('inventories')?.reset();
      // $("#item_Category").val('')
    let  item_Category= document.getElementById('item_Category')
    let item=  document.getElementById('item')
    // item_Category.value=''
    // item.value=''
     
    // }
    // this.addInventoryItem(); // Add one empty inventory item
  }

  nextStep() {
    console.log(this.form.value)
    if (this.step === 1 && this.form.controls['company'].valid && this.form.controls['date'].valid && this.form.controls['store'].valid) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  onSubmit() {
    console.log(this.inventories, this.form.value,this.form.valid)
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
        this._gs.post(this.form.value,'add').subscribe((data: any) => {
          if (data.success) {
       alert(data.message)
            // this.router.navigate(['/auth/verify-success/']);
          } else {
            alert('Something went wrong , please enter correct data')
          }
        },
        error => {
         console.log(error,'Error in post data')
        }
      )
    }
  }
}
