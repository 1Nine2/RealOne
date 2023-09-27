import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr'
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { RespuestaEmit } from 'src/app/models/respuestaemit.model';


@Component({
	selector: 'app-crear-tarjeta',
	templateUrl: './crear-tarjeta.component.html',
	styleUrls: ['./crear-tarjeta.component.css']
})


export class CrearTarjetaComponent implements OnInit, OnDestroy {
	private formSubscription: Subscription | undefined;
	private animalSubscription: Subscription | undefined;
	public formRegistro: FormGroup;
	public animals: Animal[] = [] as Animal[];
	public btnName = 'Registrar';
	@Input() pk: number = 0;
	@Input() tipoaccion: number = 1;
	@Output() editarEvent = new EventEmitter<RespuestaEmit>();
	private bandera = 1;

	constructor(
		private formBuilder: FormBuilder,
		private animalService: AnimalService,
		private tarjetaService: TarjetaService,
		private toastr: ToastrService
	) {
		this.formRegistro = new FormGroup({});
	}

	ngOnInit(): void {
		this.loadFormBuilder();
		this.getAnimales();
		if (this.tipoaccion == 0) {
			this.btnName = 'Editar';
			this.fetchDataAndSetData(this.pk)
		}
	}


	public loadFormBuilder() {
		this.formRegistro = this.formBuilder.group({
			titular: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5), Validators.pattern(/^[a-zA-Z]/)]],
			campo2: ['', [Validators.required]],
			animal1: ['', [Validators.required]],
			date: ['', [Validators.required]],

			option: [1, [Validators.required]],
			acceptTerms: [true, [Validators.required]]
		});
	}

	public onButtonClickCancel(): void {
		this.cancelbutton(false);
	}

	cancelbutton(valor: boolean): void {
		const data = {
			estado: valor
		}
		this.editarEvent.emit(data);
	}

	public getAnimales() {
		this.animalSubscription = this.animalService.getAnimalsX().subscribe(
			response => {
				this.animals = response;
			}, error => {
				this.animals = [];
			}
		);
	}

	private fetchDataAndSetData(id: number): void {
		console.log("Llego");
		this.tarjetaService.getTarjeta(id).subscribe(
			(data) => {
				console.log(data);
				this.formRegistro.setValue({
					titular: data.titular,
					campo2: data.campo2,
					animal1: data.animal1,
					date: data.date,
					option: data.option,
					acceptTerms: data.acceptTerms,
				});
			},
			(error) => {
				console.log(error);
			}
		);
	}


	public enviar() {
		Swal.fire({
			title: 'Confirmar envio',
			text: 'Esta seguro de enviar la informacion?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				const data = this.formRegistro.value;
				data.id = 19;
				if (this.bandera == 1) {
					this.formSubscription = this.tarjetaService.postTarjeta(data).subscribe(
						response => {
							this.formRegistro.reset();
							this.toastr.success('Data successfully sent!', 'Success');
							this.cancelbutton(true);
						}, error => {
							this.toastr.error('Data error sent!', 'error');
						}
					);
				} else if (this.bandera == 0) {


					this.tarjetaService.editTarjeta(this.pk, this.formRegistro.value).subscribe(
						(response) => {
							console.log('ok');
							this.formRegistro.reset();
							this.toastr.success('Data successfully updated!', 'Success');
							this.cancelbutton(true);
						},
						(error) => {
							console.log('error');
							this.toastr.error('Data error updated!', 'error');
						}
					);
				}
			}
		})

	}

	public deleteAnimal(id: number) {
		this.animalService.deleteAnimal(id).subscribe(
			() => {
				console.log('Animal deleted successfully');
				// Optionally, update the animals list or perform any other necessary action
			},
			(error) => {
				console.error('Error deleting animal', error);
			}
		);
	}

	ngOnDestroy(): void {
		this.formSubscription?.unsubscribe();
		this.animalSubscription?.unsubscribe;
	}
}

